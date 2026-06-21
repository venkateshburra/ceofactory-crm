# 🚀 Mini CRM Opportunity Tracker

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for managing sales opportunities through a shared CRM pipeline. The application implements secure JWT authentication, bcrypt password hashing, ownership-based authorization, and a responsive user interface. It also includes search, filtering, sorting, and pagination to efficiently manage opportunities.

---

## 🌐 Live Links

- **Frontend**: [https://ceofactory-crm.vercel.app/](https://ceofactory-crm.vercel.app/)
- **Backend API**: [https://ceofactory-crm.onrender.com/](https://ceofactory-crm.onrender.com/)
- **GitHub**: [https://github.com/venkateshburra/ceofactory-crm](https://github.com/venkateshburra/ceofactory-crm)

---

## 📌 Features

- ✅ User Registration & Login with JWT Authentication
- ✅ Secure Password Hashing (bcryptjs)
- ✅ Protected Routes & Authorization
- ✅ Create, View, Edit & Delete Opportunities
- ✅ Owner-based Authorization (Only creators can edit/delete)
- ✅ Real-time Search (Customer, Contact, Email, Requirement)
- ✅ Smart Filters (Stage, Priority, My Opportunities Only)
- ✅ Pagination (9 items per page)
- ✅ Responsive UI (Mobile, Tablet, Desktop)
- ✅ Toast Notifications & Confirmation Modals
- ✅ Loading States & Empty States

---

## 🛠 Tech Stack

**Frontend:** React.js, Vite, Tailwind CSS, React Router DOM, Axios, React Hot Toast

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs

**Deployment:** Vercel (Frontend), Render (Backend), MongoDB Atlas (Database)

---

## ⚙️ Setup

### Backend Setup
```bash
cd backend
npm install
```

**Create `.env` file:**
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

**Start server:**
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
```

**Create `.env` file:**
```env
VITE_API_URL=http://localhost:5000/api
```

**Start development server:**
```bash
npm run dev
```

---

## 📌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Opportunities
- `GET /api/opportunities` - Get all opportunities with filters (protected)
- `GET /api/opportunities/:id` - Get single opportunity (protected)
- `POST /api/opportunities` - Create opportunity (protected)
- `PUT /api/opportunities/:id` - Update opportunity (owner only)
- `DELETE /api/opportunities/:id` - Delete opportunity (owner only)

**Query Parameters:**
```
?page=1&limit=9&search=keyword&stage=New&priority=High&owner=me
```

---

## 🔒 Security

- JWT-based authentication with 2-hour token expiry
- Password hashing using bcryptjs
- Protected API routes
- Owner-based authorization for update/delete
- Backend validation prevents unauthorized actions
- Environment variables for sensitive data
- Input validation and error handling

---

## 📝 Code Quality

- Clean modular architecture (MVC pattern)
- RESTful API design
- Reusable React components
- Context API for state management
- Axios interceptors for authentication
- Protected routes with authorization guards
- Loading and error states
- Form validation
- Code is documented with meaningful comments where appropriate to improve readability and understanding.

---

## � Deployment

**Frontend:** Hosted on Vercel

**Backend:** Hosted on Render

**Database:** MongoDB Atlas

---

## 🧪 Test Credentials

Registration is enabled. You can register a new account and start using the application immediately.

**Or use the test account:**
- **Email:** burravenkatesh284@gmail.com
- **Password:** venky1234

---

## ✅ Expected Outcome Achieved

- ✔ Secure user authentication
- ✔ JWT-based authorization
- ✔ Shared opportunity pipeline
- ✔ Owner-based edit/delete permissions
- ✔ Responsive UI
- ✔ Full CRUD operations
- ✔ Backend validation and security
- ✔ MongoDB Atlas integration
- ✔ Frontend deployed on Vercel
- ✔ Backend deployed on Render
- ✔ Live application accessible online

---

## �👨‍💻 Developer

**Burra Venkatesh**

- GitHub: [https://github.com/venkateshburra](https://github.com/venkateshburra)

---

</div>
