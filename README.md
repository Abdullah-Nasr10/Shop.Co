# 🛍️ Shop.co — Angular Clothing Store

> This project was developed as part of **ITI training (Full Stack Track)**.

Shop.co is a modern **e-commerce web application** for selling clothes, built using **Angular**, **Bootstrap**, and **SCSS**.  
It features a clean UI, responsive design, and smart product management functionalities.

The project also includes **AI-powered search**, product **filtering**, and **favorites management**, providing a smooth and interactive shopping experience.

---

## 🚀 Features

- 🧠 **AI-powered Search:** Suggests relevant products dynamically.  
- 🛍️ **Product Filtering:** Filter items by category, price, or type.  
- ❤️ **Favorites System:** Save and manage favorite products easily.  
- 🧩 **JSON Server Integration:** Mock backend for handling product data.  
- 💎 **Responsive Design:** Built with Bootstrap and SCSS for full adaptability.  
- ⚡ **Reactive State Handling:** Implemented using Angular Services and BehaviorSubject.  

---

## 🧱 Project Structure

This project consists of two main parts:

1. **Backend (Mock API using JSON Server)**  
2. **Frontend (Angular Application)**  

---

## ⚙️ 1. Backend Setup (JSON Server)

1. Open the `server` folder in your terminal.  
2. Install dependencies:
   ```bash
   npm install
   
# ShopCo — Local Development

This repository uses a JSON Server as a mock backend and an Angular frontend.

## 1. Start the JSON Server (Mock API)
From the project root:

```powershell
npm start
```

This runs the mock API (default: http://localhost:3000).

## 2. Frontend Setup (Angular App)
Open the Angular project folder in a separate terminal.

Install dependencies:

```powershell
npm install
```

Run the Angular dev server:

```powershell
ng serve
```

Open your browser:

http://localhost:4200

## Notes
- Ensure the JSON Server is running before starting the Angular app.
- To change backend port or endpoint, update the URL in the Angular service (e.g., `src/app/Services/product-service.ts`) or your environment setup.
- Make sure Node.js and Angular CLI are installed globally:

```powershell
npm install -g @angular/cli
```

- If you face package/version issues:

```powershell
rm -rf node_modules
npm install
```

- Modify mock data in `server/db.json` to add or update products.

## Security
- Do not commit secrets (API keys) to the repo. Use environment variables, CI/CD secret injection, or a server-side proxy to keep keys secret.
- If you generate `src/environments/environment.generated.ts` during build, consider adding it to `.gitignore` if you don't want it tracked.
