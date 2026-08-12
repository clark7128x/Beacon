import { Router, Request, Response } from 'express';

const router = Router();

// Dummy login for Phase 0
router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email && password) {
    // In Phase 0, we just return a dummy token
    res.json({ token: 'dummy_jwt_token_phase_0' });
  } else {
    res.status(400).json({ error: 'Email and password required' });
  }
});

export default router;
