import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { buildPrompt } from "@/lib/aiPromptBuilder";
import { sanitizeCode, validateGeneratedCode } from "@/lib/codeSanitizer";
import type { GenerationRequest, GenerationResponse } from "@/types/generation";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const body: GenerationRequest = await req.json();
        const { description, pageType, referenceUrl, previousCode } = body;

        if (!description?.trim()) {
            return NextResponse.json(
                { error: "Description is required" },
                { status: 400 }
            );
        }

        const prompt = buildPrompt({
            description,
            pageType,
            referenceUrl,
            previousCode,
        });

        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content:
                        "You're a frontend dev who builds clean React components with Next.js and Tailwind.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 3000,
        });

        const raw = completion.choices[0]?.message?.content;

        if (!raw) {
            return NextResponse.json({ error: "No code generated" }, { status: 500 });
        }

        let code = sanitizeCode(raw);

        // check if it looks valid, but don't fail if not
        const validation = validateGeneratedCode(code);
        if (!validation.valid) {
            console.warn("validation issue:", validation.error);
        }

        const response: GenerationResponse = { code };
        return NextResponse.json(response);
    } catch (error: any) {
        console.error("generation failed:", error);
        return NextResponse.json(
            { error: error.message || "something went wrong" },
            { status: 500 }
        );
    }
}

