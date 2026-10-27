import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ArrowUpRight, NetworkIcon, PackageIcon, PulseIcon, ShieldIcon } from "./Icons";
import { Reveal, SectionHead, StatusDot } from "./ui";

const CAPABILITIES: {
    index: string;
    title: string;
    body: string;
    href: string;
    icon: ReactNode;
    visual: ReactNode;
    meta: string;
}[] = [
    {
        index: "01",
        title: "Tiny model packaging",
        body: "Compress, quantize, and ship neural networks that fit on constrained sensor memory.",
        href: "#packaging",
        icon: <PackageIcon className="h-5 w-5" />,
        meta: "FP32 → INT8",
        visual: (
            <div className="space-y-2">
                {[
                    { label: "FP32", width: "100%", value: "11.6 MB" },
                    { label: "FP16", width: "52%", value: "5.8 MB" },
                    { label: "INT8", width: "26%", value: "2.9 MB" },
                ].map((row, index) => (
                    <div key={row.label} className="flex items-center gap-2.5">
                        <span className="w-8 font-mono text-[8.5px] tracking-[0.1em] text-haze/60">{row.label}</span>
                        <div className="h-[5px] flex-1 bg-white/6">
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
                                style={{ width: row.width }}
                                className="h-full origin-left bg-mint/70"
                            />
                        </div>
                        <span className="w-14 text-right font-mono text-[8.5px] tabular-nums text-white/55">
                            {row.value}
                        </span>
                    </div>
                ))}
            </div>
        ),
    },
    {
        index: "02",
        title: "Local signal decisions",
        body: "Classify vibration, audio, image, and environmental signals in milliseconds on device.",
        href: "#signals",
        icon: <PulseIcon className="h-5 w-5" />,
        meta: "34 ms p50",
        visual: (
            <svg viewBox="0 0 260 48" className="h-12 w-full" preserveAspectRatio="none">
                <rect x="150" y="0" width="42" height="48" fill="#8df8d2" opacity="0.09" />
                <line x1="0" y1="24" x2="260" y2="24" stroke="#ffffff" strokeOpacity="0.08" />
                <polyline
                    points="0,25 12,22 22,28 32,20 42,26 52,24 62,30 72,18 82,25 92,23 102,27 112,21 122,26 132,23 142,29 152,12 160,34 168,9 176,30 184,15 194,25 204,21 214,27 224,23 234,26 244,22 254,25"
                    fill="none"
                    stroke="#8df8d2"
                    strokeWidth="1.3"
                />
                <circle cx="176" cy="9" r="2.2" fill="#8df8d2" />
            </svg>
        ),
    },
    {
        index: "03",
        title: "Event-first networking",
        body: "Forward only verified events, anomaly windows, and metadata instead of continuous raw streams.",
        href: "#networking",
        icon: <NetworkIcon className="h-5 w-5" />,
        meta: "98% less egress",
        visual: (
            <div className="flex items-center gap-3">
                <div className="grid grid-cols-4 gap-1">
                    {Array.from({ length: 16 }).map((_, index) => {
                        const isEvent = index === 5 || index === 14;
                        return (
                            <span
                                key={index}
                                className={`h-1.5 w-1.5 rounded-[1px] ${
                                    isEvent ? "bg-mint" : "bg-white/12"
                                }`}
                            />
                        );
                    })}
                </div>
                <svg viewBox="0 0 46 12" className="h-3 w-12 text-mint/60">
                    <path d="M0 6h38" stroke="currentColor" strokeDasharray="2 3" />
                    <path d="M36 2.5 39.5 6 36 9.5" fill="none" stroke="currentColor" />
                </svg>
                <div className="flex items-center gap-1.5 border border-mint/25 bg-mint/6 px-2 py-1">
                    <StatusDot />
                    <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-mint">events</span>
                </div>
            </div>
        ),
    },
    {
        index: "04",
        title: "Fleet-safe updates",
        body: "Roll out new models with signed bundles, staged releases, and rollback controls.",
        href: "#fleet",
        icon: <ShieldIcon className="h-5 w-5" />,
        meta: "4 rings · 1-click rollback",
        visual: (
            <div className="flex items-end gap-1.5">
                {["Canary", "Early", "Broad", "Fleet"].map((ring, index) => (
                    <div key={ring} className="flex-1">
                        <div className="h-1.5 w-full bg-white/6">
                            <div
                                className="h-full bg-mint"
                                style={{ width: `${[100, 100, 62, 0][index]}%`, opacity: [1, 0.85, 0.7, 0.25][index] }}
                            />
                        </div>
                        <p className="mt-1.5 truncate font-mono text-[8px] uppercase tracking-[0.1em] text-haze/55">
                            {ring}
                        </p>
                    </div>
                ))}
            </div>
        ),
    },
];

