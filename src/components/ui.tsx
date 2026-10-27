import { motion, useReducedMotion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";

export const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function Reveal({
    children,
    className,
    delay = 0,
    y = 22,
}: {
    children: ReactNode;
    className?: string;
    delay?: number;
    y?: number;
}) {
    const reduce = useReducedMotion();

    return (
        <motion.div
            initial={reduce ? false : { opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, delay, ease: EASE }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <p className={cn("flex items-center gap-2.5 text-mint/85 mono-label", className)}>
            <span aria-hidden className="h-[5px] w-[5px] rotate-45 bg-mint/80" />
            {children}
        </p>
    );
}

export function SectionHead({
    index,
    eyebrow,
    title,
    body,
    className,
    aside,
}: {
    index: string;
    eyebrow: string;
    title: ReactNode;
    body?: ReactNode;
    className?: string;
    aside?: ReactNode;
}) {
    return (
        <div className={cn("grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16", className)}>
            <div>
                <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-haze/55">{index}</span>
                    <span className="h-px w-8 bg-white/15" />
                    <Eyebrow>{eyebrow}</Eyebrow>
                </div>
                <h2 className="mt-6 max-w-2xl text-balance text-[clamp(2.1rem,4.4vw,3.55rem)] font-medium leading-[1.02] tracking-[-0.045em] text-white">
                    {title}
                </h2>
            </div>
            {(body || aside) && (
                <div className="max-w-lg text-pretty text-[15px] leading-7 text-haze lg:pb-2">
                    {body}
                    {aside}
                </div>
            )}
        </div>
    );
}

export function StatusDot({ tone = "mint", className }: { tone?: "mint" | "amber" | "rose" | "ice"; className?: string }) {
    const tones = {
        mint: "bg-mint shadow-[0_0_12px_rgba(141,248,210,0.7)]",
        amber: "bg-amber shadow-[0_0_12px_rgba(255,201,138,0.6)]",
        rose: "bg-rose shadow-[0_0_12px_rgba(255,145,145,0.6)]",
        ice: "bg-ice shadow-[0_0_12px_rgba(111,227,255,0.6)]",
    };
    return <span aria-hidden className={cn("inline-block h-1.5 w-1.5 rounded-full", tones[tone], className)} />;
}

export function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
    const [copied, setCopied] = useState(false);

    async function copy() {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
        } catch {
            setCopied(false);
        }
    }

    return (
        <button
            type="button"
            onClick={copy}
            className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-haze/80 transition-colors hover:text-mint"
            aria-label={`${label} to clipboard`}
        >
            {copied ? "Copied" : label}
        </button>
    );
}
