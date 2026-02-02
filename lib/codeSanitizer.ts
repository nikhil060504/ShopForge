export function sanitizeCode(raw: string): string {
    let code = raw.trim();

    // strip markdown fences
    code = code.replace(/^```(?:tsx?|jsx?|typescript|javascript)?\n?/i, "");
    code = code.replace(/\n?```$/m, "");
    code = code.trim();

    // remove any leading explanatory text before the code
    const exportMatch = code.match(/export\s+default\s+function/);
    if (exportMatch) {
        const startIndex = code.indexOf(exportMatch[0]);
        code = code.substring(startIndex);
    }

    // check if we have something that looks like a component
    if (!code.includes("export default") && !code.includes("function")) {
        throw new Error("doesn't look like valid component code");
    }

    return code;
}

export function validateGeneratedCode(code: string) {
    if (!code.includes("export default")) {
        return { valid: false, error: "missing default export" };
    }

    if (!code.includes("className")) {
        return { valid: false, error: "no tailwind classes found" };
    }

    if (code.includes("style={{")) {
        return { valid: false, error: "has inline styles, should use tailwind" };
    }

    return { valid: true };
}
