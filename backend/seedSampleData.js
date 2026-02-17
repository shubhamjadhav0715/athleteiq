const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const TrainingPlan = require('./models/TrainingPlan');
const Workout = require('./models/Workout');
const Performance = require('./models/Performance');
const Feedback = require('./models/Feedback');

const seedSampleData = async () => {
  try {
    console.log('🌱 Starting to seed sample data...');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing data (except admin)
    console.log('🗑️  Clearing existing sample data...');
    await User.deleteMany({ email: { $ne: 'admin@athleteiq.com' } });
    await TrainingPlan.deleteMany({});
    await Workout.deleteMany({});
    await Performance.deleteMany({});
    await Feedback.deleteMany({});

    // Create Coaches
    console.log('👨‍🏫 Creating coaches...');
    const coaches = await User.insertMany([
      {
        name: 'John Smith',
        email: 'john.coach@athleteiq.com',
        password: await bcrypt.hash('coach123', 10),
        role: 'coach',
        sportsCategory: 'Football',
        phone: '+1-555-0101'
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah.coach@athleteiq.com',
        password: await bcrypt.hash('coach123', 10),
        role: 'coach',
        sportsCategory: 'Basketball',
        phone: '+1-555-0102'
      },
      {
        name: 'Mike Williams',
        email: 'mike.coach@athleteiq.com',
        password: await bcrypt.hash('coach123', 10),
        role: 'coach',
        sportsCategory: 'Swimming',
        phone: '+1-555-0103'
      }
    ]);
    console.log(`✅ Created ${coaches.length} coaches`);

    // Create Athletes
    console.log('🏃 Creating athletes...');
    const athletes = await User.insertMany([
      {
        name: 'Alex Martinez',
        email: 'alex.athlete@athleteiq.com',
        password: await bcrypt.hash('athlete123', 10),
        role: 'athlete',
        sportsCategory: 'Football',
        phone: '+1-555-0201'
      },
      {
        name: 'Emma Davis',
        email: 'emma.athlete@athleteiq.com',
        password: await bcrypt.hash('athlete123', 10),
        role: 'athlete',
        sportsCategory: 'Basketball',
        phone: '+1-555-0202'
      },
      {
        name: 'James Wilson',
        email: 'james.athlete@athleteiq.com',
        password: await bcrypt.hash('athlete123', 10),
        role: 'athlete',
        sportsCategory: 'Football',
        phone: '+1-555-0203'
      },
      {
        name: 'Olivia Brown',
        email: 'olivia.athlete@athleteiq.com',
        password: await bcrypt.hash('athlete123', 10),
        role: 'athlete',
        sportsCategory: 'Swimming',
        phone: '+1-555-0204'
      },
      {
        name: 'Liam Taylor',
        email: 'liam.athlete@athleteiq.com',
        password: await bcrypt.hash('athlete123', 10),
        role: 'athlete',
        sportsCategory: 'Basketball',
        phone: '+1-555-0205'
      },
      {
        name: 'Sophia Anderson',
        email: 'sophia.athlete@athleteiq.com',
        password: await bcrypt.hash('athlete123', 10),
        role: 'athlete',
        sportsCategory: 'Swimming',
        phone: '+1-555-0206'
      }
    ]);
    console.log(`✅ Created ${athletes.length} athletes`);

    // Create Training Plans
    console.log('📋 Creating training plans...');
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);

    const trainingPlans = await TrainingPlan.insertMany([
      {
        title: 'Football Strength & Conditioning',
        description: 'Comprehensive 8-week program focusing on building strength, speed, and endurance for football players.',
        category: 'strength',
        coachId: coaches[0]._id,
        athleteIds: [athletes[0]._id, athletes[2]._id],
        duration: {
          weeks: 8,
          sessionsPerWeek: 4
        },
        startDate: today,
        endDate: new Date(today.getTime() + 56 * 24 * 60 * 60 * 1000),
        status: 'active'
      },
      {
        title: 'Basketball Agility Training',
        description: '6-week intensive agility and footwork program designed for basketball players.',
        category: 'agility',
        coachId: coaches[1]._id,
        athleteIds: [athletes[1]._id, athletes[4]._id],
        duration: {
          weeks: 6,
          sessionsPerWeek: 5
        },
        startDate: today,
        endDate: new Date(today.getTime() + 42 * 24 * 60 * 60 * 1000),
        status: 'active'
      },
      {
        title: 'Swimming Endurance Program',
        description: '10-week endurance building program for competitive swimmers.',
        category: 'endurance',
        coachId: coaches[2]._id,
        athleteIds: [athletes[3]._id, athletes[5]._id],
        duration: {
          weeks: 10,
          sessionsPerWeek: 6
        },
        startDate: today,
        endDate: new Date(today.getTime() + 70 * 24 * 60 * 60 * 1000),
        status: 'active'
      },
      {
        title: 'Speed Development - Football',
        description: '4-week explosive speed training for football athletes.',
        category: 'speed',
        coachId: coaches[0]._id,
        athleteIds: [athletes[0]._id],
        duration: {
          weeks: 4,
          sessionsPerWeek: 3
        },
        startDate: nextWeek,
        endDate: new Date(nextWeek.getTime() + 28 * 24 * 60 * 60 * 1000),
        status: 'active'
      },
      {
        title: 'Basketball Skills Mastery',
        description: '12-week comprehensive skills development program.',
        category: 'skills',
        coachId: coaches[1]._id,
        athleteIds: [athletes[1]._id],
        duration: {
          weeks: 12,
          sessionsPerWeek: 4
        },
        startDate: today,
        endDate: new Date(today.getTime() + 84 * 24 * 60 * 60 * 1000),
        status: 'active'
      }
    ]);
    console.log(`✅ Created ${trainingPlans.length} training plans`);

    // Create Workouts
    console.log('💪 Creating workout logs...');
    const workouts = [];
    
    // Create workouts for the past 2 weeks
    for (let i = 14; i >= 0; i--) {
      const workoutDate = new Date(today);
      workoutDate.setDate(today.getDate() - i);

      // Alex's workouts (Football)
      if (i % 2 === 0) {
        workouts.push({
          athleteId: athletes[0]._id,
          trainingPlanId: trainingPlans[0]._id,
          date: workoutDate,
          totalDuration: 60 + Math.floor(Math.random() * 30),
          caloriesBurned: 400 + Math.floor(Math.random() * 200),
          difficultyRating: 6 + Math.floor(Math.random() * 4),
          fatigueLevel: 5 + Math.floor(Math.random() * 4),
          mood: ['excellent', 'good', 'average'][Math.floor(Math.random() * 3)],
          notes: 'Great session! Feeling stronger each day.',
          completed: true
        });
      }

      // Emma's workouts (Basketball)
      if (i % 3 === 0) {
        workouts.push({
          athleteId: athletes[1]._id,
          trainingPlanId: trainingPlans[1]._id,
          date: workoutDate,
          totalDuration: 75 + Math.floor(Math.random() * 25),
          caloriesBurned: 450 + Math.floor(Math.random() * 150),
          difficultyRating: 7 + Math.floor(Math.random() * 3),
          fatigueLevel: 6 + Math.floor(Math.random() * 3),
          mood: ['excellent', 'good'][Math.floor(Math.random() * 2)],
          notes: 'Improved footwork drills today.',
          completed: true
        });
      }

      // James's workouts (Football)
      if (i % 2 === 1) {
        workouts.push({
          athleteId: athletes[2]._id,
          trainingPlanId: trainingPlans[0]._id,
          date: workoutDate,
          totalDuration: 55 + Math.floor(Math.random() * 35),
          caloriesBurned: 380 + Math.floor(Math.random() * 220),
          difficultyRating: 5 + Math.floor(Math.random() * 5),
          fatigueLevel: 4 + Math.floor(Math.random() * 5),
          mood: ['good', 'average', 'excellent'][Math.floor(Math.random() * 3)],
          notes: 'Focused on strength training.',
          completed: true
        });
      }

      // Olivia's workouts (Swimming)
      if (i % 2 === 0) {
        workouts.push({
          athleteId: athletes[3]._id,
          trainingPlanId: trainingPlans[2]._id,
          date: workoutDate,
          totalDuration: 90 + Math.floor(Math.random() * 30),
          caloriesBurned: 500 + Math.floor(Math.random() * 200),
          difficultyRating: 7 + Math.floor(Math.random() * 3),
          fatigueLevel: 7 + Math.floor(Math.random() * 2),
          mood: ['good', 'excellent'][Math.floor(Math.random() * 2)],
          notes: 'Long distance swimming session.',
          completed: true
        });
      }
    }

    await Workout.insertMany(workouts);
    console.log(`✅ Created ${workouts.length} workout logs`);

    // Create Performance Records
    console.log('📊 Creating performance records...');
    const performances = [];
    
    for (let i = 30; i >= 0; i -= 7) {
      const perfDate = new Date(today);
      perfDate.setDate(today.getDate() - i);

      // Alex's performance
      performances.push({
        athleteId: athletes[0]._id,
        date: perfDate,
        metrics: {
          weight: 75 - (i / 30) * 2,
          height: 180,
          bodyFat: 15 - (i / 30) * 1.5,
          muscleMass: 60 + (i / 30) * 2
        },
        strength: {
          benchPress: 80 + (30 - i) / 3,
          squat: 100 + (30 - i) / 2,
          deadlift: 120 + (30 - i) / 2
        },
        endurance: {
          vo2Max: 45 + (30 - i) / 10,
          runningDistance: 5 + (30 - i) / 15,
          runningTime: 25 - (30 - i) / 30
        }
      });

      // Emma's performance
      performances.push({
        athleteId: athletes[1]._id,
        date: perfDate,
        metrics: {
          weight: 65 - (i / 30) * 1.5,
          height: 175,
          bodyFat: 18 - (i / 30) * 1,
          muscleMass: 50 + (i / 30) * 1.5
        },
        strength: {
          benchPress: 50 + (30 - i) / 4,
          squat: 70 + (30 - i) / 3,
          deadlift: 80 + (30 - i) / 3
        },
        endurance: {
          vo2Max: 48 + (30 - i) / 10,
          runningDistance: 4 + (30 - i) / 20,
          runningTime: 22 - (30 - i) / 30
        }
      });
    }

    await Performance.insertMany(performances);
    console.log(`✅ Created ${performances.length} performance records`);

    // Create Feedback
    console.log('💬 Creating feedback messages...');
    const feedbacks = await Feedback.insertMany([
      {
        athleteId: athletes[0]._id,
        coachId: coaches[0]._id,
        trainingPlanId: trainingPlans[0]._id,
        message: 'The strength training is really intense. Could we add more recovery time between sessions?',
        response: 'Great progress Alex! I\'ll adjust the plan to include an extra rest day. Keep up the good work!',
        status: 'responded',
        createdAt: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        athleteId: athletes[1]._id,
        coachId: coaches[1]._id,
        trainingPlanId: trainingPlans[1]._id,
        message: 'Loving the agility drills! Feeling much faster on the court.',
        response: 'Excellent Emma! Your dedication is showing in your performance. Let\'s increase the intensity next week.',
        status: 'responded',
        createdAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        athleteId: athletes[3]._id,
        coachId: coaches[2]._id,
        trainingPlanId: trainingPlans[2]._id,
        message: 'The endurance sessions are challenging but I can feel the improvement!',
        status: 'pending',
        createdAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        athleteId: athletes[2]._id,
        coachId: coaches[0]._id,
        trainingPlanId: trainingPlans[0]._id,
        message: 'Need some guidance on proper squat form. Can we schedule a session?',
        response: 'Absolutely James! Let\'s meet tomorrow at 3 PM. I\'ll show you the proper technique.',
        status: 'responded',
        createdAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000)
      }
    ]);
    console.log(`✅ Created ${feedbacks.length} feedback messages`);

    console.log('\n🎉 Sample data seeded successfully!\n');
    console.log('📝 Test Accounts Created:\n');
    
    console.log('👨‍💼 ADMIN:');
    console.log('   Email: admin@athleteiq.com');
    console.log('   Password: admin123\n');
    
    console.log('👨‍🏫 COACHES:');
    console.log('   1. John Smith (Football)');
    console.log('      Email: john.coach@athleteiq.com');
    console.log('      Password: coach123\n');
    console.log('   2. Sarah Johnson (Basketball)');
    console.log('      Email: sarah.coach@athleteiq.com');
    console.log('      Password: coach123\n');
    console.log('   3. Mike Williams (Swimming)');
    console.log('      Email: mike.coach@athleteiq.com');
    console.log('      Password: coach123\n');
    
    console.log('🏃 ATHLETES:');
    console.log('   1. Alex Martinez (Football)');
    console.log('      Email: alex.athlete@athleteiq.com');
    console.log('      Password: athlete123\n');
    console.log('   2. Emma Davis (Basketball)');
    console.log('      Email: emma.athlete@athleteiq.com');
    console.log('      Password: athlete123\n');
    console.log('   3. James Wilson (Football)');
    console.log('      Email: james.athlete@athleteiq.com');
    console.log('      Password: athlete123\n');
    console.log('   4. Olivia Brown (Swimming)');
    console.log('      Email: olivia.athlete@athleteiq.com');
    console.log('      Password: athlete123\n');
    console.log('   5. Liam Taylor (Basketball)');
    console.log('      Email: liam.athlete@athleteiq.com');
    console.log('      Password: athlete123\n');
    console.log('   6. Sophia Anderson (Swimming)');
    console.log('      Email: sophia.athlete@athleteiq.com');
    console.log('      Password: athlete123\n');

    console.log('📊 Data Summary:');
    console.log(`   - ${coaches.length} Coaches`);
    console.log(`   - ${athletes.length} Athletes`);
    console.log(`   - ${trainingPlans.length} Training Plans`);
    console.log(`   - ${workouts.length} Workout Logs`);
    console.log(`   - ${performances.length} Performance Records`);
    console.log(`   - ${feedbacks.length} Feedback Messages\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedSampleData();
