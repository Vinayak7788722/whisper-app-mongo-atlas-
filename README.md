🕵️‍♂️ Whisper App
A secure secret-sharing web app built with Node.js, Express, MongoDB, and JWT Auth.

Users can register, log in, and access a protected secrets page using encrypted passwords and token-based authentication.

🚀 Live Demo
🔗 https://whisper-app-5xe6.onrender.com

🛠️ Tech Stack
Frontend: EJS + Bootstrap

Backend: Node.js + Express

Database: MongoDB (Atlas)

Authentication: JWT, bcrypt

Session: Cookies (httpOnly)

Security: Password hashing, input validation

📦 Features
✅ User Registration with email, password, and name

✅ Client-side & server-side validation

✅ Strong password enforcement (uppercase, lowercase, number, 6–12 chars)

✅ Encrypted passwords using bcrypt

✅ Login with JWT-based sessions

✅ Protected route (/secrets)

✅ Logout clears token

✅ Show/Hide password toggle

✅ Deploy-ready for Render

🧑‍💻 Local Setup
1.Clone the repo
bash
Copy
Edit
git
cd whisper-app
2. Install dependencies
bash
Copy
Edit
npm install


🧠 Use your own values from MongoDB Atlas.

3.Run the server
bash
Copy
Edit
node app.js
Visit: http://localhost:5000

4.🌐 Deployment on Render
Push this project to GitHub

Go to https://render.com

Create a new Web Service

Choose your GitHub repo

Set:

Build Command: npm install

Start Command: node app.js

Add environment variables in Render:

JWT_SECRET

MONGO_URI

Click Deploy

✅ Done! Your app is now live 🎉

📁 Folder Structure
Copy
Edit
📦 whisper-app
├── 📁 views
│   ├── register.ejs
│   ├── login.ejs
│   ├── secrets.ejs
│   └── partials/
├── 📁 public
├── .env
├── app.js
├── package.json
└── README.md
✨ Author

Vinayak G RAGHU

Made with ❤️ for learning & growth

GitHub Profile- https://github.com/Vinayak7788722
