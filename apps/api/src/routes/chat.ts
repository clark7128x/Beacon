import { Router, Request, Response } from 'express';

const router = Router();

// Dummy chat response for Phase 0
// Replaced with WebSocket in Phase 1
router.post('/', (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // A dummy reply matching the schema expected by the UI
  res.json({
    reply: "I am a dummy bot reply for Phase 0. Real RAG starts in Phase 1.",
    confidence_score: 0.95,
    citations: []
  });
});

export default router;
