# URL Shortener Web App

A simple and stylish URL shortener with analytics built using React, Node.js (Express), and MongoDB (Mongoose).

## Features
- Shorten any long URL and get a compact short link
- Redirect to the original URL when visiting the short link
- Admin page lists all URLs with visit counts

## Requirements
- Windows PowerShell (v5+)
- Node.js and npm
- MongoDB running locally (default URI: `mongodb://localhost:27017/urlshortener`)

## Quick Start (Windows)
1) Install dependencies using the provided script
```powershell
# From project root
powershell -ExecutionPolicy Bypass -File .\install.ps1
```
2) Start MongoDB locally (if installed as a service)
```powershell
net start MongoDB
```
3) Run the backend API
```powershell
node backend/server.js
```
4) Run the frontend UI (in a second terminal)
```powershell
cd frontend
npm start
```
React may prompt to use another port (e.g., 3001) if 3000 is in use. Choose Yes.

## API
- POST `/api/shorten` → Body: `{ originalUrl: string }` → Response: `{ shortUrl: string }`
- GET `/:shortCode` → Redirects to the original URL, increments visitCount
- GET `/api/admin/urls` → `{ urls: Array<{ originalUrl, shortCode, visitCount }> }`

## Project Structure
```
proj/
  backend/
    models/Url.js        # Mongoose schema
    server.js            # Express app and routes
  frontend/
    src/
      App.js             # Main UI
      AdminPage.js       # Admin UI
      App.css            # Styles
    public/index.html
  install.ps1            # Windows install helper
  .gitignore
  README.md
```

## Configuration
- MongoDB connection string is in `backend/server.js`. Update it if needed (e.g., remote MongoDB/Atlas).
- CORS is enabled server-side to allow the React app to call the API.

## Troubleshooting
- Blank UI/no styles: ensure `import './App.css'` exists in `src/App.js`, then hard refresh (Ctrl+F5).
- API errors: verify backend is running at `http://localhost:3000` and MongoDB is started.
- Port conflict: if React says port 3000 is in use, select Yes to use another port.

## License
MIT
