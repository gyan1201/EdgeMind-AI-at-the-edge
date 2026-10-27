import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { RINGS } from "@/lib/data";
import { clockStamp } from "@/lib/sim";
import { cn } from "@/utils/cn";
import { AlertIcon, CheckIcon, LockIcon, RestartIcon } from "./Icons";
import { Reveal, SectionHead, StatusDot } from "./ui";

type LogTone = "ok" | "warn" | "info" | "danger";
type LogLine = { id: number; time: string; text: string; tone: LogTone };

const DOTS = 120;
const RING_CUTOFFS = [3, 14, 54, 120];

const INITIAL_LOG: Omit<LogLine, "id" | "time">[] = [
    { text: "release channel · stable", tone: "info" },
    { text: "release bundle bearingnet-1d-3.2.1 · 0.31 MB", tone: "info" },
    { text: "signature verified · ed25519:5c1e88…a71b", tone: "ok" },
    { text: "fleet inventory · 1,200 devices · 4 rings", tone: "info" },
];

function stamp() {
    return clockStamp().slice(0, 8);
}

function dotRing(index: number) {
    for (let ring = 0; ring < RING_CUTOFFS.length; ring += 1) {
        if (index < RING_CUTOFFS[ring]) return ring;
    }
    return RING_CUTOFFS.length - 1;
}

