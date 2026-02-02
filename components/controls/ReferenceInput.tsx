"use client";

interface ReferenceInputProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export default function ReferenceInput({
    value,
    onChange,
    disabled = false,
}: ReferenceInputProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Reference Website (Optional)
            </label>
            <input
                type="url"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors"
                disabled={disabled}
            />
            <p className="text-sm text-gray-500 mt-1">
                Used for design inspiration only
            </p>
        </div>
    );
}
