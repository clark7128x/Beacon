import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../../app';

describe('Chat API', () => {
  it('should return a dummy response for Phase 0', async () => {
    const res = await request(app)
      .post('/api/v1/chat')
      .send({ message: 'Hello' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('reply');
    expect(res.body).toHaveProperty('confidence_score');
    expect(res.body.reply).toContain('Phase 0');
  });

  it('should return 400 if message is missing', async () => {
    const res = await request(app)
      .post('/api/v1/chat')
      .send({});

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Message is required');
  });
});
