import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { SIGNAL_SOURCES, type SignalKey } from "@/lib/data";
import { clamp, clockStamp, formatCount, noise } from "@/lib/sim";
import { cn } from "@/utils/cn";
import { PulseIcon } from "./Icons";
import { Reveal, SectionHead, StatusDot } from "./ui";

const N = 128;
const W = 640;
const H = 232;
const EVENT_TICKS = 16;

const BASE_LATENCY: Record<SignalKey, number> = {
    vibration: 4.2,
    acoustic: 9.6,
    vision: 26.1,
    climate: 0.6,
};

type Point = { v: number; s: number };
type Forwarded = { id: number; cls: string; score: number; time: string };

function seedPoints(scale: number): Point[] {
    return Array.from({ length: N }, (_, i) => ({
        v: (noise(i) - 0.5) * 0.34 * scale + Math.sin(i * 0.55) * 0.12 * scale,
        s: 0.06 + noise(i + 11) * 0.03,
    }));
}

export default function Signals() {
    const reduce = useReducedMotion();
    const [sourceKey, setSourceKey] = useState<SignalKey>("vibration");
    const source = SIGNAL_SOURCES.find((item) => item.key === sourceKey) ?? SIGNAL_SOURCES[0];
    const [threshold, setThreshold] = useState(source.threshold);
    const [running, setRunning] = useState(!reduce);
    const [points, setPoints] = useState<Point[]>(() => seedPoints(source.scale));
    const [events, setEvents] = useState<Forwarded[]>([]);
    const [stats, setStats] = useState({ scored: 0, above: 0, forwarded: 0 });
    const [latency, setLatency] = useState(BASE_LATENCY[source.key]);

    const tick = useRef(0);
    const countdown = useRef(16);
    const eventPos = useRef(5);
    const wasAbove = useRef(false);
    const thresholdRef = useRef(threshold);
    const sourceRef = useRef(source);
    const faultIndex = useRef(0);

    useEffect(() => {
        thresholdRef.current = threshold;
    }, [threshold]);

    useEffect(() => {
        sourceRef.current = source;
    }, [source]);

    useEffect(() => {
        if (!running) return;

        const id = window.setInterval(() => {
            const src = sourceRef.current;
            tick.current += 1;
            const t = tick.current;

            if (eventPos.current >= 0) {
                eventPos.current += 1;
                if (eventPos.current > EVENT_TICKS) {
                    eventPos.current = -1;
                    countdown.current = 24 + Math.floor(noise(t) * 30);
                }
            } else {
                countdown.current -= 1;
                if (countdown.current <= 0) eventPos.current = 0;
            }

            const phase = eventPos.current >= 0 ? Math.sin((eventPos.current / EVENT_TICKS) * Math.PI) : 0;
            const jitter = (noise(t + 7) - 0.5) * 0.22;
            const v =
                (noise(t) - 0.5) * 0.34 * src.scale +
                Math.sin(t * 0.55) * 0.12 * src.scale +
                phase *
                    src.scale *
                    (0.92 * Math.sin(t * 2.1) + 0.44 * Math.sin(t * 4.7) + 0.2 * Math.sin(t * 7.3));
            const score = clamp(0.05 + phase * 0.9 + jitter * 0.04, 0.02, 0.99);
            const above = score >= thresholdRef.current;

            setPoints((prev) => [...prev.slice(1), { v, s: score }]);
            setStats((prev) => ({
                scored: prev.scored + 1,
                above: prev.above + (above ? 1 : 0),
                forwarded: prev.forwarded + (above && !wasAbove.current ? 1 : 0),
            }));

            if (above && !wasAbove.current) {
                faultIndex.current += 1;
                const entry: Forwarded = {
                    id: t,
                    cls: src.faults[faultIndex.current % src.faults.length],
                    score,
                    time: clockStamp(),
                };
                setEvents((prev) => [entry, ...prev].slice(0, 4));
            }

            wasAbove.current = above;
            setLatency(
                Number(Math.max(0.2, BASE_LATENCY[src.key] + (noise(t + 3) - 0.5) * BASE_LATENCY[src.key] * 0.12).toFixed(1))
            );
        }, 150);

        return () => window.clearInterval(id);
    }, [running]);

    const latest = points[points.length - 1];
    const above = latest.s >= threshold;
    const currentClass = above ? events[0]?.cls ?? source.faults[0] : source.normal;

    const bands = useMemo(() => {
        const ranges: { x: number; width: number }[] = [];
        let start = -1;
        points.forEach((point, index) => {
            const isAbove = point.s >= threshold;
            if (isAbove && start < 0) start = index;
            if (!isAbove && start >= 0) {
                ranges.push({ x: (start / (N - 1)) * W, width: ((index - start) / (N - 1)) * W });
                start = -1;
            }
        });
        if (start >= 0) ranges.push({ x: (start / (N - 1)) * W, width: ((N - 1 - start) / (N - 1)) * W });
        return ranges;
    }, [points, threshold]);

    const polyline = useMemo(
        () =>
            points
                .map((point, index) => {
                    const x = (index / (N - 1)) * W;
                    const y = H / 2 - (point.v / 1.9) * (H / 2 - 14);
                    return `${x.toFixed(1)},${y.toFixed(1)}`;
                })
                .join(" "),
        [points]
    );

    function chooseSource(key: SignalKey) {
        const next = SIGNAL_SOURCES.find((item) => item.key === key) ?? SIGNAL_SOURCES[0];
        setSourceKey(key);
        setThreshold(next.threshold);
        setPoints(seedPoints(next.scale));
        setEvents([]);
        setStats({ scored: 0, above: 0, forwarded: 0 });
        setLatency(BASE_LATENCY[key]);
        tick.current = 0;
        countdown.current = 16;
        eventPos.current = 5;
        wasAbove.current = false;
    }

    const held = stats.scored - stats.above;

    return (
        <section id="signals" className="relative border-t border-white/8 bg-ink-2/50 py-24 lg:py-32">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_45%_at_20%_55%,rgba(141,248,210,0.055),transparent_70%)]" />
            <div className="shell relative">
                <SectionHead
                    index="03"
                    eyebrow="Local signal decisions"
                    title={
                        <>
                            The first decision
                            <br />
                            happens in the sensor.
                        </>
                    }
                    body={
                        <p>
                            Classify vibration, audio, image, and environmental signals in milliseconds on device.
                            Run the stream below and move the gate: every window is scored locally, only windows above
                            your threshold leave the node.
                        </p>
                    }
                />

                <Reveal className="panel mt-14 overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/8 px-4 py-3 sm:px-5">
                        <div className="flex flex-wrap gap-1.5">
                            {SIGNAL_SOURCES.map((item) => (
                                <button
                                    key={item.key}
                                    type="button"
                                    onClick={() => chooseSource(item.key)}
                                    data-active={item.key === sourceKey}
                                    className="chip"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <label className="flex items-center gap-2.5">
                                <span className="field-label text-[8.5px]">gate</span>
                                <input
                                    type="range"
                                    min={40}
                                    max={96}
                                    step={1}
                                    value={Math.round(threshold * 100)}
                                    onChange={(event) => setThreshold(Number(event.target.value) / 100)}
                                    className="w-24 sm:w-32"
                                    aria-label="Event threshold"
                                />
                                <span className="w-8 font-mono text-[10px] tabular-nums text-mint">
                                    {threshold.toFixed(2)}
                                </span>
                            </label>
                            <span className="hidden h-5 w-px bg-white/10 sm:block" />
                            <button
                                type="button"
                                onClick={() => setRunning((value) => !value)}
                                className="flex items-center gap-2 border border-white/12 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-white/75 transition-colors hover:border-mint/40 hover:text-white"
                            >
                                <span
                                    className={cn(
                                        "h-1.5 w-1.5 rounded-full",
                                        running ? "animate-blink bg-mint" : "bg-haze/50"
                                    )}
                                />
                                {running ? "pause" : "resume"}
                            </button>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-[1.5fr_1fr]">
                        <div className="border-b border-white/8 p-4 sm:p-5 lg:border-b-0 lg:border-r">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-2.5">
                                    <StatusDot tone={above ? "mint" : "ice"} />
                                    <span className="field-label">
                                        {source.sensor} · {source.rate}
                                    </span>
                                </div>
                                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-haze/45">
                                    {source.window} · stride 256
                                </span>
                            </div>

                            <div className="relative mt-4 h-[240px] overflow-hidden border border-white/6 bg-[#04100d]">
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(141,248,210,0.05)_1px,transparent_1px)] bg-[length:100%_25%]" />
                                <svg
                                    viewBox={`0 0 ${W} ${H}`}
                                    preserveAspectRatio="none"
                                    className="relative h-full w-full"
                                    role="img"
                                    aria-label="Live sensor waveform with anomaly windows highlighted"
                                >
                                    {bands.map((band, index) => (
                                        <rect
                                            key={index}
                                            x={band.x}
                                            y={0}
                                            width={Math.max(band.width, 3)}
                                            height={H}
                                            fill="#8df8d2"
                                            opacity={0.09}
                                        />
                                    ))}
                                    <line x1="0" y1={H / 2} x2={W} y2={H / 2} stroke="#ffffff" strokeOpacity="0.12" />
                                    <line
                                        x1="0"
                                        y1={H * 0.22}
                                        x2={W}
                                        y2={H * 0.22}
                                        stroke="#ffc98a"
                                        strokeOpacity="0.25"
                                        strokeDasharray="3 5"
                                    />
                                    <polyline
                                        points={polyline}
                                        fill="none"
                                        stroke="#8df8d2"
                                        strokeWidth="1.4"
                                        strokeLinejoin="round"
                                        vectorEffect="non-scaling-stroke"
                                    />
                                </svg>

                                <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-3 py-2 font-mono text-[8.5px] uppercase tracking-[0.14em] text-haze/45">
                                    <span>amplitude</span>
                                    <span>{source.axisLabel}</span>
                                </div>

                                <div className="pointer-events-none absolute bottom-2 left-3 flex items-center gap-2 border border-white/10 bg-ink/70 px-2 py-1 backdrop-blur-sm">
                                    <span className="h-1.5 w-2.5 bg-mint/25" />
                                    <span className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-haze/70">
                                        window above gate
                                    </span>
                                </div>
                            </div>

                            <div className="mt-2 flex justify-between font-mono text-[8.5px] uppercase tracking-[0.12em] text-haze/50">
                                <span>-19.2 s</span>
                                <span>-9.6 s</span>
                                <span>now</span>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div className="flex-1 p-4 sm:p-5">
                                <div className="flex items-center justify-between">
                                    <span className="field-label">local verdict</span>
                                    <span
                                        className={cn(
                                            "flex items-center gap-1.5 border px-2 py-1 font-mono text-[8.5px] uppercase tracking-[0.12em]",
                                            above
                                                ? "border-mint/35 bg-mint/8 text-mint"
                                                : "border-white/12 bg-white/3 text-haze"
                                        )}
                                    >
                                        {above ? "forwarding" : "suppressed"}
                                    </span>
                                </div>

                                <p className="mt-3 truncate font-mono text-[17px] tracking-[-0.01em] text-white">
                                    {currentClass}
                                </p>
                                <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-haze/50">
                                    {above ? "anomaly class" : "baseline class"} · {source.model}
                                </p>

                                <div className="mt-5">
                                    <div className="flex items-end justify-between">
                                        <span className="field-label text-[8.5px]">score</span>
                                        <span className="font-mono text-[19px] tabular-nums text-mint">
                                            {latest.s.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="relative mt-2 h-2 bg-white/8">
                                        <div
                                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-mint/60 to-mint transition-[width] duration-150"
                                            style={{ width: `${latest.s * 100}%` }}
                                        />
                                        <div
                                            className="absolute -top-1 bottom-[-4px] w-px bg-amber"
                                            style={{ left: `${threshold * 100}%` }}
                                        />
                                    </div>
                                    <div className="mt-1.5 flex justify-between font-mono text-[8.5px] text-haze/40">
                                        <span>0.00</span>
                                        <span className="text-amber/70">gate {threshold.toFixed(2)}</span>
                                        <span>1.00</span>
                                    </div>
                                </div>

                                <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-white/8 pt-4">
                                    <div>
                                        <p className="field-label text-[8.5px]">decision</p>
                                        <p className="mt-1 font-mono text-[13px] tabular-nums text-white">
                                            {latency.toFixed(1)} ms
                                        </p>
                                    </div>
                                    <div>
                                        <p className="field-label text-[8.5px]">bundle</p>
                                        <p className="mt-1 font-mono text-[13px] text-white">{source.bundle}</p>
                                    </div>
                                    <div>
                                        <p className="field-label text-[8.5px]">queue</p>
                                        <p className="mt-1 font-mono text-[13px] tabular-nums text-white">0 dropped</p>
                                    </div>
                                    <div>
                                        <p className="field-label text-[8.5px]">cooldown</p>
                                        <p className="mt-1 font-mono text-[13px] tabular-nums text-white">15 s</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 divide-x divide-white/8 border-t border-white/8">
                                {[
                                    { label: "scored", value: formatCount(stats.scored) },
                                    { label: "forwarded", value: formatCount(stats.forwarded), accent: true },
                                    { label: "held", value: formatCount(held) },
                                ].map((item) => (
                                    <div key={item.label} className="px-4 py-3">
                                        <p className="field-label text-[8px]">{item.label}</p>
                                        <p
                                            className={cn(
                                                "mt-1.5 font-mono text-[15px] tabular-nums",
                                                item.accent ? "text-mint" : "text-white/85"
                                            )}
                                        >
                                            {item.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/8 px-4 py-3 sm:px-5">
                        <div className="flex items-center justify-between">
                            <span className="field-label text-[8.5px]">forwarded windows</span>
                            <span className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-haze/40">
                                {source.sensor} · {source.rate}
                            </span>
                        </div>
                        <div className="mt-2 grid gap-2 sm:grid-cols-3">
                            {events.length === 0 ? (
                                <div className="flex items-center gap-2 border border-white/8 bg-white/2 px-3 py-2 sm:col-span-3">
                                    <PulseIcon className="h-3.5 w-3.5 text-haze/50" />
                                    <span className="font-mono text-[10px] text-haze/55">
                                        waiting for the first window to cross the gate…
                                    </span>
                                </div>
                            ) : (
                                events.slice(0, 3).map((event) => (
                                    <div
                                        key={event.id}
                                        className="animate-rise flex items-center justify-between gap-2 border border-mint/15 bg-mint/4 px-3 py-2 font-mono text-[10px]"
                                    >
                                        <span className="truncate text-mint">{event.cls}</span>
                                        <span className="flex shrink-0 items-center gap-2 text-haze/55">
                                            <span className="tabular-nums text-white/70">{event.score.toFixed(2)}</span>
                                            <span>{event.time}</span>
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={0.08}>
                    <p className="mt-5 max-w-3xl font-mono text-[10px] leading-5 text-haze/45">
                        Threshold, cooldown, and hysteresis are declared per class in the workload manifest. A raised
                        gate lowers egress, not local recall: every window is still scored on device.
                    </p>
                </Reveal>
            </div>
        </section>
    );
}
