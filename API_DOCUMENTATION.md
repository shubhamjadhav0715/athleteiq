# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## 🔐 Authentication Routes

### Register User
```http
POST /auth/register
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "athlete",
  "phone": "1234567890",
  "dateOfBirth": "1995-01-01",
  "gender": "male",
  "sportsCategory": "Football"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "athlete",
    "token": "jwt_token_here"
  }
}
```

### Login
```http
POST /auth/login
```

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Current User
```http
GET /auth/me
```
**Headers:** `Authorization: Bearer <token>`

---

## 👨‍💼 Admin Routes

All admin routes require `admin` role.

### Get All Users
```http
GET /admin/users
```

### Get Users by Role
```http
GET /admin/users/role/:role
```
**Params:** `role` - admin, coach, or athlete

### Update User
```http
PUT /admin/users/:id
```

### Delete User
```http
DELETE /admin/users/:id
```

### Get System Statistics
```http
GET /admin/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 150,
    "totalCoaches": 10,
    "totalAthletes": 135,
    "totalPlans": 45,
    "activePlans": 30,
    "totalWorkouts": 1250
  }
}
```

---

## 🏋️ Coach Routes

All coach routes require `coach` role.

### Create Training Plan
```http
POST /coach/plans
```

**Body:**
```json
{
  "title": "Strength Building Program",
  "description": "8-week strength training program",
  "athleteIds": ["athlete_id_1", "athlete_id_2"],
  "category": "strength",
  "duration": {
    "weeks": 8,
    "sessionsPerWeek": 4
  },
  "startDate": "2024-01-01",
  "endDate": "2024-02-26",
  "workouts": [
    {
      "day": 1,
      "title": "Upper Body Strength",
      "exercises": [
        {
          "name": "Bench Press",
          "sets": 4,
          "reps": "8-10",
          "intensity": "high"
        }
      ]
    }
  ],
  "status": "active"
}
```

**Note:** Automatically sends email notifications to assigned athletes.

### Get My Training Plans
```http
GET /coach/plans
```

### Get Specific Plan
```http
GET /coach/plans/:id
```

### Update Training Plan
```http
PUT /coach/plans/:id
```

### Delete Training Plan
```http
DELETE /coach/plans/:id
```

### Download Plan Report (PDF)
```http
GET /coach/plans/:id/download
```
**Response:** PDF file download

### Get My Athletes
```http
GET /coach/athletes
```

### Get Athlete Progress
```http
GET /coach/athletes/:athleteId/progress
```

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalWorkouts": 45,
      "totalDuration": 30,
      "avgDifficulty": "7.5"
    },
    "workouts": [...],
    "performance": [...]
  }
}
```

### Respond to Feedback
```http
PUT /coach/feedback/:id/respond
```

**Body:**
```json
{
  "message": "Great progress! Keep up the good work."
}
```

**Note:** Automatically sends email notification to athlete.

---

## 🏃 Athlete Routes

All athlete routes require `athlete` role.

### Get My Training Plans
```http
GET /athlete/plans
```

### Log Workout
```http
POST /athlete/workouts
```

**Body:**
```json
{
  "trainingPlanId": "plan_id",
  "date": "2024-01-15",
  "exercises": [
    {
      "name": "Bench Press",
      "setsCompleted": 4,
      "repsCompleted": "10,9,8,8",
      "weight": "80kg"
    }
  ],
  "totalDuration": 60,
  "caloriesBurned": 350,
  "difficultyRating": 7,
  "fatigueLevel": 6,
  "mood": "good",
  "notes": "Felt strong today"
}
```

### Get My Workouts
```http
GET /athlete/workouts?startDate=2024-01-01&endDate=2024-01-31
```

**Query Params:**
- `startDate` (optional) - Filter from date
- `endDate` (optional) - Filter to date

### Update Workout
```http
PUT /athlete/workouts/:id
```

### Log Performance Metrics
```http
POST /athlete/performance
```

**Body:**
```json
{
  "date": "2024-01-15",
  "metrics": {
    "weight": 75,
    "bodyFat": 12,
    "muscleMass": 65,
    "vo2Max": 55,
    "restingHeartRate": 60,
    "strength": {
      "benchPress": 100,
      "squat": 140,
      "deadlift": 160
    },
    "endurance": {
      "runTime5k": 22,
      "runTime10k": 48
    }
  },
  "notes": "New personal best on squat!"
}
```

### Get My Performance History
```http
GET /athlete/performance
```

### Submit Feedback
```http
POST /athlete/feedback
```

**Body:**
```json
{
  "coachId": "coach_id",
  "trainingPlanId": "plan_id",
  "type": "plan",
  "rating": 5,
  "message": "The training plan is excellent!"
}
```

### Get My Feedback
```http
GET /athlete/feedback
```

### Get Analytics (NEW)
```http
GET /athlete/analytics
```

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalWorkouts": 45,
      "totalDuration": 30,
      "totalCalories": 15750,
      "avgDifficulty": "7.5",
      "avgFatigue": "6.2"
    },
    "workoutsByCategory": [
      { "_id": "strength", "count": 20 },
      { "_id": "endurance", "count": 15 }
    ],
    "last7Days": [
      {
        "date": "01/15/2024",
        "duration": 60,
        "calories": 350,
        "difficulty": 7
      }
    ],
    "recentPerformance": [...]
  }
}
```

