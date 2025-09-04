# Cumming Waves Swim Team Portal

## Purpose
This application is a full-featured portal for the Cumming Waves Swim Team. It provides registration, login, payment tracking, team store, admin/coach dashboards, and more for parents, swimmers, and coaches. The stack includes a React frontend, FastAPI backend, and MongoDB database.

## Features
- Parent and Coach login
- Swimmer registration and management
- Payment log and Stripe integration
- Team store with cart and checkout
- Admin/Coach dashboard
- Event calendar, training groups, and more

## Quick Start (macOS)

### 1. Prerequisites
- [Python 3.12+](https://www.python.org/downloads/)
- [Node.js (v18+ recommended)](https://nodejs.org/)
- [MongoDB Community Edition](https://www.mongodb.com/try/download/community)

### 2. Start MongoDB
If you have MongoDB installed via Homebrew:
```bash
brew services start mongodb-community
```
Or, if installed manually:
```bash
mongod --dbpath ~/data/db
```

### 3. Insert Dummy Records
From the `backend` directory, install requirements and run the sample data script:
```bash
cd backend
python3 -m venv myenv
source myenv/bin/activate
pip install -r requirements.txt
python insert_parents_swimmers.py
```
This will populate MongoDB with demo parents, swimmers, and a coach/admin account.

### 4. Start the Backend (FastAPI)
From the `backend` directory (with the virtual environment activated):
```bash
uvicorn main:app --reload --port 8000
```

### 5. Start the Frontend (React)
From the `frontend` directory:
```bash
cd ../frontend
npm install
npm start
```
The React app will start on [http://localhost:3000](http://localhost:3000).

### 6. Login Demo Accounts
- **Parent Login:** Use any parent email/password from the database (see `insert_parents_swimmers.py` for generated credentials)
- **Coach Login:**
  - Email: `coach1@admin.com`
  - Password: `coach1pass`

## Troubleshooting
- Ensure MongoDB is running before starting the backend.
- If you change the database connection string, update it in both backend and scripts.
- For any issues, check terminal output for errors.

---

**Developed for Cumming Waves Swim Team. For questions, contact the project maintainer.**
