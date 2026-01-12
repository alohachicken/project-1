# 🛒 Mini Marketplace

A full-stack mini marketplace web application built with **Node.js, Express, MongoDB, and Vanilla JavaScript**.  
Users can register, log in, create products, and browse a marketplace showing who posted each item.

This project was built to practice **authentication, REST APIs, and full-stack integration**.

---

## ✨ Features

- User registration & login (JWT authentication)
- Secure protected routes
- Create products with title, price, and image
- Marketplace view of all products
- Shows **username of the seller** for each product
- Users can delete **their own products only**
- Frontend built with plain HTML/CSS/JS (no frameworks)

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- Multer (image upload)

### Frontend
- HTML
- CSS
- Vanilla JavaScript (Fetch API)

---

## 📂 Project Structure

project-1/
│
├── controllers/
├── middleware/
├── models/
├── routes/
├── public/
│ ├── app.js
│ ├── index.html
│ ├── main.html
│ ├── create.html
│ ├── profile.html
│ └── style.css
│
├── uploads/
├── index.js
├── package.json
└── README.md


## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/mini-marketplace.git
cd mini-marketplace
### 2️⃣ Install dependencies
bash
Copy code
npm install
### 3️⃣ Create a .env file
env
Copy code
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
⚠️ .env is not included in the repo for security reasons.

### 4️⃣ Run the server
bash
Copy code
node index.js
Server will start at:

arduino
Copy code
http://localhost:3000


## 🔐 Authentication Flow

JWT token is issued on login

Token stored in localStorage

Protected routes require Authorization: Bearer <token>

Backend validates ownership before allowing deletes



## 📸 Marketplace Logic

Products are linked to the user via owner

Marketplace displays:

Product title

Price

Image

Seller username

Delete button only appears for the owner