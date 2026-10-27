import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import sensorImage from "@/assets/images/sensor-node.jpg";
import { ArrowDown, ArrowUpRight, LockIcon } from "./Icons";
import { EASE, StatusDot } from "./ui";
import Ticker from "./Ticker";

const METRICS = [
    { label: "Median bundle", value: "0.9", unit: "MB" },
    { label: "p50 decision", value: "34", unit: "ms" },
    { label: "Filtered on device", value: "96", unit: "%" },
    { label: "Rollout rings", value: "4", unit: "stages" },
];

export default function Hero() {
    const reduce = useReducedMotion();

    const wave = useMemo(() => {
        return Array.from({ length: 96 }, (_, i) => {
            const x = (i / 95) * 320;
            const drift = Math.sin(i * 0.42) * 9 + Math.sin(i * 1.31 + 0.8) * 4.2 + Math.sin(i * 2.9) * 1.8;
            const burst = i > 64 && i < 82 ? Math.sin(i * 2.2) * 11 : 0;
            const y = 42 + drift + burst;
            return `${x.toFixed(1)},${y.toFixed(1)}`;
        }).join(" ");
    }, []);

    return (
        <section id="top" className="relative overflow-hidden pt-[68px]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_78%_18%,rgba(141,248,210,0.09),transparent_70%)]" />
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_25%,black,transparent_78%)]" />

            <div className="shell relative grid items-center gap-14 pb-14 pt-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-12 lg:pb-20 lg:pt-16">
                <div>
                    <motion.div
                        initial={reduce ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="flex flex-wrap items-center gap-2.5"
                    >
                        <span className="inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/7 py-1.5 pl-2.5 pr-3">
                            <span className="animate-signal h-1.5 w-1.5 rounded-full bg-mint" />
                            <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-mint">
                                edge runtime 3.4
                            </span>
                        </span>
                        <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-haze/60">
                            no cloud round trip
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={reduce ? false : { opacity: 0, y: 26 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
                        className="mt-7 text-[clamp(2.35rem,6.1vw,5.1rem)] font-medium leading-[0.94] tracking-[-0.055em] text-white"
                    >
                        Lightweight AI
                        <br />
                        where <span className="text-mint text-glow">sensing</span>
                        <br />
                        starts.
                    </motion.h1>

                    <motion.p
                        initial={reduce ? false : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.18, ease: EASE }}
                        className="mt-7 max-w-[34rem] text-pretty text-[15.5px] leading-7 text-haze"
                    >
                        Turn trained models into sensor-ready workloads. EdgeMind packages the network, scores the
                        stream on device, forwards only verified events, and ships new models to the fleet without
                        rebuilding your stack.
                    </motion.p>

                    <motion.div
                        initial={reduce ? false : { opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.26, ease: EASE }}
                        className="mt-9 flex flex-wrap items-center gap-3"
                    >
                        <a href="#pilot" className="btn-primary">
                            Build a sensor pilot
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                        <a href="#runtime" className="btn-ghost">
                            Inspect the runtime
                            <ArrowDown className="h-4 w-4" />
                        </a>
                    </motion.div>

                    <motion.dl
                        initial={reduce ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="mt-11 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/10 pt-6 sm:grid-cols-4"
                    >
                        {METRICS.map((metric) => (
                            <div key={metric.label}>
                                <dt className="field-label text-[9px]">{metric.label}</dt>
                                <dd className="mt-2 flex items-baseline gap-1.5">
                                    <span className="font-mono text-[23px] font-medium tabular-nums tracking-[-0.04em] text-white">
                                        {metric.value}
                                    </span>
                                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-mint/70">
                                        {metric.unit}
                                    </span>
                                </dd>
                            </div>
                        ))}
                    </motion.dl>
                </div>

                <motion.div
                    initial={reduce ? false : { opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
                    className="relative"
                >
                    <div className="group relative overflow-hidden rounded-2xl border border-white/12 bg-panel shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
                        <div className="relative h-[360px] overflow-hidden sm:h-[420px] lg:h-[486px]">
                            <img
                                src={sensorImage}
                                alt="EdgeMind sensor module with onboard inference mounted on a factory line"
                                className="animate-drift h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,16,14,0.55)_0%,rgba(4,16,14,0.05)_38%,rgba(4,16,14,0.72)_82%,rgba(4,16,14,0.96)_100%)]" />
                            <div className="animate-scan pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(141,248,210,0.16),transparent)]" />

                            <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
                                <div className="border border-white/12 bg-ink/60 px-2.5 py-1.5 backdrop-blur-md">
                                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/70">
                                        line-04 · vib-node-07
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 border border-mint/25 bg-ink/60 px-2.5 py-1.5 backdrop-blur-md">
                                    <StatusDot />
                                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-mint">live</p>
                                </div>
                            </div>

                            <div className="absolute inset-x-4 bottom-4">
                                <div className="rounded-xl border border-white/12 bg-[#051210]/85 p-4 backdrop-blur-xl">
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-haze/80">
                                            local scoring · 1024-sample window
                                        </p>
                                        <p className="font-mono text-[9px] tabular-nums text-mint/80">12.8 kHz</p>
                                    </div>

                                    <svg viewBox="0 0 320 84" className="mt-3 h-[74px] w-full" preserveAspectRatio="none">
                                        <defs>
                                            <linearGradient id="heroWave" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#8df8d2" stopOpacity="0.22" />
                                                <stop offset="100%" stopColor="#8df8d2" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        <rect x="214" y="0" width="56" height="84" fill="#8df8d2" opacity="0.08" />
                                        <line x1="0" y1="42" x2="320" y2="42" stroke="#ffffff" strokeOpacity="0.08" />
                                        <polyline points={wave} fill="none" stroke="#8df8d2" strokeWidth="1.4" />
                                        <line x1="0" y1="24" x2="320" y2="24" stroke="#ffc98a" strokeOpacity="0.4" strokeDasharray="3 4" />
                                    </svg>

                                    <div className="mt-3 grid grid-cols-3 gap-3 border-t border-white/8 pt-3">
                                        <div>
                                            <p className="field-label text-[8.5px]">Verdict</p>
                                            <p className="mt-1.5 truncate font-mono text-[11px] text-white">outer-race-wear</p>
                                        </div>
                                        <div>
                                            <p className="field-label text-[8.5px]">Confidence</p>
                                            <p className="mt-1.5 font-mono text-[11px] tabular-nums text-mint">0.94</p>
                                        </div>
                                        <div>
                                            <p className="field-label text-[8.5px]">Decision</p>
                                            <p className="mt-1.5 font-mono text-[11px] tabular-nums text-white">7.2 ms</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute -right-2 -top-3 hidden items-center gap-2 border border-mint/30 bg-ink px-3 py-2 shadow-lg sm:flex lg:-right-4">
                        <LockIcon className="h-3.5 w-3.5 text-mint" />
                        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/75">
                            signed bundle · int8
                        </span>
                    </div>

                    <div className="absolute -bottom-4 -left-3 hidden border border-white/12 bg-panel px-3 py-2 shadow-lg sm:block lg:-left-5">
                        <p className="field-label text-[8px]">bundle in memory</p>
                        <p className="mt-1 font-mono text-[12px] tabular-nums text-white">
                            0.31 MB <span className="text-haze/60">/ 64 MB</span>
                        </p>
                    </div>
                </motion.div>
            </div>

            <Ticker />
        </section>
    );
}
