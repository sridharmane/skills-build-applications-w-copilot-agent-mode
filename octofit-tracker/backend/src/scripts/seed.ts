import mongoose from "mongoose";
import { Activity } from "../models/Activity";
import { Leaderboard } from "../models/Leaderboard";
import { Team } from "../models/Team";
import { User } from "../models/User";
import { Workout } from "../models/Workout";

const connectionString =
  process.env.MONGODB_URI || "mongodb://localhost:27017/octofit_db";

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log("Connected to octofit_db");
    console.log("Seed the octofit_db database with test data");

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      User.deleteMany({}),
      Team.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [trailblazers, coreCircuit] = await Team.create([
      {
        name: "Trail Blazers",
        mascot: "Bolt",
        city: "Seattle",
        members: [],
      },
      {
        name: "Core Circuit",
        mascot: "Pulse",
        city: "Austin",
        members: [],
      },
    ]);

    const [maya, jordan, priya, andre] = await User.create([
      {
        name: "Maya Chen",
        email: "maya.chen@example.com",
        age: 29,
        role: "Runner",
        team: trailblazers._id,
      },
      {
        name: "Jordan Lee",
        email: "jordan.lee@example.com",
        age: 34,
        role: "Cyclist",
        team: trailblazers._id,
      },
      {
        name: "Priya Shah",
        email: "priya.shah@example.com",
        age: 27,
        role: "Strength Coach",
        team: coreCircuit._id,
      },
      {
        name: "Andre Brooks",
        email: "andre.brooks@example.com",
        age: 31,
        role: "CrossFit Athlete",
        team: coreCircuit._id,
      },
    ]);

    await Promise.all([
      Team.findByIdAndUpdate(trailblazers._id, {
        members: [maya._id, jordan._id],
      }),
      Team.findByIdAndUpdate(coreCircuit._id, {
        members: [priya._id, andre._id],
      }),
    ]);

    await Activity.create([
      {
        user: maya._id,
        type: "Morning 5K Run",
        durationMinutes: 28,
        caloriesBurned: 310,
        activityDate: new Date("2026-07-10T13:30:00Z"),
      },
      {
        user: jordan._id,
        type: "Hill Cycling",
        durationMinutes: 52,
        caloriesBurned: 640,
        activityDate: new Date("2026-07-11T22:00:00Z"),
      },
      {
        user: priya._id,
        type: "Strength Circuit",
        durationMinutes: 45,
        caloriesBurned: 420,
        activityDate: new Date("2026-07-12T12:15:00Z"),
      },
      {
        user: andre._id,
        type: "Rowing Intervals",
        durationMinutes: 35,
        caloriesBurned: 390,
        activityDate: new Date("2026-07-12T21:45:00Z"),
      },
    ]);

    await Leaderboard.create([
      { user: jordan._id, team: trailblazers._id, points: 1280, rank: 1 },
      { user: priya._id, team: coreCircuit._id, points: 1195, rank: 2 },
      { user: maya._id, team: trailblazers._id, points: 1110, rank: 3 },
      { user: andre._id, team: coreCircuit._id, points: 1040, rank: 4 },
    ]);

    await Workout.create([
      {
        title: "Tempo Run Builder",
        difficulty: "Intermediate",
        durationMinutes: 40,
        focusArea: "Cardio Endurance",
        exercises: ["Dynamic warmup", "Tempo intervals", "Easy cooldown"],
      },
      {
        title: "Total Body Strength",
        difficulty: "Beginner",
        durationMinutes: 35,
        focusArea: "Strength",
        exercises: ["Goblet squats", "Push-ups", "Plank holds"],
      },
      {
        title: "Power Ride Intervals",
        difficulty: "Advanced",
        durationMinutes: 50,
        focusArea: "Cycling Power",
        exercises: ["Cadence drills", "Climb repeats", "Recovery spin"],
      },
    ]);

    console.log("Database seeding complete");
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