### Download Training Report (PDF) (NEW)
```http
GET /athlete/report/download
```
**Response:** PDF file download with complete training history

---

## 📊 Data Models

### User
- name, email, password, role (admin/coach/athlete)
- phone, dateOfBirth, gender, sportsCategory
- coachId (for athletes), isActive, profileImage

### Training Plan
- title, description, coachId, athleteIds[]
- category (strength/endurance/skills/flexibility/speed/mixed)
- duration (weeks, sessionsPerWeek)
- startDate, endDate, workouts[], goals[]
- status (draft/active/completed/archived)

### Workout
- athleteId, trainingPlanId, date
- exercises[], totalDuration, caloriesBurned
- difficultyRating (1-10), fatigueLevel (1-10)
- mood, notes, injuries[], completed

### Performance
- athleteId, trainingPlanId, date
- metrics (weight, bodyFat, muscleMass, vo2Max, etc.)
- strength metrics, endurance metrics, speed metrics
- customMetrics[], notes

### Feedback
- athleteId, coachId, trainingPlanId, workoutId
- type (workout/plan/general), rating (1-5)
- message, coachResponse, status

### Injury (NEW)
- athleteId, bodyPart, severity (minor/moderate/severe)
- description, dateOccurred, expectedRecoveryDate
- treatment, restrictions[], status
- coachNotes, followUpDates[]

---

## 🔒 Role-Based Access

| Route | Admin | Coach | Athlete |
|-------|-------|-------|---------|
| /admin/* | ✅ | ❌ | ❌ |
| /coach/* | ❌ | ✅ | ❌ |
| /athlete/* | ❌ | ❌ | ✅ |
| /auth/* | ✅ | ✅ | ✅ |

---

## 📧 Email Notifications

Automatic emails are sent for:
1. **Plan Assignment** - When coach assigns training plan to athletes
2. **Feedback Response** - When coach responds to athlete feedback

Configure in `.env`:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

---

## 📄 PDF Reports

### Athlete Training Report
- Workout summary (total workouts, duration, calories)
- Recent workout details (last 10)
- Performance metrics history
- Strength, endurance, and custom metrics

### Training Plan Report
- Plan details and description
- Assigned athletes list
- Complete workout schedule
- Exercise details for each day

---

## ⚠️ Error Responses

All errors follow this format:
```json
{
  "success": false,
  "message": "Error description here"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## 🧪 Testing with Postman/Thunder Client

1. Register a user with role "admin", "coach", or "athlete"
2. Login to get JWT token
3. Add token to Authorization header for protected routes
4. Test endpoints based on user role

---

## 📝 Notes

- All dates should be in ISO 8601 format
- JWT tokens expire based on `JWT_EXPIRE` env variable (default: 7d)
- File uploads (profile images) use multipart/form-data
- PDF downloads return binary data with appropriate headers
