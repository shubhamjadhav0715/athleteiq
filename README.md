# Smart Coaching & Training Planner

<img width="1919" height="1020" alt="image" src="https://github.com/user-attachments/assets/8b01e49c-7663-41d5-be6b-69457761b496" />

## Introduction

The **Smart Coaching & Training Planner** is a web-based sports management application developed using the MERN stack that helps coaches plan, monitor, and optimize athlete training programs. Instead of using manual training charts and verbal instructions, coaches can create personalized training schedules, assign drills, and track player performance digitally. Athletes can log their daily workouts, view assigned plans, and provide feedback, enabling data-driven coaching and performance improvement.

## Technology Stack

- **Frontend:** React.js (interactive dashboards for coaches and athletes)
- **Backend:** Node.js with Express.js (training logic and REST APIs)
- **Database:** MongoDB (training plans, performance logs, user data)
- **Authentication:** JWT & bcrypt (secure role-based access)

## Key Modules & Features

### 1. Admin Module
- Manage coaches, athletes, and sports categories
- Monitor overall training activity and system usage
- Generate performance and participation reports

### 2. Coach Module
- Create customized training plans (strength, endurance, skills)
- Assign workouts and drills to individual athletes or teams
- Track athlete progress using performance metrics and graphs
- Provide feedback and adjust training plans accordingly

### 3. Athlete Module
- Secure login to view assigned training schedules
- Log daily workouts and performance data
- Track progress and improvement history
- Submit feedback on training difficulty and fatigue levels

## Additional Features

- Progress visualization using charts and analytics
- Training reminders via email or notifications
- Injury prevention tracking and rest-day planning
- Export training reports in PDF/Excel format
- Mobile-friendly design for on-field access

## How to Run

### Prerequisites
- Node.js installed
- MongoDB installed and running

### Backend Setup

1. Navigate to backend folder
```bash
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Create .env file
```bash
cp .env.example .env
```

4. Edit .env file with your MongoDB connection string

5. Start backend server
```bash
npm run dev
```

Backend will run on: http://localhost:5000

### Frontend Setup

1. Open new terminal and navigate to frontend folder
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Start frontend
```bash
npm start
```

Frontend will run on: http://localhost:3000

### Access the Application

Open browser and go to: http://localhost:3000

## Screenshots

1. **Dashboard Overview**
<img width="1919" height="1020" alt="image" src="https://github.com/user-attachments/assets/b41609a1-293d-4013-a4f7-d47c50ab689b" />

2. **Training Plans**
<img width="1919" height="911" alt="Screenshot 2025-12-27 135032" src="https://github.com/user-attachments/assets/febee724-4117-49c2-92e2-8c4805def030" />

3. **Performance Tracking**
<img width="1919" height="1035" alt="Screenshot 2025-12-27 135125" src="https://github.com/user-attachments/assets/37e3fc60-b655-419f-bcb9-a9bd7f66f8cb" />

4. **Athlete Progress**
<img width="1919" height="1012" alt="Screenshot 2025-12-27 135057" src="https://github.com/user-attachments/assets/fff7eb08-06b4-40b2-bc77-e1a9238e40d8" />

## Conclusion

The Smart Coaching & Training Planner provides a structured, digital approach to sports training management. By leveraging the MERN stack, it enhances communication between coaches and athletes, supports data-driven decisions, and helps improve athletic performance through organized training and progress tracking.
