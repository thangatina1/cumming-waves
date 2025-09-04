from pymongo import MongoClient
import random


client = MongoClient('mongodb://localhost:27017/')
db = client['cumming-waves-db']

# Remove old data
db['parents'].delete_many({})
db['swimmers'].delete_many({})


# Generate 55 unique parent names and emails
parent_names = []
first_names = [
    'Alice', 'Bob', 'Carol', 'David', 'Eva', 'Frank', 'Grace', 'Helen', 'Ian', 'Jane',
    'Kyle', 'Laura', 'Mike', 'Nina', 'Oscar', 'Paula', 'Quinn', 'Rita', 'Sam', 'Tina',
    'Uma', 'Victor', 'Wendy', 'Xander', 'Yara', 'Zane', 'Aaron', 'Beth', 'Cody', 'Dina',
    'Eli', 'Fay', 'Gus', 'Hope', 'Ivan', 'Jill', 'Kurt', 'Lana', 'Mona', 'Nate',
    'Omar', 'Pia', 'Quincy', 'Rosa', 'Sean', 'Tess', 'Ursula', 'Vince', 'Will', 'Xena',
    'Yuri', 'Zelda', 'Amber', 'Blake', 'Carmen'
]
last_names = [
    'Johnson', 'Smith', 'Lee', 'Kim', 'Brown', 'Davis', 'Clark', 'Lewis', 'Walker', 'Hall',
    'Allen', 'Young', 'King', 'Wright', 'Scott', 'Green', 'Baker', 'Adams', 'Nelson', 'Hill',
    'Carter', 'Mitchell', 'Perez', 'Roberts', 'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards',
    'Collins', 'Stewart', 'Sanchez', 'Morris', 'Rogers', 'Reed', 'Cook', 'Morgan', 'Bell', 'Murphy',
    'Bailey', 'Rivera', 'Cooper', 'Richardson', 'Cox', 'Howard', 'Ward', 'Torres', 'Peterson', 'Gray',
    'Ramirez', 'James', 'Watson', 'Brooks', 'Kelly'
]
for i in range(55):
    fname = first_names[i % len(first_names)]
    lname = last_names[i % len(last_names)]
    email = f"{fname.lower()}.{lname.lower()}{i}@example.com"
    parent_names.append((f"{fname} {lname}", email))


child_names = [
    'Sophie', 'Ben', 'Ella', 'Max', 'Liam', 'Noah', 'Mia', 'Zoe', 'Lucas', 'Emma',
    'Ava', 'Jack', 'Olivia', 'Ethan', 'Chloe', 'Mason', 'Lily', 'Logan', 'Grace', 'Henry'
]


# Training groups and their correct monthly fees from TrainingGroups.js
training_groups = [
    ("RW", 200),
    ("JR RW", 185),
    ("5 Day TS", 170),
    ("3 Day TS", 160),
    ("5 Day Purples", 170),
    ("3 Day Purples", 160),
    ("Junior Blue", 140)
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
        'profilePic': f'https://randomuser.me/api/portraits/men/{(i%50)+1}.jpg' if i%2==0 else f'https://randomuser.me/api/portraits/women/{(i%50)+1}.jpg'
    }
    num_children = random.randint(1, 5)
    children = random.sample(child_names, num_children)
    parent_id = db['parents'].insert_one(parent).inserted_id
    for j, cname in enumerate(children):
        group, fee = random.choice(training_groups)
        months = ["2025-04", "2025-05", "2025-06", "2025-07", "2025-08", "2025-09"]
        paid_sep = random.choice([True, False])
        payment_log = []
        for m in months:
            if m == "2025-09":
                status = "Paid" if paid_sep else "Due"
            else:
                status = "Paid"
            payment_log.append({"month": m, "status": status, "fee": fee})
        swimmer = {
            'name': f'{cname} {pname.split()[-1]}',
            'age': random.randint(6, 17),
            'email': f'{cname.lower()}{i}@example.com',
            'password': f'{cname.lower()}pass',
            'parent_id': parent_id,
            'profilePic': random.choice([
                
                f'https://randomuser.me/api/portraits/lego/{((i*5+j)%10)+1}.jpg',
                
            ]),
            'training_group': group,
            'payment_log': payment_log
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
group, fee = random.choice(training_groups)
months = ["2025-04", "2025-05", "2025-06", "2025-07", "2025-08", "2025-09"]
paid_sep = random.choice([True, False])
payment_log = []
for m in months:
    if m == "2025-09":
        status = "Paid" if paid_sep else "Due"
    else:
        status = "Paid"
    payment_log.append({"month": m, "status": status, "fee": fee})
admin_swimmer = {
    'name': 'Demo Swimmer',
    'age': 15,
    'email': 'demoswimmer@admin.com',
    'password': 'demoswimmerpass',
    'parent_id': admin_parent_id,
    'profilePic': 'https://randomuser.me/api/portraits/children/19.jpg',
    'training_group': group,
    'payment_log': payment_log
}
db['swimmers'].insert_one(admin_swimmer)

print("Inserted sample parents, 1-5 children each, and a coach/admin into MongoDB.")
