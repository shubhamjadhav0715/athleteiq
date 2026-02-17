# 🚀 Setup Guide - AthleteIQ

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

---

## 📦 Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/shubhamjadhav0715/athleteiq.git
cd athleteiq
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
MONGODB_URI=mongodb://localhost:27017/athleteiq
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

```bash
# Make sure you're in the backend folder
node seedAdmin.js
```

You should see:
```
✅ Admin user created successfully!
Email: admin@athleteiq.com
Password: admin123
```

### 5. Start Backend Server

```bash
npm start
# or for development with auto-reload
npm run dev
```

Backend will run on: http://localhost:5000

---

### 6. Frontend Setup

Open a **new terminal** window:

```bash
cd frontend
npm install
```

### 7. Start Frontend

```bash
npm start
```

Frontend will run on: http://localhost:3000

---

## 🔐 Default Credentials

### Admin Account
```
Email: admin@athleteiq.com
Password: admin123
```

⚠️ **IMPORTANT:** Change the password after first login!

---

## 🧪 Testing the Setup

### 1. Check Backend Health
Open browser and go to:
```
http://localhost:5000/api/health
```

You should see:
```json
{
  "success": true,
  "message": "AthleteIQ API is running",
  "version": "1.0.0",
  "timestamp": "2026-..."
}
```

### 2. Access Frontend
Open browser and go to:
```
http://localhost:3000
```

You should see the AthleteIQ login page.

### 3. Login as Admin
- Email: `admin@athleteiq.com`
- Password: `admin123`

---

## 📁 Project Structure

```
athleteiq/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── adminController.js
│   │   ├── coachController.js
│   │   └── athleteController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── TrainingPlan.js
│   │   ├── Workout.js
│   │   ├── Performance.js
│   │   ├── Feedback.js
│   │   └── Injury.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── coachRoutes.js
│   │   └── athleteRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── utils/
│   │   ├── emailService.js
│   │   └── pdfService.js
│   ├── server.js
│   ├── seedAdmin.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Admin/
│   │   │   │   └── Dashboard.js
│   │   │   ├── Coach/
│   │   │   │   └── Dashboard.js
│   │   │   └── Athlete/
│   │   │       └── Dashboard.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── Documentation files
```

---

## 🔧 MongoDB Setup

### Option 1: Local MongoDB

1. **Install MongoDB:**
   - Windows: https://www.mongodb.com/try/download/community
   - Mac: `brew install mongodb-community`
   - Linux: `sudo apt-get install mongodb`

2. **Start MongoDB:**
   - Windows: `net start MongoDB`
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

3. **Verify MongoDB is running:**
   ```bash
   mongosh
   ```

### Option 2: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Update `.env` file:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/athleteiq
   ```

---

## 🚀 Running in Production

### Backend

1. Set environment to production:
```env
NODE_ENV=production
```

2. Use PM2 for process management:
```bash
npm install -g pm2
pm2 start server.js --name athleteiq-backend
```

### Frontend

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Serve the build folder using nginx or serve:
```bash
npm install -g serve
serve -s build -l 3000
```

---

## 🔒 Security Checklist

- [ ] Change default admin password
- [ ] Update JWT_SECRET to a strong random string
- [ ] Enable HTTPS in production
- [ ] Set up CORS properly for production domain
- [ ] Use environment variables for all secrets
- [ ] Enable MongoDB authentication
- [ ] Set up rate limiting
- [ ] Enable helmet.js for security headers
- [ ] Regular security updates

---

## 📊 Database Collections

After running the application, MongoDB will have these collections:

1. **users** - All users (admin, coaches, athletes)
2. **trainingplans** - Training programs created by coaches
3. **workouts** - Logged workout sessions by athletes
4. **performances** - Performance metrics and analytics
5. **feedbacks** - Athlete-coach communication
6. **injuries** - Injury tracking and recovery

---

## 🐛 Troubleshooting

### Backend won't start

**Problem:** Port 5000 already in use
```bash
# Find process using port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

### MongoDB connection failed

**Problem:** MongoDB not running
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Frontend won't start

**Problem:** Port 3000 already in use
- React will ask if you want to use another port
- Type `Y` and it will use port 3001

### npm install fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Install again
npm install
```

---

## 📚 Additional Resources

- **Quick Start:** See `QUICK_START.md`
- **API Documentation:** See `API_DOCUMENTATION.md`
- **Bug Fixes:** See `BUGFIXES.md`
- **Branding Guide:** See `BRANDING.md`

---

## 🎯 Next Steps

After successful setup:

1. **Login as Admin**
   - Email: admin@athleteiq.com
   - Password: admin123

2. **Create Coach Account**
   - Register as coach
   - Admin can manage coaches

3. **Create Athlete Account**
   - Register as athlete
   - Assign to coach

4. **Create Training Plan**
   - Login as coach
   - Create new training plan
   - Assign to athletes

5. **Log Workouts**
   - Login as athlete
   - Log daily workouts
   - Track progress

---

## 💡 Tips

- Use **Chrome DevTools** for debugging
- Check **browser console** for frontend errors
- Check **terminal** for backend errors
- Use **MongoDB Compass** to view database
- Enable **React DevTools** extension

---

## 📞 Support

For issues or questions:
- Check documentation files
- Review API_DOCUMENTATION.md
- See QUICK_START.md for common tasks

---

**© 2026 AthleteIQ - Smart Coaching Platform**

**Happy Coding! 🚀**
