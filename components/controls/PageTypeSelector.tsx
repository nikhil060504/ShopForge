"use client";

import { PageType } from "@/types/generation";

interface PageTypeSelectorProps {
    selected: PageType;
    onChange: (type: PageType) => void;
    disabled?: boolean;
}

const PAGE_TYPES = [
    {
        value: "landing" as PageType,
        label: "Landing Page",
        description: "Hero, features, pricing, testimonials",
    },
    {
        value: "product" as PageType,
        label: "Product Page",
        description: "Gallery, details, pricing, cart",
    },
];

export default function PageTypeSelector({
    selected,
    onChange,
    disabled = false,
}: PageTypeSelectorProps) {
    return (
        <div className="grid grid-cols-2 gap-4">
            {PAGE_TYPES.map((opt) => (
                <button
                    key={opt.value}
                    onClick={() => onChange(opt.value)}
                    disabled={disabled}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${selected === opt.value
                            ? "border-indigo-600 bg-indigo-50"
                            : "border-gray-200 hover:border-gray-300"
                        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                    <div className="font-semibold text-gray-900">{opt.label}</div>
                    <div className="text-sm text-gray-600 mt-1">{opt.description}</div>
                </button>
            ))}
        </div>
    );
}

