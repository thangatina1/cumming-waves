from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['cumming-waves-db']

# Example parents and swimmers
parents = [
    {
        'name': 'Alice Johnson',
        'email': 'alice@example.com',
        'password': 'alicepass',
        'phone': '555-1234',
        'address': '123 Main St',
        'city': 'Cumming',
        'state': 'GA',
        'zip': '30040',
        'swimmers': [
            {'name': 'Sophie Johnson', 'age': 12, 'email': 'sophie@example.com', 'password': 'sophiepass'},
            {'name': 'Ben Johnson', 'age': 9, 'email': 'ben@example.com', 'password': 'benpass'}
        ]
    },
    {
        'name': 'Bob Smith',
        'email': 'bob@example.com',
        'password': 'bobpass',
        'phone': '555-5678',
        'address': '456 Oak Ave',
        'city': 'Cumming',
        'state': 'GA',
        'zip': '30041',
        'swimmers': [
            {'name': 'Ella Smith', 'age': 10, 'email': 'ella@example.com', 'password': 'ellapass'}
        ]
    }
]

# Insert parents and swimmers
for parent in parents:
    parent_doc = parent.copy()
    swimmers = parent_doc.pop('swimmers', [])
    parent_id = db['parents'].insert_one(parent_doc).inserted_id
    for swimmer in swimmers:
        swimmer['parent_id'] = parent_id
        db['swimmers'].insert_one(swimmer)

print("Sample parents and swimmers inserted.")
