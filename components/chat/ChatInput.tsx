"use client";

interface ChatInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    disabled?: boolean;
}

export default function ChatInput({
    value,
    onChange,
    onSubmit,
    disabled = false,
}: ChatInputProps) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (value.trim()) onSubmit();
        }
    };

    return (
        <div className="relative">
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your shop... (e.g., Modern sneaker store with dark theme)"
                className="w-full px-4 py-3 pr-12 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:outline-none resize-none transition-colors"
                rows={4}
                disabled={disabled}
            />
            <div className="absolute bottom-3 right-3 text-sm text-gray-400">
                Enter to generate
            </div>
        </div>
    );
}

