import { Router } from 'express';

const router = Router();

router.get('/users/', (_req, res) => {
  res.json({ users: [] });
});

router.get('/teams/', (_req, res) => {
  res.json({ teams: [] });
});

router.get('/activities/', (_req, res) => {
  res.json({ activities: [] });
});

router.get('/leaderboard/', (_req, res) => {
  res.json({ leaderboard: [] });
});

router.get('/workouts/', (_req, res) => {
  res.json({ workouts: [] });
});

export default router;