const PIPELINE = [
    { step: "Sense", detail: "accel · audio · image · climate at native rate" },
    { step: "Infer", detail: "quantized model in a fixed memory arena" },
    { step: "Filter", detail: "thresholds, cooldowns, hysteresis per class" },
    { step: "Forward", detail: "signed events, buffered when the link drops" },
];

export default function Runtime() {
    return (
        <section id="runtime" className="relative border-t border-white/8 bg-ink-2/60 py-24 lg:py-32">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_15%_0%,rgba(141,248,210,0.06),transparent_65%)]" />
            <div className="shell relative">
                <SectionHead
                    index="01"
                    eyebrow="The runtime"
                    title={
                        <>
                            One runtime,
                            <br />
                            four jobs.
                        </>
                    }
                    body={
                        <>
                            <p>
                                EdgeMind turns trained models into sensor-ready workloads. Packaging, stream processing,
                                event thresholds, and fleet updates are handled by the runtime, so teams keep their
                                existing device stack.
                            </p>
                        </>
                    }
                />

                <div className="mt-14 grid gap-4 sm:grid-cols-2">
                    {CAPABILITIES.map((capability, index) => (
                        <Reveal key={capability.title} delay={index * 0.06}>
                            <motion.a
                                href={capability.href}
                                whileHover={{ y: -3 }}
                                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                className="group flex h-full flex-col justify-between gap-8 rounded-xl border border-white/9 bg-panel/70 p-6 transition-colors hover:border-mint/35 hover:bg-panel"
                            >
                                <div>
                                    <div className="flex items-start justify-between">
                                        <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/12 bg-white/3 text-mint">
                                            {capability.icon}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-haze/50">
                                                {capability.index}
                                            </span>
                                            <ArrowUpRight className="h-4 w-4 text-haze/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mint" />
                                        </div>
                                    </div>
                                    <h3 className="mt-5 text-[19px] font-medium tracking-[-0.025em] text-white">
                                        {capability.title}
                                    </h3>
                                    <p className="mt-2 max-w-[34ch] text-[13.5px] leading-6 text-haze">
                                        {capability.body}
                                    </p>
                                </div>
                                <div>
                                    <div className="mb-3 flex items-center justify-between">
                                        <span className="field-label text-[8.5px]">{capability.meta}</span>
                                        <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-mint/0 transition-colors group-hover:text-mint/70">
                                            open
                                        </span>
                                    </div>
                                    {capability.visual}
                                </div>
                            </motion.a>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={0.1} className="mt-16">
                    <div className="overflow-hidden rounded-xl border border-white/9 bg-ink/60">
                        <div className="flex items-center justify-between border-b border-white/8 px-5 py-3">
                            <span className="field-label">stream path</span>
                            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-haze/50">
                                fixed budget · 42 MB RAM
                            </span>
                        </div>
                        <div className="grid divide-y divide-white/8 md:grid-cols-4 md:divide-x md:divide-y-0">
                            {PIPELINE.map((item, index) => (
                                <div key={item.step} className="group relative px-5 py-6 transition-colors hover:bg-white/2">
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-5 w-5 items-center justify-center border border-mint/30 font-mono text-[8.5px] text-mint">
                                            {index + 1}
                                        </span>
                                        <span className="text-[15px] font-medium tracking-[-0.02em] text-white">
                                            {item.step}
                                        </span>
                                        {index < PIPELINE.length - 1 ? (
                                            <span className="ml-auto hidden font-mono text-[10px] text-haze/30 md:block">
                                                →
                                            </span>
                                        ) : null}
                                    </div>
                                    <p className="mt-3 text-[12.5px] leading-5 text-haze/80">{item.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
