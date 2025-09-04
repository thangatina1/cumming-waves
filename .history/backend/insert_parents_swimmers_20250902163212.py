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
        'zip': f'3004{i}'
    }
    num_children = random.randint(1, 5)
    children = random.sample(child_names, num_children)
    parent_id = db['parents'].insert_one(parent).inserted_id
    for cname in children:
        swimmer = {
            'name': f'{cname} {pname.split()[-1]}',
            'age': random.randint(6, 17),
            'email': f'{cname.lower()}{i}@example.com',
            'password': f'{cname.lower()}pass',
            'parent_id': parent_id
        }
        db['swimmers'].insert_one(swimmer)

print("Inserted sample parents and 1-5 children each into MongoDB.")
