# FODMAP AI — Smart Dietary Companion

A Next.js application powered by Anthropic's Claude API to help people following a low-FODMAP diet manage their nutrition with confidence and ease.

---

## Context

The low-FODMAP diet is a clinically recognized approach for managing symptoms of Irritable Bowel Syndrome (IBS). It involves identifying and limiting fermentable carbohydrates found in many everyday foods. While effective, the diet is notoriously difficult to follow without expert guidance — food tolerances vary by individual, safe portions matter as much as food choice, and ingredient lists can be hard to interpret.

This application bridges that gap by combining a curated FODMAP knowledge base with the reasoning capabilities of a large language model, making expert-level dietary guidance accessible to anyone.

---

## What the App Does

**Food Analyzer**
Enter any food or ingredient and get an instant FODMAP assessment: risk level (low / medium / high), breakdown of FODMAP types present (fructose, lactose, fructans, GOS, polyols), safe portion size, and practical substitution tips.

**Meal Planner**
Generate personalized weekly meal plans tailored to the user's restrictions, preferences, and nutritional goals. Meal plans are streamed progressively for a smooth user experience.

**AI Dietitian Chat**
A conversational assistant that answers FODMAP-related questions, suggests ingredient swaps, analyzes food labels, and provides guidance adapted to the user's personal context — powered by Claude with a structured FODMAP system prompt.

---

## Tech Stack

### Framework
- **Next.js 14** (App Router) — server components, API routes, and streaming support out of the box
- **TypeScript** — strict typing across the entire codebase, including AI response validation
- **Tailwind CSS** — utility-first styling

### AI Integration
- **Anthropic Claude API** (`claude-sonnet-4`) — core intelligence layer for food analysis, meal planning, and conversational guidance
- **Streaming responses** — meal plans and chat responses are streamed using the Anthropic SDK's `.stream()` method and Server-Sent Events (SSE)
- **Structured prompting** — all Claude interactions use carefully crafted system prompts with JSON output constraints, validated server-side using Zod
- **Local FODMAP data layer** — a curated dataset of common foods is used to short-circuit API calls for well-known cases, reducing latency and cost

### Validation & Safety
- **Zod** — runtime validation of every Claude response to ensure type safety before data reaches the client

---

## Project Structure
fodmap-ai/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts       # Food analysis endpoint
│   │   └── meal-plan/route.ts     # Meal plan generation with streaming
│   ├── scanner/page.tsx           # Food analyzer UI
│   ├── meal-plan/page.tsx         # Meal planner UI
│   └── chat/page.tsx              # AI dietitian chat
├── components/                    # Shared UI components
├── lib/
│   ├── anthropic.ts               # Centralized Anthropic client
│   └── fodmap-data.ts             # Local FODMAP reference data
└── types/
└── fodmap.ts                  # Shared TypeScript types

---

## Getting Started

```bash
# Install dependencies
npm install

# Add your Anthropic API key
cp .env.example .env.local
# Then edit .env.local and set ANTHROPIC_API_KEY=sk-ant-...

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

---

## Environment Variables

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Your Anthropic API key — never commit this to version control |

---

## Disclaimer

This application is intended as a dietary support tool and does not replace professional medical or nutritional advice. Always consult a qualified healthcare provider before making significant dietary changes.