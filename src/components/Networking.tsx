import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { EVENT_ENVELOPE } from "@/lib/data";
import { noise } from "@/lib/sim";
import { cn } from "@/utils/cn";
import { CopyButton, Reveal, SectionHead, StatusDot } from "./ui";

type Mode = "raw" | "edge";

const COPY = {
    raw: {
        label: "Raw relay",
        headline: "82.9 TB",
        caption: "every sample, every node, 30 days",
        delta: "baseline egress",
        cost: "$7,465",
        forwarded: "every window",
        payload: "2.0 kB window",
        p95: "continuous",
        tone: "text-white",
    },
    edge: {
        label: "EdgeMind events",
        headline: "1.34 TB",
        caption: "events, clips, and health over 30 days",
        delta: "98.4% less egress",
        cost: "$121",
        forwarded: "1.72 M / day",
        payload: "26 kB w/ clip",
        p95: "1.9 s to broker",
        tone: "text-mint",
    },
} as const;

const BARS = Array.from({ length: 60 }, (_, index) => {
    const isEvent = index === 8 || index === 21 || index === 34 || index === 47 || index === 55;
    return {
        raw: 74 + noise(index) * 26,
        edge: isEvent ? 30 + noise(index + 4) * 34 : 2.4 + noise(index + 9) * 3,
        isEvent,
    };
});

function JsonLine({ line }: { line: string }) {
    return (
        <>
            {line.split(/("(?:[^"\\]|\\.)*")/g).map((part, index) =>
                part.startsWith('"') ? (
                    <span key={index} className="text-mint/80">
                        {part}
                    </span>
                ) : (
                    <span key={index} className="text-white/55">
                        {part}
                    </span>
                )
            )}
        </>
    );
}

