"use client";

import { useEffect, useState, useRef } from "react";
import { wrapCodeForPreview } from "@/lib/previewUtils";

interface PreviewFrameProps {
    code: string | null;
    error?: string;
}

type ViewportMode = "desktop" | "mobile";

export default function PreviewFrame({ code, error }: PreviewFrameProps) {
    const [previewHtml, setPreviewHtml] = useState<string>("");
    const [renderError, setRenderError] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const [viewportMode, setViewportMode] = useState<ViewportMode>("desktop");
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (code) {
            setIsLoading(true);
            try {
                console.log("Original code:", code);
                const html = wrapCodeForPreview(code);
                console.log("Wrapped HTML length:", html.length);
                setPreviewHtml(html);
                setRenderError(undefined);

                // give iframe time to load
                setTimeout(() => setIsLoading(false), 1000);
            } catch (err: any) {
                console.error("Preview wrap error:", err);
                setRenderError(err.message || "Failed to render preview");
                setIsLoading(false);
            }
        }
    }, [code]);

    // listen for errors from iframe
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data?.type === "iframe-error") {
                setRenderError(event.data.message);
                setIsLoading(false);
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    if (error || renderError) {
        return (
            <div className="h-full flex flex-col">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="text-sm font-medium text-gray-700">Preview</div>
                </div>
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                    <div className="text-center p-8 max-w-md">
                        <div className="text-red-600 text-lg font-semibold mb-2">
                            Preview Error
                        </div>
                        <div className="text-gray-600 text-sm">{error || renderError}</div>
                        <div className="text-xs text-gray-500 mt-2">
                            Try regenerating with simpler requirements
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!code) {
        return (
            <div className="h-full flex flex-col">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="text-sm font-medium text-gray-700">Preview</div>
                </div>
                <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                    <div className="text-center p-8">
                        <svg
                            className="w-16 h-16 mx-auto text-gray-400 mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                        </svg>
                        <div className="text-gray-600 font-medium">
                            Describe your shop to generate a preview
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Preview Header with Controls */}
            <div className="p-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                <div className="text-sm font-medium text-gray-700">Live Preview</div>
                <div className="flex gap-1.5">
                    <button
                        onClick={() => setViewportMode("desktop")}
                        className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${viewportMode === "desktop"
                            ? "bg-indigo-600 text-white"
                            : "bg-white text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        <svg
                            className="w-3.5 h-3.5 inline mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                        Desktop
                    </button>
                    <button
                        onClick={() => setViewportMode("mobile")}
                        className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${viewportMode === "mobile"
                            ? "bg-indigo-600 text-white"
                            : "bg-white text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        <svg
                            className="w-3.5 h-3.5 inline mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                        </svg>
                        Mobile
                    </button>
                </div>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-auto bg-gray-100 p-4 relative">
                {isLoading && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3"></div>
                            <div className="text-sm text-gray-600">Rendering preview...</div>
                        </div>
                    </div>
                )}
                <div
                    className={`mx-auto bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ${viewportMode === "mobile"
                        ? "max-w-[375px] h-[667px]"
                        : "w-full h-full"
                        }`}
                >
                    <iframe
                        ref={iframeRef}
                        srcDoc={previewHtml}
                        className="w-full h-full border-0"
                        sandbox="allow-scripts allow-same-origin"
                        title="Preview"
                    />
                </div>
            </div>
        </div>
    );
}
