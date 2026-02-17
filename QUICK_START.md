# ⚡ Quick Start Reference

## 🔑 Default Admin Credentials

```
Email:    admin@smartcoaching.com
Password: admin123
```

⚠️ **Change password after first login!**

---

## 🚀 Start the Application

### 1. Start MongoDB
```bash
mongod
```

### 2. Create Admin User (First Time Only)
```bash
cd backend
npm run seed:admin
```

### 3. Start Backend
```bash
cd backend
npm run dev
```
✅ Backend running on: `http://localhost:5000`

### 4. Start Frontend
```bash
cd frontend
npm start
```
✅ Frontend running on: `http://localhost:3000`

---

## 📝 Create Test Users

### Create Coach
```bash
POST http://localhost:5000/api/auth/register

{
  "name": "Test Coach",
  "email": "coach@test.com",
  "password": "coach123",
  "role": "coach"
}
```

### Create Athlete
```bash
POST http://localhost:5000/api/auth/register

{
  "name": "Test Athlete",
  "email": "athlete@test.com",
  "password": "athlete123",
  "role": "athlete",
  "sportsCategory": "Football"
}
```

---

## 🎯 Common Tasks

### Login
```bash
POST http://localhost:5000/api/auth/login

{
  "email": "admin@smartcoaching.com",
  "password": "admin123"
}
```

### Get System Stats (Admin)
```bash
GET http://localhost:5000/api/admin/stats
Authorization: Bearer <token>
```

### Create Training Plan (Coach)
```bash
POST http://localhost:5000/api/coach/plans
Authorization: Bearer <coach_token>

{
  "title": "Strength Program",
  "description": "4-week program",
  "category": "strength",
  "duration": { "weeks": 4, "sessionsPerWeek": 3 },
  "startDate": "2024-01-01",
  "endDate": "2024-01-28",
  "athleteIds": ["<athlete_id>"],
  "status": "active"
}
```

### Log Workout (Athlete)
```bash
POST http://localhost:5000/api/athlete/workouts
Authorization: Bearer <athlete_token>

{
  "trainingPlanId": "<plan_id>",
  "date": "2024-01-15",
  "totalDuration": 60,
  "caloriesBurned": 350,
  "difficultyRating": 7,
  "mood": "good"
}
```

---

## 📊 Key Endpoints

| Endpoint | Method | Role | Description |
|----------|--------|------|-------------|
| `/api/auth/login` | POST | All | Login |
| `/api/auth/register` | POST | All | Register |
| `/api/admin/stats` | GET | Admin | System stats |
| `/api/coach/plans` | POST | Coach | Create plan |
| `/api/athlete/analytics` | GET | Athlete | Get analytics |
| `/api/athlete/report/download` | GET | Athlete | Download PDF |

---

## 🔧 Environment Variables

Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-coaching
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

---

## 📚 Full Documentation

- **Setup Guide:** `SETUP_GUIDE.md`
- **API Docs:** `API_DOCUMENTATION.md`
- **Bug Fixes:** `BUGFIXES.md`
- **README:** `README.md`

---

## ✅ Checklist

- [ ] MongoDB running
- [ ] Backend `.env` configured
- [ ] Admin user created (`npm run seed:admin`)
- [ ] Backend running (`npm run dev`)
- [ ] Frontend running (`npm start`)
- [ ] Logged in successfully
- [ ] Created test users

---

## 🆘 Troubleshooting

**MongoDB not connecting?**
```bash
# Start MongoDB
mongod

# Or use MongoDB Atlas
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
```

**Port already in use?**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

**Admin already exists?**
- Admin was already created
- Use existing credentials
- Or delete from database and re-run seed

---

**🎉 Ready to go! Login at http://localhost:3000**
