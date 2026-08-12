# Beacon

An AI support widget that answers from a company's own knowledge base instead of a generic chatbot script — and tells you honestly when it doesn't know, instead of guessing.

Built as a full-stack portfolio project, structured as five independently-shippable phases rather than one big bang release.

## Why

Most "AI support bot" side projects stop at a LangChain demo answering from three PDFs. Beacon is built around two decisions that a demo usually skips:

- **Confidence is visible, not hidden.** Every answer will carry a citation back to its source, and when the model isn't confident, the UI is meant to say so and hand off to a human — visibly, not as a silent fallback.
- **The admin's real job is finding content gaps.** Instead of a generic analytics page, the admin view is designed around one question: *what are people asking that the knowledge base can't answer yet?*

## Status

This repo follows the phased plan in [`PHASES.md`](./PHASES.md). Current state:

- [x] **Phase 0 — Skeleton:** Next.js chat UI, Express REST API, Postgres via Prisma, basic accounts, Docker Compose. Deployable and demoable on its own.
- [ ] **Phase 1 — Real RAG:** document upload, embeddings, cited answers via LangChain
- [ ] **Phase 2 — Agentic:** LangGraph agent, tool calling, memory, confidence-based escalation
- [ ] **Phase 3 — Infra:** async ingestion queue, observability, containers
- [ ] **Phase 4 — Security & polish:** audited fixes, multi-agent side-flow

See [`PRODUCT.md`](./PRODUCT.md), [`ARCHITECTURE.md`](./ARCHITECTURE.md), and [`DESIGN.md`](./DESIGN.md) for the full spec each phase is being built against.

## Planned stack

| Layer | Tech |
|---|---|
| Frontend | Next.js, TypeScript, Tailwind CSS |
| API | Node.js, Express, WebSocket |
| AI service | Python, LangChain, LangGraph |
| Data | PostgreSQL (Prisma), Redis, pgvector |
| Infra | RabbitMQ, S3, Docker, Prometheus/Grafana |

## Running it locally

```bash
docker compose up -d          # Postgres

cd apps/api
npm install
npm run db:generate && npm run db:push
npm run dev                   # http://localhost:3001

cd ../web
npm install
npm run dev                   # http://localhost:3000
```

## Structure

```
apps/
  web/    Next.js frontend
  api/    Express API + Prisma
```