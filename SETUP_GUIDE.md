# 🚀 Setup Guide - Smart Coaching & Training Planner

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

---

## 📦 Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/shubhamjadhav0715/smart-coaching-training-planner.git
cd smart-coaching-training-planner
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Environment Configuration

Create `.env` file in the `backend` folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-coaching
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development

# Email Configuration (Optional - for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

**For Gmail:**
1. Enable 2-Factor Authentication
2. Generate App Password: Google Account → Security → 2-Step Verification → App Passwords
3. Use the generated password in `EMAIL_PASS`

### 4. Create Admin User

Run the admin seeder script:

```bash
npm run seed:admin
```

**Default Admin Credentials:**
```
Email: admin@smartcoaching.com
Password: admin123
Role: admin
```

⚠️ **IMPORTANT:** Change the password after first login!

### 5. Start Backend Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will run on: `http://localhost:5000`

### 6. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend will run on: `http://localhost:3000`

---

## 👥 Default User Accounts

### Admin Account
```
Email: admin@smartcoaching.com
Password: admin123
```

**Admin Capabilities:**
- Manage all users (coaches and athletes)
- View system statistics
- Update/delete any user
- Monitor platform activity

### Creating Coach Account

**Option 1: Via Admin Dashboard**
1. Login as admin
2. Go to Users Management
3. Create new user with role "coach"

**Option 2: Via API**
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Coach",
  "email": "coach@example.com",
  "password": "coach123",
  "role": "coach",
  "phone": "1234567890"
}
```

### Creating Athlete Account

**Option 1: Via Registration Page**
1. Go to `http://localhost:3000/register`
2. Fill in details
3. Select role: "athlete"

**Option 2: Via API**
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Jane Athlete",
  "email": "athlete@example.com",
  "password": "athlete123",
  "role": "athlete",
  "sportsCategory": "Football",
  "dateOfBirth": "1995-01-01",
  "gender": "female"
}
```

---

## 🧪 Testing the Application

### 1. Test Admin Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@smartcoaching.com",
  "password": "admin123"
}
```

### 2. Get System Stats (Admin Only)
```bash
GET http://localhost:5000/api/admin/stats
Authorization: Bearer <admin_token>
```

### 3. Create Training Plan (Coach)
```bash
POST http://localhost:5000/api/coach/plans
Authorization: Bearer <coach_token>
Content-Type: application/json

{
  "title": "Beginner Strength Program",
  "description": "4-week strength building program",
  "category": "strength",
  "duration": {
    "weeks": 4,
    "sessionsPerWeek": 3
  },
  "startDate": "2024-01-01",
  "endDate": "2024-01-28",
  "athleteIds": ["<athlete_id>"],
  "status": "active"
}
```

---

## 📁 Project Structure

```
smart-coaching-training-planner/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── adminController.js    # Admin operations
│   │   ├── athleteController.js  # Athlete operations
│   │   ├── authController.js     # Authentication
│   │   └── coachController.js    # Coach operations
│   ├── middleware/
│   │   ├── auth.js               # JWT authentication
│   │   └── roleCheck.js          # Role-based access
│   ├── models/
│   │   ├── User.js               # User model
│   │   ├── TrainingPlan.js       # Training plan model
│   │   ├── Workout.js            # Workout model
│   │   ├── Performance.js        # Performance metrics
│   │   ├── Feedback.js           # Feedback model
│   │   └── Injury.js             # Injury tracking
│   ├── routes/
│   │   ├── admin.js              # Admin routes
│   │   ├── athlete.js            # Athlete routes
│   │   ├── auth.js               # Auth routes
│   │   └── coach.js              # Coach routes
│   ├── utils/
│   │   ├── emailService.js       # Email notifications
│   │   └── pdfService.js         # PDF report generation
│   ├── .env.example              # Environment template
│   ├── package.json
│   ├── seedAdmin.js              # Admin seeder
│   └── server.js                 # Entry point
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   │   ├── Admin/
│   │   │   ├── Athlete/
│   │   │   ├── Coach/
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── API_DOCUMENTATION.md          # Complete API reference
├── BUGFIXES.md                   # Bug fixes documentation
├── README.md                     # Project overview
└── SETUP_GUIDE.md               # This file
```

---

## 🔧 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
1. Make sure MongoDB is running: `mongod`
2. Or use MongoDB Atlas cloud database
3. Update `MONGODB_URI` in `.env`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
1. Kill the process: `lsof -ti:5000 | xargs kill -9`
2. Or change PORT in `.env`

### JWT Secret Error
```
Error: secretOrPrivateKey must have a value
```

**Solution:**
Add `JWT_SECRET` to your `.env` file

### Email Not Sending
**Solution:**
1. Check email credentials in `.env`
2. For Gmail, use App Password (not regular password)
3. Email features are optional - app works without them

---

## 📊 Database Collections

After running the app, MongoDB will have these collections:

- `users` - All users (admin, coaches, athletes)
- `trainingplans` - Training programs
- `workouts` - Logged workout sessions
- `performances` - Performance metrics
- `feedbacks` - Athlete-coach feedback
- `injuries` - Injury tracking records

---

## 🎯 Quick Start Workflow

1. **Start MongoDB**
   ```bash
   mongod
   ```

2. **Start Backend** (Terminal 1)
   ```bash
   cd backend
   npm run dev
   ```

3. **Start Frontend** (Terminal 2)
   ```bash
   cd frontend
   npm start
   ```

4. **Create Admin** (Terminal 3)
   ```bash
   cd backend
   npm run seed:admin
   ```

5. **Login**
   - Go to `http://localhost:3000`
   - Email: `admin@smartcoaching.com`
   - Password: `admin123`

---

## 📚 Additional Resources

- **API Documentation:** See `API_DOCUMENTATION.md`
- **Bug Fixes:** See `BUGFIXES.md`
- **Main README:** See `README.md`

---

## 🆘 Need Help?

If you encounter any issues:

1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure MongoDB is running
4. Check if ports 3000 and 5000 are available
5. Review the API documentation for correct request formats

---

## 🎉 You're All Set!

Your Smart Coaching & Training Planner is now ready to use!

**Next Steps:**
1. Login as admin
2. Create coach accounts
3. Create athlete accounts
4. Assign athletes to coaches
5. Create training plans
6. Start tracking progress!
