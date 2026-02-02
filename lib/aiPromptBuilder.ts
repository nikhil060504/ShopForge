import { PageType } from "@/types/generation";

interface PromptBuilderOptions {
    description: string;
    pageType: PageType;
    referenceUrl?: string;
    previousCode?: string;
}

const REQUIRED_SECTIONS = {
    landing: [
        "navbar",
        "hero section",
        "features section",
        "pricing section",
        "testimonials",
        "CTA",
        "footer",
    ],
    product: [
        "navbar",
        "product gallery",
        "title/description",
        "price",
        "add to cart button",
        "product details",
        "footer",
    ],
};

export function buildPrompt(opts: PromptBuilderOptions): string {
    const { description, pageType, referenceUrl, previousCode } = opts;

    // if refining existing code
    if (previousCode) {
        return `Refine this ${pageType} page:

CURRENT CODE:
${previousCode}

CHANGES REQUESTED:
${description}

Return the updated component in the same format.`;
    }

    // otherwise generate from scratch
    const sections = REQUIRED_SECTIONS[pageType];
    let prompt = `Generate a ${pageType} page for this shop:

${description}

Must include these sections:
${sections.map((s, i) => `${i + 1}. ${s}`).join("\n")}
`;

    if (referenceUrl) {
        prompt += `\nDesign inspiration: ${referenceUrl}\n`;
    }

    prompt += `
Requirements:
- React hooks (useState, useEffect, useRef) if needed
- Tailwind CSS only
- Mobile responsive
- Modern design with gradients/shadows
- Realistic content

CRITICAL - OUTPUT FORMAT:
Return ONLY a single valid React component.
NO markdown, NO explanations, NO imports, NO "use client"

Exact format:

export default function GeneratedPage() {
  return (
    <div className="min-h-screen">
      ...
    </div>
  );
}
`;

    return prompt;
}



