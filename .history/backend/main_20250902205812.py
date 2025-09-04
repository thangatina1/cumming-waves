# API to get all parents and swimmers with at least one pending payment
@app.get("/parents-with-pending-payments")
async def parents_with_pending_payments():
    parents = {str(p['_id']): p for p in db['parents'].find()}
    swimmers = list(db['swimmers'].find())
    result = []
    for s in swimmers:
        for entry in s.get('payment_log', []):
            if entry['status'] == 'Due':
                parent_id = str(s['parent_id'])
                parent = parents.get(parent_id)
                if parent:
                    # Remove password for security
                    parent_copy = dict(parent)
                    parent_copy.pop('password', None)
                    s_copy = dict(s)
                    s_copy.pop('password', None)
                    # Convert ObjectId to str
                    parent_copy['_id'] = str(parent_copy['_id'])
                    s_copy['_id'] = str(s_copy['_id'])
                    s_copy['parent_id'] = str(s_copy['parent_id'])
                    result.append({'parent': parent_copy, 'swimmer': s_copy})
                break
    return result
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from fastapi import FastAPI, Request, HTTPException, status, Depends
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pymongo import MongoClient
import datetime
import re
app = FastAPI()
SECRET_KEY = "supersecretkey123"  # Use env var in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")

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

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: datetime.timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.datetime.utcnow() + expires_delta
    else:
        expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = decode_access_token(token)
    if payload is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    return payload

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

# Parent login endpoint (returns JWT)
@app.post("/parent-login")
async def parent_login(request: Request):
    data = await request.json()
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    parent = db['parents'].find_one({'email': email})
    if not parent or parent.get('password') != password:
        return JSONResponse({'error': 'Invalid parent credentials.'}, status_code=401)
    # Issue JWT
    access_token = create_access_token(
        data={"sub": email, "role": "parent"},
        expires_delta=datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    # Get all swimmers for this parent
    swimmers = list(db['swimmers'].find({'parent_id': parent['_id']}))
    for swimmer in swimmers:
        swimmer['_id'] = str(swimmer['_id'])
        swimmer['parent_id'] = str(swimmer['parent_id'])
        # Ensure training_group is present
        if 'training_group' not in swimmer:
            swimmer['training_group'] = 'Not Assigned'
    parent['_id'] = str(parent['_id'])
    parent.pop('password', None)
    if 'profilePic' not in parent:
        parent['profilePic'] = 'https://randomuser.me/api/portraits/lego/1.jpg'
    for swimmer in swimmers:
        if 'profilePic' not in swimmer:
            swimmer['profilePic'] = 'https://randomuser.me/api/portraits/lego/2.jpg'
    return JSONResponse({
        'access_token': access_token,
        'token_type': 'bearer',
        'parent': parent,
        'swimmers': swimmers
    })

# Protected parent home endpoint (requires JWT)
@app.get("/parent-home")
async def parent_home(current_user=Depends(get_current_user)):
    if current_user.get("role") != "parent":
        raise HTTPException(status_code=403, detail="Not authorized")
    email = current_user.get("sub")
    parent = db['parents'].find_one({'email': email})
    if not parent:
        raise HTTPException(status_code=404, detail="Parent not found")
    swimmers = list(db['swimmers'].find({'parent_id': parent['_id']}))
    for swimmer in swimmers:
        swimmer['_id'] = str(swimmer['_id'])
        swimmer['parent_id'] = str(swimmer['parent_id'])
        if 'training_group' not in swimmer:
            swimmer['training_group'] = 'Not Assigned'
    parent['_id'] = str(parent['_id'])
    parent.pop('password', None)
    if 'profilePic' not in parent:
        parent['profilePic'] = 'https://randomuser.me/api/portraits/lego/1.jpg'
    for swimmer in swimmers:
        if 'profilePic' not in swimmer:
            swimmer['profilePic'] = 'https://randomuser.me/api/portraits/lego/2.jpg'
    return {
        'parent': parent,
        'swimmers': swimmers
    }

# Coach (admin) login endpoint (returns JWT)
@app.post("/admin-login")
async def admin_login(request: Request):
    data = await request.json()
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    # For demo, treat any parent with email ending in 'admin.com' as coach
    coach = db['parents'].find_one({'email': email})
    if not coach or coach.get('password') != password or not email.endswith('admin.com'):
        return JSONResponse({'error': 'Invalid admin credentials.'}, status_code=401)
    access_token = create_access_token(
        data={"sub": email, "role": "coach"},
        expires_delta=datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    coach['_id'] = str(coach['_id'])
    coach.pop('password', None)
    if 'profilePic' not in coach:
        coach['profilePic'] = 'https://randomuser.me/api/portraits/lego/3.jpg'
    return JSONResponse({
        'access_token': access_token,
        'token_type': 'bearer',
        'coach': coach
    })

# Protected coach home endpoint (requires JWT)
@app.get("/admin-home")
async def admin_home(current_user=Depends(get_current_user)):
    if current_user.get("role") != "coach":
        raise HTTPException(status_code=403, detail="Not authorized")
    email = current_user.get("sub")
    coach = db['parents'].find_one({'email': email})
    if not coach:
        raise HTTPException(status_code=404, detail="Coach not found")
    coach['_id'] = str(coach['_id'])
    coach.pop('password', None)
    if 'profilePic' not in coach:
        coach['profilePic'] = 'https://randomuser.me/api/portraits/lego/3.jpg'
    return {
        'coach': coach
    }

# Signout endpoint (stateless, just for frontend compatibility)
@app.post("/parent-signout")
async def parent_signout(request: Request):
    return JSONResponse({"message": "Parent signed out successfully."})