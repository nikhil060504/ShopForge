# ShopForge

AI-powered website builder for shops. Describe your shop in natural language and get a complete, production-ready website using Next.js + Tailwind.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` with your OpenAI API key:
```
OPENAI_API_KEY=your_key_here
```

3. Run dev server:
```bash
npm run dev
```

4. Open http://localhost:3000

## Features

- **Two page types**: Landing pages with hero/features/pricing/testimonials, or Product pages with gallery/details/cart
- **AI generation**: Powered by GPT-4 for realistic, modern designs
- **Live preview**: See changes instantly in iframe
- **Iteration**: Refine output by describing changes
- **Export**: Copy or download generated code

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- OpenAI API
