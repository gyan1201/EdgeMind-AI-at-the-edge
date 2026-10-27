export function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

/** Deterministic pseudo-random in [0, 1) — keeps server/client and re-renders stable. */
export function noise(seed: number) {
    const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
    return x - Math.floor(x);
}

export function formatCount(value: number) {
    return value.toLocaleString("en-US");
}

export function clockStamp(date = new Date()) {
    return date.toLocaleTimeString("en-GB", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }) + "." + String(date.getMilliseconds()).padStart(3, "0");
}
