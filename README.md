# laundry-app
A laundry management system which displays the order and calculates its order value and status as well
# 🧺 Mini Laundry Order Management System (AI-First)

## 📌 Overview

This is a simple full-stack laundry management system built using Node.js and React.
The goal was to quickly build a working system using AI tools and iterate on it.

---

## 🚀 Features

* Create Orders (name, phone, garments)
* Automatic billing calculation
* Unique Order ID
* Order status tracking (RECEIVED → DELIVERED)
* Filter orders (status + search)
* Dashboard (total orders, revenue, status breakdown)

---

## 🛠 Tech Stack

* Backend: Node.js + Express
* Frontend: React (Vite)
* Storage: In-memory
* Deployment: Render + Vercel

---

## ⚙️ Setup Instructions

### Backend

```bash
npm install
node index.js
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🌍 Live Demo

* Frontend: (https://laundry-app-zsim-git-main-harshita-verma12s-projects.vercel.app/)
* Backend: (https://laundry-app-wcx8.onrender.com)

---

## 🤖 AI Usage Report

### Tools Used

* ChatGPT

---

### Sample Prompts Used 

* "Build a simple Express API for a laundry system with order creation and status updates"
* "Create a minimal React UI to display and update orders"
* "Fix error: app is not defined in Express"
* "I have an assignment due help me with writing a code for it .  The project name is laundry-app , create a basic react and node.js working code with api and in memory storage "

---

### Where AI Helped

* Initial backend setup
* React component structure
* API design

---

### Errors Faced & Fixes

❌ Error:

```
ReferenceError: app is not defined
```

✔ Fix:

* Defined `const app = express()` before using `app.use()`

---

### Improvements Made Over AI Code

* Added validation for inputs
* Improved filtering logic
* Improved UI with CSS

---

##  Tradeoffs

* Used in-memory storage instead of database (faster development)
* Basic UI (focused on functionality)

---

## Future Improvements

* Add MongoDB for persistence
* Add authentication
* Improve UI/UX
* Add garment-level customization

---

## Conclusion

This project focuses on fast execution, practical problem-solving, and effective use of AI tools to build a working system quickly.
