# ...existing code...
#!/bin/ksh
# Script to ensure MongoDB is running locally, insert sample data, and start backend insertion script.

DBPATH=/usr/local/var/mongodb
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
VENV_DIR="$SCRIPT_DIR/myenv"
PY_SCRIPT="$SCRIPT_DIR/insert_parents_swimmers.py"
MONGOD_LOG=/tmp/mongod.log

echo "Ensure dbpath exists: $DBPATH"
mkdir -p "$DBPATH"

echo "Fixing permissions and removing stale lock..."
sudo chown -R "$(whoami)" "$DBPATH" || true
rm -f "$DBPATH/mongod.lock" || true

# Try starting via brew services if available
if command -v brew >/dev/null 2>&1; then
  if brew services list | grep -q "mongodb-community"; then
    echo "Starting MongoDB via Homebrew service..."
    brew services start mongodb-community || brew services start mongodb-community@4.4 || true
  fi
fi

# Start mongod manually if not already running
if ! pgrep -x mongod >/dev/null 2>&1; then
  echo "Starting mongod manually (logs -> $MONGOD_LOG)..."
  nohup mongod --dbpath "$DBPATH" --bind_ip 127.0.0.1 > "$MONGOD_LOG" 2>&1 &
  MONGO_PID=$!
  echo "mongod started with PID $MONGO_PID"
else
  MONGO_PID=$(pgrep -x mongod | head -n1)
  echo "mongod already running with PID $MONGO_PID"
fi

# Wait for MongoDB to accept connections
echo "Waiting for MongoDB to accept connections..."
COUNT=0
MAX_WAIT=30
until mongo --eval "db.adminCommand('ping')" >/dev/null 2>&1; do
  sleep 1
  COUNT=$((COUNT+1))
  if [ "$COUNT" -ge "$MAX_WAIT" ]; then
    echo "MongoDB did not become ready within $MAX_WAIT seconds. Check $MONGOD_LOG"
    exit 1
  fi
done
echo "MongoDB is up."

# Activate Python venv if present
cd "$SCRIPT_DIR" || exit 1
if [ -f "$VENV_DIR/bin/activate" ]; then
  echo "Activating virtualenv at $VENV_DIR"
  . "$VENV_DIR/bin/activate"
else
  echo "Virtualenv not found at $VENV_DIR — continuing without activation"
fi

# Run insert script
if [ -f "$PY_SCRIPT" ]; then
  echo "Running $PY_SCRIPT ..."
  python3 "$PY_SCRIPT"
  EXIT_CODE=$?
  if [ $EXIT_CODE -ne 0 ]; then
    echo "Insertion script exited with code $EXIT_CODE"
    exit $EXIT_CODE
  fi
  echo "Data insertion completed."
else
  echo "Insert script not found: $PY_SCRIPT"
  exit 1
fi

echo "Done. MongoDB PID: $MONGO_PID"
# ...existing code...