export default function Networking() {
    const [mode, setMode] = useState<Mode>("edge");
    const copy = COPY[mode];
    const lines = useMemo(() => EVENT_ENVELOPE.split("\n"), []);

    return (
        <section id="networking" className="relative border-t border-white/8 bg-ink py-24 lg:py-32">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_50%_at_88%_45%,rgba(111,227,255,0.055),transparent_70%)]" />
            <div className="shell relative">
                <SectionHead
                    index="04"
                    eyebrow="Event-first networking"
                    title={
                        <>
                            Ship conclusions,
                            <br />
                            not the firehose.
                        </>
                    }
                    body={
                        <p>
                            Forward only verified events, anomaly windows, and metadata instead of continuous raw
                            streams. EdgeMind deduplicates windows, signs every payload, and buffers on the node when
                            the link drops.
                        </p>
                    }
                />

                <div className="mt-14 grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
                    <Reveal className="panel overflow-hidden">
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-5 py-3.5">
                            <div className="flex items-center gap-2.5">
                                <StatusDot tone={mode === "edge" ? "mint" : "ice"} />
                                <span className="field-label">egress · 1,000 nodes</span>
                            </div>
                            <div className="grid grid-cols-2 border border-white/12 p-0.5">
                                {(["raw", "edge"] as Mode[]).map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => setMode(item)}
                                        aria-pressed={mode === item}
                                        className={cn(
                                            "px-3 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.1em] transition-colors",
                                            mode === item
                                                ? "bg-mint text-ink"
                                                : "text-haze hover:text-white"
                                        )}
                                    >
                                        {COPY[item].label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="flex flex-wrap items-end justify-between gap-4">
                                <div>
                                    <motion.p
                                        key={copy.headline}
                                        initial={{ opacity: 0.4, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={cn(
                                            "font-mono text-[40px] font-medium leading-none tabular-nums tracking-[-0.05em]",
                                            copy.tone
                                        )}
                                    >
                                        {copy.headline}
                                    </motion.p>
                                    <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-haze/55">
                                        {copy.caption}
                                    </p>
                                </div>
                                <span
                                    className={cn(
                                        "border px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em]",
                                        mode === "edge"
                                            ? "border-mint/30 bg-mint/7 text-mint"
                                            : "border-white/12 bg-white/3 text-haze"
                                    )}
                                >
                                    {copy.delta}
                                </span>
                            </div>

                            <div className="mt-7">
                                <div className="flex h-[152px] items-end gap-[2px]">
                                    {BARS.map((bar, index) => (
                                        <div key={index} className="group relative h-full flex-1">
                                            <motion.div
                                                animate={{ height: `${mode === "raw" ? bar.raw : bar.edge}%` }}
                                                transition={{ duration: 0.55, delay: index * 0.006, ease: [0.16, 1, 0.3, 1] }}
                                                className={cn(
                                                    "absolute bottom-0 w-full",
                                                    mode === "raw"
                                                        ? "bg-white/22"
                                                        : bar.isEvent
                                                          ? "bg-mint"
                                                          : "bg-white/14"
                                                )}
                                            />
                                            {mode === "edge" && bar.isEvent ? (
                                                <span className="absolute -top-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-mint shadow-[0_0_8px_rgba(141,248,210,0.9)]" />
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-2 flex justify-between border-t border-white/8 pt-2 font-mono text-[8.5px] uppercase tracking-[0.12em] text-haze/50">
                                    <span>0 min</span>
                                    <span>30 min</span>
                                    <span>60 min</span>
                                </div>
                                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                                    <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.1em] text-haze/60">
                                        <span className="h-1.5 w-3 bg-white/20" />
                                        audio frames
                                    </span>
                                    <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.1em] text-haze/60">
                                        <span className="h-1.5 w-3 bg-mint" />
                                        signed event + 0.5 s clip
                                    </span>
                                    <span className="ml-auto font-mono text-[9px] tabular-nums text-haze/40">
                                        one node · 16 kHz · 16-bit
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-white/8 pt-5 sm:grid-cols-4">
                                {[
                                    { label: "cellular / mo", value: copy.cost },
                                    { label: "forwarded", value: copy.forwarded },
                                    { label: "avg payload", value: copy.payload },
                                    { label: "delivery", value: copy.p95 },
                                ].map((item) => (
                                    <div key={item.label}>
                                        <p className="field-label text-[8.5px]">{item.label}</p>
                                        <motion.p
                                            key={item.value}
                                            initial={{ opacity: 0.4 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-1.5 font-mono text-[13px] tabular-nums text-white"
                                        >
                                            {item.value}
                                        </motion.p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={0.08} className="panel flex flex-col overflow-hidden">
                        <div className="flex items-center justify-between border-b border-white/8 px-5 py-3.5">
                            <span className="field-label">event envelope</span>
                            <CopyButton value={EVENT_ENVELOPE} label="Copy JSON" />
                        </div>

                        <pre className="overflow-x-auto border-b border-white/8 bg-[#040d0c] px-4 py-4 font-mono text-[10px] leading-[1.85]">
                            <code>
                                {lines.map((line, index) => (
                                    <div key={index} className="whitespace-pre">
                                        <JsonLine line={line} />
                                    </div>
                                ))}
                            </code>
                        </pre>

                        <div className="flex-1 p-5">
                            <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
                                {[
                                    ["transports", "MQTT 5 · gRPC · HTTPS"],
                                    ["delivery", "at-least-once + dedupe"],
                                    ["offline buffer", "72 h on flash"],
                                    ["signing", "ed25519 per bundle"],
                                ].map(([label, value]) => (
                                    <div key={label}>
                                        <p className="field-label text-[8px]">{label}</p>
                                        <p className="mt-1 font-mono text-[10.5px] text-white/80">{value}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 flex items-start gap-2.5 border border-white/8 bg-white/2 p-3">
                                <StatusDot tone="amber" className="mt-1" />
                                <p className="font-mono text-[9.5px] leading-5 text-haze/65">
                                    Backpressure is local. When the broker is unreachable, events queue on the node and
                                    the gate keeps running; raw streams are never replayed.
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
