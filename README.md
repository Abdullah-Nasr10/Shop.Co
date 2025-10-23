# 🛍️ Shop.co — Local Development

Shop.co — an Angular clothing store project developed as part of ITI Full Stack training. Built with Angular, Bootstrap, and SCSS. Includes AI-powered search, product filtering, and favorites.

## Features
- AI-powered search
- Product filtering (category / price / type)
- Favorites management
- Mock backend with JSON Server
- Responsive UI (Bootstrap + SCSS)

## Project layout
- server/ — JSON Server data (e.g., server/db.json)
- src/ — Angular app

## 1. Backend (JSON Server)
Open a terminal in the server folder and run:
```powershell
cd server
npm install
json-server db.json
```
The mock API runs at: http://localhost:3000

## 2. Frontend (Angular)
Open a new terminal at the project root (or src/) and run:
```powershell
npm install
ng serve -o
```
The app opens at: http://localhost:4200

## Quick notes
- Edit `server/db.json` to add or update products.
- Make sure JSON Server is running before using the app.
- If you change the backend port or endpoint, update the URL in `src/app/Services/product-service.ts`.
