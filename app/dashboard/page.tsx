"use client";

import { useState } from "react";
import { PageType } from "@/types/generation";
import ChatInput from "@/components/chat/ChatInput";
import PageTypeSelector from "@/components/controls/PageTypeSelector";
import ReferenceInput from "@/components/controls/ReferenceInput";
import PreviewFrame from "@/components/preview/PreviewFrame";
import Button from "@/components/ui/Button";
import CodeExport from "@/components/ui/CodeExport";

export default function DashboardPage() {
    const [description, setDescription] = useState("");
    const [pageType, setPageType] = useState<PageType>("landing");
    const [referenceUrl, setReferenceUrl] = useState("");
    const [generatedCode, setGeneratedCode] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | undefined>();

    const handleGenerate = async () => {
        if (!description.trim()) return;

        setIsGenerating(true);
        setError(undefined);

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    description,
                    pageType,
                    referenceUrl: referenceUrl || undefined,
                    previousCode: generatedCode || undefined,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Generation failed");
            }

            setGeneratedCode(data.code);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                ShopForge
                            </h1>
                            <p className="text-sm text-gray-600">AI Website Builder</p>
                        </div>
                        {generatedCode && (
                            <CodeExport code={generatedCode} />
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-140px)]">
                    {/* Left Panel - Controls */}
                    <div className="flex flex-col gap-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold mb-4">Page Type</h2>
                            <PageTypeSelector
                                selected={pageType}
                                onChange={setPageType}
                                disabled={isGenerating}
                            />
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold mb-4">Describe Your Shop</h2>
                            <ChatInput
                                value={description}
                                onChange={setDescription}
                                onSubmit={handleGenerate}
                                disabled={isGenerating}
                            />
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <ReferenceInput
                                value={referenceUrl}
                                onChange={setReferenceUrl}
                                disabled={isGenerating}
                            />
                        </div>

                        <Button
                            onClick={handleGenerate}
                            loading={isGenerating}
                            disabled={!description.trim() || isGenerating}
                            className="w-full"
                        >
                            Generate Website
                        </Button>
                    </div>

                    {/* Right Panel - Preview */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <PreviewFrame code={generatedCode} error={error} />
                    </div>
                </div>
            </div>
        </div>
    );
}
