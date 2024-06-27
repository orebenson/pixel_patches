# Pixel Patches Backend API

## Setup and run

1. Create a `.env` file with the following variables:
   ```
   DB_URL="mongodb://127.0.0.1:27017/patchdb"
   SESSION_DB_URL="mongodb://127.0.0.1:27017/sessions"
   FRONTEND_URL="http://127.0.0.1:8080"
   PORT=3000
   SESSION_SECRET="secret"
   MODE="prod"
   PATH_TO_LOG_FOLDER="./logs/"
   EMAIL_HOST="gmail"
   EMAIL_USERNAME=
   EMAIL_PASSWORD=
   EMAIL_FROM=
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. Run tests:
   ```bash
   npm test
   ```
