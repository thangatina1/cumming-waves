from pymongo import MongoClient

db = MongoClient('mongodb://localhost:27017/')['cumming-waves-db']
parents = {str(p['_id']): p for p in db['parents'].find()}
unpaid_parents = set()

for swimmer in db['swimmers'].find():
    for entry in swimmer.get('payment_log', []):
        if entry['status'] == 'Due':
            unpaid_parents.add(str(swimmer['parent_id']))
            break

print("Parents with at least one pending payment:")
for pid in unpaid_parents:
    p = parents[pid]
    print(f"{p['name']} - {p['email']}")
