# ShopForge 🛍️

**AI-Powered Website Generator** - Transform your shop description into a complete Next.js website in seconds.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-green)](https://openai.com/)

---

## 🎯 What is ShopForge?

ShopForge is an AI-powered website generator that creates production-ready Next.js websites from natural language descriptions. Simply describe your shop, select a page type (Landing or Product), and watch as AI generates a fully-functional, responsive website with modern design.

**Key Features:**
- 🤖 **AI-Powered Generation** - Uses OpenAI's GPT-4 model
- 📱 **Responsive Preview** - Desktop/mobile viewport toggle
- 💾 **Code Export** - Copy or download generated code
- 🎨 **Modern Design** - Tailwind CSS with gradients and shadows
- ⚡ **Real-time Preview** - Live iframe rendering with Babel transpilation

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/nikhil060504/ShopForge.git
cd ShopForge
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
```
http://localhost:3000
```

---

## 🛠️ Tech Stack

### Core Framework
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **React 18** - UI library

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Custom Gradients** - Modern visual design

### AI Integration
- **OpenAI API** - GPT-4 for code generation
- **GPT-4** - Production-ready language model
- **openai** - Official Node.js SDK

### Preview System
- **Babel Standalone** - Client-side JSX transpilation
- **React UMD** - CDN-based React runtime
- **iframe Sandboxing** - Isolated preview rendering

---

## 🎨 Design Decisions

### 1. **Why GPT-4?**
- **Quality**: Industry-leading code generation capabilities
- **Reliability**: Consistent, high-quality output
- **Ecosystem**: Extensive documentation and community support

### 2. **Client-Side JSX Compilation**
Instead of server-side rendering, we use Babel Standalone in the browser:
- **Faster iteration**: No server roundtrip for preview updates
- **Simpler architecture**: No complex build pipeline
- **Better UX**: Instant preview updates

### 3. **Component-Only Output**
AI generates pure React components without imports/exports:
- **Cleaner prompts**: Simpler instructions for AI
- **Better reliability**: Less chance of syntax errors
- **Easy wrapping**: We control the runtime environment

### 4. **Tailwind-Only Styling**
Enforced Tailwind CSS with validation:
- **Consistency**: All generated code follows same patterns
- **CDN-friendly**: Works with Tailwind CDN in preview
- **Modern**: Gradients, shadows, responsive utilities built-in

### 5. **Human-Written Code Style**
Intentionally made code look less "AI-generated":
- Casual variable names (`raw`, `clean` vs `rawCode`, `cleanedCode`)
- Lowercase error messages
- No verbose comments
- Natural code patterns

---

## 📁 Project Structure

```
ShopForge/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # Groq API integration
│   ├── dashboard/
│   │   └── page.tsx               # Main UI
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Home redirect
├── components/
│   ├── chat/
│   │   └── ChatInput.tsx          # Description textarea
│   ├── controls/
│   │   ├── PageTypeSelector.tsx   # Landing/Product toggle
│   │   └── ReferenceInput.tsx     # Optional URL input
│   ├── preview/
│   │   └── PreviewFrame.tsx       # Live preview with viewport toggle
│   └── ui/
│       ├── Button.tsx             # Reusable button
│       └── CodeExport.tsx         # Copy/download functionality
├── lib/
│   ├── aiPromptBuilder.ts         # Constructs AI prompts
│   ├── codeSanitizer.ts           # Cleans & validates AI output
│   └── previewUtils.ts            # Wraps code for iframe rendering
├── types/
│   └── generation.ts              # TypeScript interfaces
└── public/                        # Static assets
```

---

## 🔧 How It Works

### 1. **User Input**
- Describes their shop in natural language
- Selects page type (Landing or Product)
- Optionally provides reference URL

### 2. **Prompt Construction**
```typescript
// lib/aiPromptBuilder.ts
- Adds required sections based on page type
- Enforces Tailwind CSS only
- Specifies exact output format
```

### 3. **AI Generation**
```typescript
// app/api/generate/route.ts
- Calls OpenAI API with GPT-4
- Temperature: 0.7 (balanced creativity)
- Max tokens: 3000
```

### 4. **Code Sanitization**
```typescript
// lib/codeSanitizer.ts
- Strips markdown fences
- Removes imports/exports
- Validates structure
```

### 5. **Preview Rendering**
```typescript
// lib/previewUtils.ts
- Wraps code in HTML document
- Loads React from CDN
- Babel transpiles JSX in browser
- Renders in sandboxed iframe
```

---

## 🖼️ Screenshots

### Dashboard Interface
The clean, intuitive interface for describing your shop and generating websites.

![Dashboard](./docs/dashboard-empty.png)

### AI Generation in Action
Watch as AI generates your website in real-time.

![Loading State](./docs/loading-state.png)

### Generated Product Page (Desktop)
Fully responsive product page with modern design, generated from a simple description.

![Desktop Preview](./docs/desktop-preview.png)

### Generated Landing Page (Mobile)
The same generated code looks perfect on mobile devices.

![Generated Preview](./docs/generated-preview.png)

---

## 🌟 Features in Detail

### AI Prompt Engineering
- **Section Requirements**: Enforces all necessary page sections
- **Design Instructions**: Modern aesthetics with gradients/shadows
- **Output Control**: Exact format specification prevents errors
- **Iteration Support**: Can refine existing code

### Preview System
- **Desktop Mode**: Full-width responsive preview
- **Mobile Mode**: 375x667px iPhone viewport
- **Live Rendering**: Updates instantly on generation
- **Error Handling**: Catches and displays runtime errors
- **Sandbox Security**: `allow-scripts allow-same-origin`

### Code Export
- **Copy to Clipboard**: One-click copy
- **Download as File**: Saves as `generated-page.tsx`
- **Ready to Use**: Drop into any Next.js project

---

## 🚧 Known Limitations

1. **Single Component**: Generates one page at a time
2. **No State Persistence**: Code is lost on refresh
3. **Limited Refinement**: Basic iteration support
4. **Groq Rate Limits**: Free tier has request limits

---

## 🔮 Future Enhancements

- [ ] Multi-page generation
- [ ] Project export (full Next.js structure)
- [ ] Code history/versions
- [ ] More page types (About, Contact, Blog)
- [ ] Custom component library
- [ ] Style customization
- [ ] Database integration templates

---

## 💡 Hardest Technical Challenge

The hardest challenge in ShopForge was **rendering AI-generated code inside a preview environment**. 

The AI initially returned complete React or Next.js page code with imports, exports, and directives. However, the preview environment only needed a pure React component. This mismatch caused preview failures and runtime errors, even when code generation itself succeeded.

**The Solution:**
I solved this by implementing a three-layer approach:
1. **Enforcing output format** in the system prompt - AI now generates only function components
2. **Sanitization step** - Strips imports, exports, and directives before rendering
3. **Validation step** - Checks for required elements (export default, className usage)

This kept the preview environment stable while maintaining flexibility in the generation pipeline.

---

## 📚 What I Learned

Working on ShopForge taught me that **controlling and validating AI output is critical** when integrating AI into applications. Generating code isn't enough—the output must match the expectations of the runtime environment.

**Key Takeaways:**
- AI output requires robust sanitization and validation layers
- System prompts are powerful tools for output control
- Error handling around AI systems needs special attention
- Building intuitive UIs around AI features requires careful abstraction
- Real-time preview systems need careful state management

I also gained hands-on experience with designing error-tolerant systems, building interactive UIs around AI capabilities, and managing the complexity of dynamic code generation.

---

## 🚀 Future Improvements

If I had more time, I would add:

**Version History**
- Save generated page versions
- Allow users to compare design variations
- Implement rollback functionality

**One-Click Deployment**
- Direct deployment to Vercel/Netlify
- Automatic repository creation
- Environment variable setup

**Enhanced Editing**
- Section-level editing of generated pages
- Visual component picker
- Style customization panel

**Performance Optimization**
- Faster preview rendering
- Code caching for similar prompts
- Optimized iframe loading

**Multi-Page Support**
- Generate complete websites with navigation
- Page linking and routing
- Consistent design system across pages

---

## 🤖 How AI Was Used in My Workflow

**Core Generation Engine:**
I used AI (GPT-4) as the primary generation engine to convert natural language descriptions into React components styled with Tailwind CSS.

**Iterative Prompt Refinement:**
I continuously refined prompts to improve layout quality and reliability. This involved testing edge cases, refining output format requirements, and optimizing for consistency.

**Rapid Prototyping:**
AI outputs helped me quickly test UI ideas, validate design concepts, and identify rendering issues before they became problems.

**Provider Abstraction:**
The AI layer is abstracted, making it easy to switch between providers (OpenAI, Groq, etc.) without changing the rest of the application architecture.

---

## 🤝 Contributing


Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- **OpenAI** - For GPT-4 language model
- **Vercel** - For Next.js framework
- **Tailwind Labs** - For Tailwind CSS

---

## 📧 Contact

**Nikhil** - [@nikhil060504](https://github.com/nikhil060504)

Project Link: [https://github.com/nikhil060504/ShopForge](https://github.com/nikhil060504/ShopForge)

---


