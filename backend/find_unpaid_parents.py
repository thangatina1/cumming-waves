import os
from pymongo import MongoClient
import certifi
from dotenv import load_dotenv
load_dotenv()
def main():
    db = MongoClient('mongodb://localhost:27017/')['cumming-waves-db']
    username = os.environ.get('MONGO_USERNAME')
    password = os.environ.get('MONGO_PASSWORD')
    host = os.environ.get('MONGO_HOST')
    dbname = os.environ.get('MONGO_DBNAME')
    client = MongoClient(
        f'mongodb+srv://{username}:{password}@{host}/{dbname}?retryWrites=true&w=majority',
        tlsCAFile=certifi.where()
    )
    db = client[dbname]
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
        password = p.get('password', '(unknown)')
        print(f"{p['name']} - {p['email']} - password: {password}")

if __name__ == '__main__':
    main()
