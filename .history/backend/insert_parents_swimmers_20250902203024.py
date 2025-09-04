from pymongo import MongoClient
import random

client = MongoClient('mongodb://localhost:27017/')
db = client['cumming-waves-db']

parent_names = [
    ('Alice Johnson', 'alice@example.com'),
    ('Bob Smith', 'bob@example.com'),
    ('Carol Lee', 'carol@example.com'),
    ('David Kim', 'david@example.com'),
    ('Eva Brown', 'eva@example.com')
]

child_names = [
    'Sophie', 'Ben', 'Ella', 'Max', 'Liam', 'Noah', 'Mia', 'Zoe', 'Lucas', 'Emma',
    'Ava', 'Jack', 'Olivia', 'Ethan', 'Chloe', 'Mason', 'Lily', 'Logan', 'Grace', 'Henry'
]

parents = []
swimmers = []

for i, (pname, pemail) in enumerate(parent_names):
    parent = {
        'name': pname,
        'email': pemail,
        'password': f'{pname.split()[0].lower()}pass',
        'phone': f'555-12{str(i).zfill(2)}',
        'address': f'{100+i} Main St',
        'city': 'Cumming',
        'state': 'GA',
        'zip': f'3004{i}',
        'profilePic': f'https://randomuser.me/api/portraits/men/{i+10}.jpg' if i%2==0 else f'https://randomuser.me/api/portraits/women/{i+10}.jpg'
    }
    num_children = random.randint(1, 5)
    children = random.sample(child_names, num_children)
    parent_id = db['parents'].insert_one(parent).inserted_id
    for j, cname in enumerate(children):
        swimmer = {
            'name': f'{cname} {pname.split()[-1]}',
            'age': random.randint(6, 17),
            'email': f'{cname.lower()}{i}@example.com',
            'password': f'{cname.lower()}pass',
            'parent_id': parent_id,
            'profilePic': f'https://randomuser.me/api/portraits/children/{(i*5+j)%20}.jpg'
        }
        db['swimmers'].insert_one(swimmer)


# Add a coach/admin parent
admin_parent = {
    'name': 'Coach Admin',
    'email': 'coach1@admin.com',
    'password': 'coach1pass',
    'phone': '555-9999',
    'address': '1 Admin Blvd',
    'city': 'Cumming',
    'state': 'GA',
    'zip': '30099',
    'profilePic': 'https://randomuser.me/api/portraits/men/99.jpg'
}
admin_parent_id = db['parents'].insert_one(admin_parent).inserted_id
# Give the coach one child for demo
admin_swimmer = {
    'name': 'Demo Swimmer',
    'age': 15,
    'email': 'demoswimmer@admin.com',
    'password': 'demoswimmerpass',
    'parent_id': admin_parent_id,
    'profilePic': 'https://randomuser.me/api/portraits/children/19.jpg'
}
db['swimmers'].insert_one(admin_swimmer)

print("Inserted sample parents, 1-5 children each, and a coach/admin into MongoDB.")
