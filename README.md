# Smart Coaching & Training Planner

A full-stack MERN application for managing sports training programs. Coaches can create personalized training plans, and athletes can track their workouts and progress.

## Features

- **Admin Dashboard**: Manage users, view system statistics
- **Coach Dashboard**: Create training plans, assign to athletes, track progress
- **Athlete Dashboard**: View assigned plans, log workouts, track performance
- **Authentication**: Secure JWT-based authentication with role-based access
- **Real-time Updates**: Dynamic data updates across all dashboards

## Tech Stack

- **Frontend**: React.js, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT & bcrypt

## Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/shubhamjadhav0715/smart-coaching-training-planner.git
cd smart-coaching-training-planner
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

3. **Setup Frontend** (in new terminal)
```bash
cd frontend
npm install
npm start
```

4. **Access the app**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Default Credentials

Register as Coach or Athlete. For Admin access, manually update user role in MongoDB:

```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

## Project Structure

```
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # Business logic
│   ├── middleware/     # Auth & validation
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API endpoints
│   └── server.js       # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── context/    # React context
│   │   ├── pages/      # Dashboard pages
│   │   └── utils/      # Helper functions
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Coach
- `POST /api/coach/plans` - Create training plan
- `GET /api/coach/plans` - Get all plans
- `GET /api/coach/athletes` - Get assigned athletes

### Athlete
- `GET /api/athlete/plans` - Get assigned plans
- `POST /api/athlete/workouts` - Log workout
- `GET /api/athlete/workouts` - Get workout history

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/stats` - Get system statistics
- `DELETE /api/admin/users/:id` - Delete user

## Contributing

Pull requests are welcome! For major changes, please open an issue first.

## License

MIT

## Author

Shubham Jadhav - [GitHub](https://github.com/shubhamjadhav0715)