export default function Fleet() {
    const [stage, setStage] = useState(0);
    const [rolling, setRolling] = useState<number | null>(null);
    const [reverted, setReverted] = useState(false);
    const [driftAlert, setDriftAlert] = useState(false);
    const [overridden, setOverridden] = useState(false);
    const [log, setLog] = useState<LogLine[]>(() =>
        INITIAL_LOG.map((line, index) => ({ ...line, id: index, time: stamp() }))
    );
    const logId = useRef(INITIAL_LOG.length);
    const timers = useRef<number[]>([]);
    const logRef = useRef<HTMLDivElement | null>(null);

    const addLog = (text: string, tone: LogTone = "info") => {
        logId.current += 1;
        setLog((prev) => [...prev, { id: logId.current, time: stamp(), text, tone }].slice(-30));
    };

    const schedule = (fn: () => void, delay: number) => {
        const id = window.setTimeout(fn, delay);
        timers.current.push(id);
    };

    useEffect(() => {
        return () => {
            timers.current.forEach((id) => window.clearTimeout(id));
        };
    }, []);

    useEffect(() => {
        if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
    }, [log]);

    useEffect(() => {
        if (rolling === null) return;
        const ring = rolling;
        const id = window.setTimeout(() => {
            setStage(ring + 1);
            setRolling(null);

            if (ring === 2) {
                setDriftAlert(true);
                addLog("gate failed · drift 1.84% above 1.5% limit", "warn");
                addLog("release held · 540 devices on 3.2.1 · rollback available", "danger");
            } else if (ring === 3) {
                addLog("gate passed · p95 34 ms · error 0.31%", "ok");
                addLog("fleet complete · 1,200 devices on bearingnet 3.2.1", "ok");
            } else {
                addLog(`gate passed · p95 ${ring === 0 ? 29 : 31} ms · drift 0.2%`, "ok");
            }
        }, 1550);
        timers.current.push(id);
        return () => window.clearTimeout(id);
    }, [rolling]);

    const advance = () => {
        if (rolling !== null) return;

        if (reverted) {
            reset();
            return;
        }
        if (stage >= RINGS.length) return;

        const ring = RINGS[stage];
        setRolling(stage);
        addLog(`ring ${ring.name.toLowerCase()} → ${ring.devices} devices staged`, "info");
        schedule(() => addLog("delta download · 0.4 MB · 3 s at 1.4 Mbps", "info"), 420);
        schedule(() => addLog("health check · inference parity 99.2%", "ok"), 980);
    };

    const rollback = () => {
        if (stage === 0 || reverted) return;
        timers.current.forEach((id) => window.clearTimeout(id));
        timers.current = [];
        setReverted(true);
        setDriftAlert(false);
        setRolling(null);
        setStage(0);
        setOverridden(false);
        addLog("rollback requested by operator", "danger");
        addLog(`pinning bearingnet 3.2.0 · ${updated.toLocaleString()} devices reverting`, "warn");
        schedule(() => addLog("rollback complete · p95 34 ms · drift 0.12%", "ok"), 1200);
    };

    const reset = () => {
        timers.current.forEach((id) => window.clearTimeout(id));
        timers.current = [];
        setStage(0);
        setRolling(null);
        setReverted(false);
        setDriftAlert(false);
        setOverridden(false);
        logId.current = INITIAL_LOG.length + 1;
        setLog(INITIAL_LOG.map((line, index) => ({ ...line, id: index, time: stamp() })));
    };

    const override = () => {
        setOverridden(true);
        addLog("gate overridden by operator · release continues", "warn");
    };

    const ringState = (index: number) => {
        if (reverted) return "reverted";
        if (index === rolling) return "deploying";
        if (index < stage) return index === 2 ? "watch" : "passed";
        return "locked";
    };

    const updated = reverted ? 0 : RINGS.slice(0, stage).reduce((sum, ring) => sum + ring.devices, 0);
    const drift = reverted ? 0.12 : stage >= 3 ? 1.84 : stage >= 1 ? 0.24 : 0.18;
    const errorRate = reverted ? 0.04 : stage >= 3 ? 0.31 : 0.08;
    const version = reverted || stage === 0 ? "3.2.0" : "3.2.1";
    const driftBad = drift > 1.5;

    const dots = useMemo(
        () =>
            Array.from({ length: DOTS }, (_, index) => ({
                ring: dotRing(index),
                id: `dev-${String(index * 10 + 7).padStart(4, "0")}`,
            })),
        []
    );

    const nextRing = RINGS[Math.min(stage, RINGS.length - 1)];
    const actionLabel = reverted
        ? "Restart rollout"
        : stage >= RINGS.length
          ? "Release complete"
          : driftAlert && !overridden
            ? "Hold · gate failed"
            : `Advance to ${nextRing.name.toLowerCase()}`;

    return (
        <section id="fleet" className="relative border-t border-white/8 bg-ink-2/50 py-24 lg:py-32">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_45%_at_30%_20%,rgba(141,248,210,0.05),transparent_70%)]" />
            <div className="shell relative">
                <SectionHead
                    index="05"
                    eyebrow="Fleet-safe updates"
                    title={
                        <>
                            Roll out ring by ring.
                            <br />
                            Roll back in one click.
                        </>
                    }
                    body={
                        <p>
                            Roll out new models with signed bundles, staged releases, and rollback controls. Every
                            ring has to clear a health gate before the next one opens; the first bad signal stops the
                            release.
                        </p>
                    }
                />

                <Reveal className="panel mt-14 overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-5 py-3.5">
                        <div className="flex flex-wrap items-center gap-2.5">
                            <StatusDot tone={driftAlert && !overridden ? "amber" : "mint"} />
                            <span className="field-label">release · bearingnet-1d</span>
                            <span className="border border-white/12 bg-white/4 px-2 py-1 font-mono text-[9px] text-white/70">
                                v{version}
                            </span>
                            <span className="hidden items-center gap-1.5 border border-mint/25 bg-mint/6 px-2 py-1 font-mono text-[8.5px] uppercase tracking-[0.1em] text-mint sm:flex">
                                <LockIcon className="h-3 w-3" />
                                signed
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={reset}
                            className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-haze/60 transition-colors hover:text-white"
                        >
                            <RestartIcon className="h-3.5 w-3.5" />
                            reset
                        </button>
                    </div>

                    <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                        <div className="border-b border-white/8 p-5 lg:border-b-0 lg:border-r">
                            <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
                                {[
                                    { label: "devices updated", value: `${updated.toLocaleString()} / 1,200` },
                                    { label: "model version", value: version },
                                    { label: "error rate", value: `${errorRate.toFixed(2)}%` },
                                    {
                                        label: "drift index",
                                        value: `${drift.toFixed(2)}%`,
                                        warn: driftBad,
                                    },
                                ].map((metric) => (
                                    <div key={metric.label}>
                                        <p className="field-label text-[8.5px]">{metric.label}</p>
                                        <p
                                            className={cn(
                                                "mt-1.5 font-mono text-[16px] tabular-nums",
                                                metric.warn ? "text-amber" : "text-white"
                                            )}
                                        >
                                            {metric.value}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 border border-white/8 bg-[#04100d] p-4">
                                <div className="flex items-center justify-between">
                                    <span className="field-label text-[8.5px]">device map · 1,200 nodes</span>
                                    <span className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-haze/40">
                                        1 dot = 10
                                    </span>
                                </div>

                                <div className="mt-4 grid grid-cols-[repeat(15,minmax(0,1fr))] gap-[5px] sm:grid-cols-[repeat(24,minmax(0,1fr))]">
                                    {dots.map((dot) => {
                                        const state = ringState(dot.ring);
                                        return (
                                            <motion.span
                                                key={dot.id}
                                                title={`${dot.id} · ring ${dot.ring + 1} · ${state}`}
                                                animate={{
                                                    backgroundColor:
                                                        state === "reverted"
                                                            ? "rgba(255,255,255,0.09)"
                                                            : state === "watch" || state === "deploying"
                                                              ? "#ffc98a"
                                                              : state === "passed"
                                                                ? "#8df8d2"
                                                                : "rgba(255,255,255,0.12)",
                                                }}
                                                transition={{ duration: 0.4 }}
                                                className="aspect-square w-full rounded-[1px]"
                                            />
                                        );
                                    })}
                                </div>

                                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/6 pt-3">
                                    {[
                                        { color: "bg-mint", label: "on release" },
                                        { color: "bg-amber", label: "watch / deploying" },
                                        { color: "bg-white/20", label: "pending" },
                                        { color: "bg-white/8", label: "reverted" },
                                    ].map((item) => (
                                        <span
                                            key={item.label}
                                            className="flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-haze/50"
                                        >
                                            <span className={cn("h-1.5 w-1.5 rounded-[1px]", item.color)} />
                                            {item.label}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {driftAlert && !overridden ? (
                                <div className="mt-4 border border-amber/30 bg-amber/6 p-3.5">
                                    <div className="flex items-start gap-2.5">
                                        <AlertIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                                        <div>
                                            <p className="text-[12px] font-medium text-amber">Drift above gate</p>
                                            <p className="mt-1 text-[11.5px] leading-5 text-amber/75">
                                                Broad ring is at 1.84% drift against a 1.5% limit. Roll back the ring
                                                or override to continue.
                                            </p>
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                <button
                                                    type="button"
                                                    onClick={rollback}
                                                    className="border border-rose/40 bg-rose/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-rose transition-colors hover:bg-rose/20"
                                                >
                                                    Roll back broad ring
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={override}
                                                    className="border border-white/15 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-white/70 transition-colors hover:border-white/35 hover:text-white"
                                                >
                                                    Override & continue
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                            {reverted ? (
                                <div className="mt-4 flex items-start gap-2.5 border border-white/12 bg-white/3 p-3.5">
                                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                                    <p className="text-[11.5px] leading-5 text-haze/75">
                                        Fleet pinned to 3.2.0. All 1,200 devices reverted; the bad bundle is blocked
                                        from re-release until a new signature is issued.
                                    </p>
                                </div>
                            ) : null}
                        </div>

                        <div className="flex flex-col">
                            <div className="flex-1 p-5">
                                <div className="flex items-center justify-between">
                                    <span className="field-label">rollout rings</span>
                                    <span className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-haze/40">
                                        gate before next ring
                                    </span>
                                </div>

                                <div className="mt-3 space-y-1">
                                    {RINGS.map((ring, index) => {
                                        const state = ringState(index);
                                        return (
                                            <div
                                                key={ring.id}
                                                className={cn(
                                                    "border-b border-white/6 px-1 py-3 last:border-b-0",
                                                    state === "reverted" && "opacity-45"
                                                )}
                                            >
                                                <div className="flex items-center justify-between gap-3">
                                                    <div className="flex items-center gap-2.5">
                                                        <span
                                                            className={cn(
                                                                "flex h-4 w-4 items-center justify-center rounded-[3px] border font-mono text-[8px]",
                                                                state === "passed"
                                                                    ? "border-mint bg-mint text-ink"
                                                                    : state === "deploying" || state === "watch"
                                                                      ? "border-amber bg-amber/15 text-amber"
                                                                      : "border-white/20 text-haze/50"
                                                            )}
                                                        >
                                                            {state === "passed" ? (
                                                                <CheckIcon className="h-2.5 w-2.5" />
                                                            ) : (
                                                                index + 1
                                                            )}
                                                        </span>
                                                        <div>
                                                            <p className="text-[12.5px] font-medium text-white/85">
                                                                {ring.name}
                                                            </p>
                                                            <p className="mt-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-haze/45">
                                                                {ring.devices} devices · {ring.gate}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span
                                                        className={cn(
                                                            "shrink-0 font-mono text-[9px] uppercase tracking-[0.1em]",
                                                            state === "passed"
                                                                ? "text-mint"
                                                                : state === "deploying"
                                                                  ? "text-amber"
                                                                  : state === "watch"
                                                                    ? "text-amber"
                                                                    : state === "reverted"
                                                                      ? "text-haze/40"
                                                                      : "text-haze/50"
                                                        )}
                                                    >
                                                        {state === "passed"
                                                            ? "passed"
                                                            : state === "deploying"
                                                              ? "deploying"
                                                              : state === "watch"
                                                                ? "watch"
                                                                : state === "reverted"
                                                                  ? "reverted"
                                                                  : "locked"}
                                                    </span>
                                                </div>
                                                <div className="mt-2.5 h-1 w-full overflow-hidden bg-white/7">
                                                    <motion.div
                                                        animate={{
                                                            width:
                                                                state === "passed"
                                                                    ? "100%"
                                                                    : state === "deploying"
                                                                      ? "64%"
                                                                      : state === "watch"
                                                                        ? "100%"
                                                                        : "0%",
                                                        }}
                                                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                                        className={cn(
                                                            "h-full",
                                                            state === "passed"
                                                                ? "bg-mint"
                                                                : state === "deploying" || state === "watch"
                                                                  ? "bg-amber"
                                                                  : "bg-white/20"
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="border-t border-white/8 p-5">
                                <div className="flex flex-col gap-2">
                                    <button
                                        type="button"
                                        onClick={advance}
                                        disabled={
                                            rolling !== null ||
                                            (stage >= RINGS.length && !reverted) ||
                                            (driftAlert && !overridden && !reverted)
                                        }
                                        className={cn(
                                            "flex w-full items-center justify-center gap-2 px-4 py-3 text-[12.5px] font-semibold transition-colors",
                                            driftAlert && !overridden && !reverted
                                                ? "cursor-not-allowed border border-amber/30 bg-amber/10 text-amber"
                                                : "bg-mint text-ink hover:bg-white disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-haze/50"
                                        )}
                                    >
                                        {rolling !== null ? "Deploying…" : actionLabel}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={rollback}
                                        disabled={stage === 0 || reverted || rolling !== null}
                                        className="flex w-full items-center justify-center gap-2 border border-white/12 px-4 py-2.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-haze/70 transition-colors hover:border-rose/40 hover:text-rose disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <RestartIcon className="h-3.5 w-3.5" />
                                        roll back fleet
                                    </button>
                                </div>
                                <p className="mt-3 font-mono text-[9px] leading-4 text-haze/40">
                                    Rollback pins the previous signed bundle and keeps device state.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/8 bg-[#040d0c]">
                        <div className="flex items-center justify-between border-b border-white/8 px-5 py-2.5">
                            <span className="field-label text-[8.5px]">release log</span>
                            <span className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-haze/40">
                                opcua · fleet-controller
                            </span>
                        </div>
                        <div ref={logRef} className="max-h-[148px] overflow-y-auto px-5 py-3 font-mono text-[10px] leading-6">
                            {log.map((line) => (
                                <div key={line.id} className="flex gap-3">
                                    <span className="shrink-0 text-haze/30">{line.time}</span>
                                    <span
                                        className={cn(
                                            line.tone === "ok"
                                                ? "text-mint/85"
                                                : line.tone === "warn"
                                                  ? "text-amber/85"
                                                  : line.tone === "danger"
                                                    ? "text-rose/85"
                                                    : "text-white/50"
                                        )}
                                    >
                                        {line.tone === "ok" ? "✓ " : line.tone === "warn" ? "! " : line.tone === "danger" ? "× " : "· "}
                                        {line.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
