# 🤖 AI Chat Application

An AI-powered chat application built using the **MERN Stack** and **Google Gemini API**. This project enables users to securely authenticate, interact with an AI assistant in real time, and manage conversation history through a clean and responsive interface.

---

## 📌 Table of Contents

- Overview
- Features
- Tech Stack
- Architecture
- Folder Structure
- Installation
- Environment Variables
- Running the Application
- API Endpoints
- Database Schema
- Security
- Performance Optimizations
- Future Enhancements
- Deployment
- Screenshots
- Author
- License

---

# 📖 Overview

This application demonstrates the integration of Google's Gemini API into a production-style MERN application. It follows a modular architecture, implements secure authentication, and persists user conversations using MongoDB.

---

# ✨ Features

- User Registration & Login
- JWT Authentication
- Password Hashing (bcrypt)
- AI Chat powered by Google Gemini
- Persistent Chat History
- Protected Routes
- Responsive UI
- Loading Indicators
- Error Handling
- Clean and Modular Codebase

---

# 🛠 Tech Stack

### Frontend
- React.js
- Context
- React Router
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication
- JWT
- bcrypt

### AI Integration
- Google Gemini API

### Deployment
- Vercel
- Render
- MongoDB Atlas

---

# 🏗 System Architecture

```
                 React Frontend
                       │
                    Axios API
                       │
                       ▼
               Express Backend
                       │
        ┌──────────────┴──────────────┐
        │                             │
 Authentication                Chat Service
        │                             │
     MongoDB                    Gemini API
```

---

# 📁 Folder Structure

```
AI-Chat-App

client/
│
├── public/
├── src/
│   ├── api/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── Routes/
│   ├── services/
│   ├── styles/
│   ├── utils/
│   └── App.js
│   └── App.css
│   └── index.js
│   └── index.css
│
└── package.json

server/
│
├── app/
│   ├── controller/
│   ├── model/
│   ├── routes/
│   ├── services/
│   ├── validations/
│ 
├── config/
├── middleware/
├── utils/
├── app.js
└── server.js

README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/lakshmipriyaks31-art/AI_Chat_Assistant.git
```

```bash
cd AI_Chat_Assistant
```

## Install Backend

```bash
cd server
npm install
```

## Install Frontend

```bash
cd client
npm install
```

---

# 🔑 Environment Variables

## Backend (.env)

```env
PORT=3005

MONGO_URI=your_mongodb_uri

OPEN_AI_KEY=ope ai api key

jwtSecret=your_secret

jwtrefreshSecret=your_secret

cryptoSecret=your_secret

GEMINI=your_gemini_api_key
```

## Frontend (.env)

```env
REACT_APP_BACKEND_API=http://localhost:3005/api/

REACT_APP_user=user/

REACT_APP_chat=chat/

REACT_APP_message=message/

```

---

# ▶️ Running the Application

## Backend

```bash
npm start
```

## Frontend

```bash
npm start
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint             | Description   |
|--------|----------------------|---------------|
| POST   | /api/user/register   | Register User |
| POST   | /api/user/login      | Login User    |

## Chat

| Method | Endpoint       | Description               |
|--------|----------------|---------------------------|
| POST   | /api/chat      | Get Chat history          |
| GET    | /api/chat/:id  | Get id based Conversation |
| POST   | /api/message   | Send message to AI        |
| DELETE | /api/chat/:id  | Delete Conversation       |

---

# 🗄 Database Schema

## User

```javascript
{
  username: String,
  password: String
}
```

## Chat

```javascript
{
  userId: ObjectId,
  topic: String,
  deleted: Number,
  latestmessage: String,
}
```
## Message

```javascript
{
  userid: ObjectId,
  chatid: ObjectId,
  content: String
}
```

---

# 🔒 Security

- JWT Authentication
- Password Hashing with bcrypt
- Protected Routes
- Environment Variables
- Request Validation
- Centralized Error Handling
- CORS Configuration

---

# ⚡ Performance Optimizations

- Lazy Loading
- Reusable Components
- Optimized MongoDB Queries
- Database Indexing
- Efficient State Management
- Modular Backend Architecture

---

# 🚀 Future Enhancements

- Streaming AI Responses
- Voice Chat
- Image Generation
- File Upload Support
- Conversation Search
- Multi-model AI Support
- Dark Mode
- Chat Export (PDF)

---

# ☁️ Deployment

| Service   | Platform |
|-----------|----------|
| Frontend  | Vercel |
| Backend   | Render |
| Database  | MongoDB Atlas |

---


# 👨‍💻 Author

**K S Lakshmi Priya**

Software Engineer

GitHub: https://github.com/lakshmipriyaks31-art

LinkedIn: https://www.linkedin.com/in/kslp31/

---

# 📄 License

This project is licensed under the MIT License.