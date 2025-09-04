# Parent signout endpoint
@app.post("/parent-signout")
async def parent_signout(request: Request):
    # In a real app, clear session/cookie/token here
    return JSONResponse({"message": "Parent signed out successfully."})
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
import re

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = MongoClient('mongodb://localhost:27017/')
db = client['cumming-waves-db']

# Swimmer registration endpoint
@app.post("/register")
async def register_swimmer(request: Request):
    data = await request.json()
    name = data.get('name', '').strip()
    age = data.get('age')
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    confirm_password = data.get('confirmPassword', '')

    # Validation
    if not name:
        return JSONResponse({'error': "Name is required."}, status_code=400)
    try:
        age = int(age)
        if age < 3 or age > 100:
            return JSONResponse({'error': "Age must be between 3 and 100."}, status_code=400)
    except Exception:
        return JSONResponse({'error': "Valid age is required."}, status_code=400)
    if not re.match(r"^\S+@\S+\.\S+$", email):
        return JSONResponse({'error': "Valid email is required."}, status_code=400)
    if len(password) < 6:
        return JSONResponse({'error': "Password must be at least 6 characters."}, status_code=400)
    if password != confirm_password:
        return JSONResponse({'error': "Passwords do not match."}, status_code=400)

    # Check for existing email
    if db['swimmers'].find_one({'email': email}):
        return JSONResponse({'error': "Email already registered."}, status_code=400)

    # Save swimmer
    db['swimmers'].insert_one({
        'name': name,
        'age': age,
        'email': email,
        'password': password  # In production, hash the password!
    })

    return JSONResponse({'message': f"Swimmer {name} registered successfully!"})


# Swimmer login endpoint
@app.post("/login")
async def login_swimmer(request: Request):
    data = await request.json()
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    swimmer = db['swimmers'].find_one({'email': email})
    if not swimmer or swimmer.get('password') != password:
        return JSONResponse({'error': 'Invalid email or password.'}, status_code=401)
    return JSONResponse({'message': 'Login successful!', 'name': swimmer.get('name')})

# Parent login endpoint
@app.post("/parent-login")
async def parent_login(request: Request):
    data = await request.json()
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    parent = db['parents'].find_one({'email': email})
    if not parent or parent.get('password') != password:
        return JSONResponse({'error': 'Invalid parent credentials.'}, status_code=401)
    # Get all swimmers for this parent
    swimmers = list(db['swimmers'].find({'parent_id': parent['_id']}))
    # Convert ObjectId to string for JSON serialization
    for swimmer in swimmers:
        swimmer['_id'] = str(swimmer['_id'])
        swimmer['parent_id'] = str(swimmer['parent_id'])
    parent['_id'] = str(parent['_id'])
    # Remove password before sending
    parent.pop('password', None)
    # Ensure profilePic is present (fallback if missing)
    if 'profilePic' not in parent:
        parent['profilePic'] = 'https://randomuser.me/api/portraits/lego/1.jpg'
    for swimmer in swimmers:
        if 'profilePic' not in swimmer:
            swimmer['profilePic'] = 'https://randomuser.me/api/portraits/lego/2.jpg'
    return JSONResponse({
        'parent': parent,
        'swimmers': swimmers
    })