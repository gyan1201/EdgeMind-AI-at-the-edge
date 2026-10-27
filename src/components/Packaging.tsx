import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
    MODELS,
    PRECISIONS,
    TARGETS,
    bundleSize,
    type ModelProfile,
    type Precision,
    type PrecisionKey,
    type Target,
    type TargetKey,
} from "@/lib/data";
import { cn } from "@/utils/cn";
import { CheckIcon, LockIcon } from "./Icons";
import { Reveal, SectionHead, StatusDot } from "./ui";

function formatMb(value: number) {
    if (value < 0.1) return `${(value * 1024).toFixed(0)} KB`;
    if (value < 10) return `${value.toFixed(2)} MB`;
    if (value < 1024) return `${value.toFixed(1)} MB`;
    return `${(value / 1024).toFixed(1)} GB`;
}

function formatMs(value: number) {
    if (value < 1) return `${value.toFixed(2)} ms`;
    if (value < 100) return `${value.toFixed(1)} ms`;
    if (value < 1000) return `${Math.round(value)} ms`;
    return `${(value / 1000).toFixed(2)} s`;
}

function Toggle({
    checked,
    onChange,
    label,
}: {
    checked: boolean;
    onChange: (value: boolean) => void;
    label: string;
}) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className="flex w-full items-center justify-between gap-4 border border-white/10 bg-white/2 px-3.5 py-3 text-left transition-colors hover:border-white/20"
        >
            <span className="text-[12.5px] text-white/80">{label}</span>
            <span
                className={cn(
                    "relative h-[18px] w-8 shrink-0 rounded-full transition-colors",
                    checked ? "bg-mint" : "bg-white/15"
                )}
            >
                <span
                    className={cn(
                        "absolute top-[3px] h-3 w-3 rounded-full bg-ink transition-all",
                        checked ? "left-[17px]" : "left-[3px] bg-white/80"
                    )}
                />
            </span>
        </button>
    );
}

export default function Packaging() {
    const [modelId, setModelId] = useState(MODELS[0].id);
    const [precisionKey, setPrecisionKey] = useState<PrecisionKey>("int8");
    const [pruned, setPruned] = useState(true);
    const [targetKey, setTargetKey] = useState<TargetKey>("mcu");

    const model = MODELS.find((item) => item.id === modelId) as ModelProfile;
    const precision = PRECISIONS.find((item) => item.key === precisionKey) as Precision;
    const target = TARGETS.find((item) => item.key === targetKey) as Target;

    const result = useMemo(() => {
        const size = bundleSize(model, precision, pruned);
        const accuracy = model.baseAccuracy + precision.accuracy + (pruned ? -0.4 : 0);
        const latency = model.baseLatency * precision.latency * target.latencyScale;
        const ram = model.baseRam * precision.ram * (pruned ? 0.72 : 1);
        const fits = size <= target.flash && ram <= target.ram;

        return {
            size,
            accuracy,
            latency,
            ram,
            fits,
            flashUse: Math.min(100, (size / target.flash) * 100),
            ramUse: Math.min(100, (ram / target.ram) * 100),
            delta: accuracy - model.baseAccuracy,
            reference: bundleSize(model, PRECISIONS[0], false),
        };
    }, [model, precision, target, pruned]);

    const files = [
        { name: `${model.id}.tflite`, bytes: result.size * 1024 * 1024 * 0.955 },
        { name: "workload.yaml", bytes: 1640 },
        { name: "labels.txt", bytes: 212 },
        { name: "signature.ed25519", bytes: 64 },
    ];

    const log = [
        `$ edgemind pack ${model.id} --precision ${precisionKey}${pruned ? " --prune" : ""}`,
        `graph captured · ${Math.round(model.paramsM * 1204)} ops fused`,
        `calibration · 512 windows from sensor bus`,
        `weights quantized · ${formatMb(result.size)}`,
        `ram arena reserved · ${formatMb(result.ram)}`,
        `ed25519 signature · verified`,
        `bundle ready · ${model.id}-${precisionKey}-3.2.1.emb`,
    ];

    return (
        <section id="packaging" className="relative border-t border-white/8 bg-ink py-24 lg:py-32">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_85%_20%,rgba(111,227,255,0.05),transparent_70%)]" />
            <div className="shell relative">
                <SectionHead
                    index="02"
                    eyebrow="Tiny model packaging"
                    title={
                        <>
                            Ship megabytes,
                            <br />
                            not gigabytes.
                        </>
                    }
                    body={
                        <p>
                            Convert a trained network into a signed, quantized bundle sized for a specific device
                            class. Pick a model and precision, see the memory, latency, and accuracy trade-off before a
                            single byte reaches the fleet.
                        </p>
                    }
                />

                <div className="mt-14 grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
                    <Reveal className="panel p-5 sm:p-6">
                        <div className="flex items-center justify-between">
                            <p className="field-label">01 · model</p>
                            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-haze/45">
                                from your training run
                            </span>
                        </div>

                        <div className="mt-3 divide-y divide-white/7 border border-white/9">
                            {MODELS.map((item) => {
                                const active = item.id === modelId;
                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setModelId(item.id)}
                                        aria-pressed={active}
                                        className={cn(
                                            "flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left transition-colors",
                                            active ? "bg-mint/7" : "hover:bg-white/3"
                                        )}
                                    >
                                        <span className="min-w-0">
                                            <span
                                                className={cn(
                                                    "block truncate text-[13px] font-medium",
                                                    active ? "text-white" : "text-white/75"
                                                )}
                                            >
                                                {item.name}
                                            </span>
                                            <span className="mt-0.5 block truncate font-mono text-[9.5px] uppercase tracking-[0.1em] text-haze/55">
                                                {item.task}
                                            </span>
                                        </span>
                                        <span className="flex shrink-0 items-center gap-2">
                                            <span className="font-mono text-[10px] tabular-nums text-haze/60">
                                                {item.paramsM}M
                                            </span>
                                            <span
                                                className={cn(
                                                    "flex h-4 w-4 items-center justify-center rounded-full border",
                                                    active
                                                        ? "border-mint bg-mint text-ink"
                                                        : "border-white/20 text-transparent"
                                                )}
                                            >
                                                <CheckIcon className="h-2.5 w-2.5" />
                                            </span>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                            <p className="field-label">02 · precision</p>
                            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-haze/45">
                                post-training
                            </span>
                        </div>

                        <div className="mt-3 grid grid-cols-4 gap-1.5">
                            {PRECISIONS.map((item) => {
                                const active = item.key === precisionKey;
                                return (
                                    <button
                                        key={item.key}
                                        type="button"
                                        onClick={() => setPrecisionKey(item.key)}
                                        aria-pressed={active}
                                        className={cn(
                                            "border py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors",
                                            active
                                                ? "border-mint bg-mint text-ink"
                                                : "border-white/10 bg-white/2 text-haze hover:border-white/25 hover:text-white"
                                        )}
                                    >
                                        {item.label}
                                    </button>
                                );
                            })}
                        </div>
                        <p className="mt-2 min-h-[18px] font-mono text-[9.5px] leading-4 text-haze/60">
                            {precision.note}
                        </p>

                        <div className="mt-5">
                            <Toggle checked={pruned} onChange={setPruned} label="Prune + distill (40% sparsity)" />
                        </div>

                        <div className="mt-6">
                            <p className="field-label">03 · target class</p>
                            <div className="mt-3 grid gap-1.5 sm:grid-cols-3">
                                {TARGETS.map((item) => {
                                    const active = item.key === targetKey;
                                    return (
                                        <button
                                            key={item.key}
                                            type="button"
                                            onClick={() => setTargetKey(item.key)}
                                            aria-pressed={active}
                                            className={cn(
                                                "border px-3 py-2.5 text-left transition-colors",
                                                active
                                                    ? "border-mint/60 bg-mint/8"
                                                    : "border-white/10 bg-white/2 hover:border-white/25"
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    "block text-[11.5px] font-medium",
                                                    active ? "text-white" : "text-white/70"
                                                )}
                                            >
                                                {item.label}
                                            </span>
                                            <span className="mt-1 block font-mono text-[8.5px] uppercase tracking-[0.08em] text-haze/55">
                                                {item.detail}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={0.08} className="panel overflow-hidden">
                        <div className="flex items-center justify-between border-b border-white/8 px-5 py-3.5 sm:px-6">
                            <div className="flex items-center gap-2.5">
                                <StatusDot />
                                <span className="field-label">bundle estimate</span>
                            </div>
                            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-haze/45">
                                {model.name.toLowerCase()} · {precision.label}
                            </span>
                        </div>

                        <div className="px-5 py-6 sm:px-6">
                            <div className="flex flex-wrap items-end justify-between gap-4">
                                <div>
                                    <motion.p
                                        key={`${result.size}-${result.fits}`}
                                        initial={{ opacity: 0.4, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="font-mono text-[44px] font-medium leading-none tabular-nums tracking-[-0.05em] text-white"
                                    >
                                        {formatMb(result.size)}
                                    </motion.p>
                                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-haze/55">
                                        was {formatMb(result.reference)} at fp32
                                    </p>
                                </div>

                                <div
                                    className={cn(
                                        "flex items-center gap-2 border px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em]",
                                        result.fits
                                            ? "border-mint/30 bg-mint/7 text-mint"
                                            : "border-amber/30 bg-amber/7 text-amber"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "h-1.5 w-1.5 rounded-full",
                                            result.fits ? "bg-mint" : "bg-amber"
                                        )}
                                    />
                                    {result.fits ? "fits target" : "over budget"}
                                </div>
                            </div>

                            <div className="mt-6 space-y-3.5">
                                {[
                                    {
                                        label: "flash",
                                        detail: `${formatMb(result.size)} / ${formatMb(target.flash)}`,
                                        use: result.flashUse,
                                        warn: result.size > target.flash,
                                    },
                                    {
                                        label: "ram arena",
                                        detail: `${formatMb(result.ram)} / ${formatMb(target.ram)}`,
                                        use: result.ramUse,
                                        warn: result.ram > target.ram,
                                    },
                                ].map((row) => (
                                    <div key={row.label}>
                                        <div className="flex items-center justify-between">
                                            <span className="field-label text-[8.5px]">{row.label}</span>
                                            <span className="font-mono text-[9.5px] tabular-nums text-haze/65">
                                                {row.detail}
                                            </span>
                                        </div>
                                        <div className="mt-2 h-1.5 w-full overflow-hidden bg-white/7">
                                            <motion.div
                                                animate={{ width: `${row.use}%` }}
                                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                                className={cn("h-full", row.warn ? "bg-amber" : "bg-mint")}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-white/8 pt-5 sm:grid-cols-4">
                                <div>
                                    <p className="field-label text-[8.5px]">p50 latency</p>
                                    <p className="mt-1.5 font-mono text-[16px] tabular-nums text-white">
                                        {formatMs(result.latency)}
                                    </p>
                                    <p className="mt-0.5 font-mono text-[8.5px] text-haze/50">{target.detail}</p>
                                </div>
                                <div>
                                    <p className="field-label text-[8.5px]">accuracy</p>
                                    <p className="mt-1.5 font-mono text-[16px] tabular-nums text-white">
                                        {result.accuracy.toFixed(1)}%
                                    </p>
                                    <p
                                        className={cn(
                                            "mt-0.5 font-mono text-[8.5px]",
                                            result.delta <= -1.5 ? "text-amber" : "text-mint/70"
                                        )}
                                    >
                                        {result.delta > -0.05 ? "±0.0" : result.delta.toFixed(1)} pts
                                    </p>
                                </div>
                                <div>
                                    <p className="field-label text-[8.5px]">energy</p>
                                    <p className="mt-1.5 font-mono text-[16px] tabular-nums text-white">
                                        {precision.energy.toFixed(2)}×
                                    </p>
                                    <p className="mt-0.5 font-mono text-[8.5px] text-haze/50">vs fp32</p>
                                </div>
                                <div>
                                    <p className="field-label text-[8.5px]">tops ceiling</p>
                                    <p className="mt-1.5 font-mono text-[16px] tabular-nums text-white">{target.tops}</p>
                                    <p className="mt-0.5 font-mono text-[8.5px] text-haze/50">device ceiling</p>
                                </div>
                            </div>

                            <div className="mt-6 border border-white/8 bg-ink/60">
                                <div className="flex items-center justify-between border-b border-white/8 px-3.5 py-2.5">
                                    <span className="field-label text-[8.5px]">bundle contents</span>
                                    <span className="flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-mint/70">
                                        <LockIcon className="h-3 w-3" />
                                        signed
                                    </span>
                                </div>
                                <div className="divide-y divide-white/5">
                                    {files.map((file) => (
                                        <div
                                            key={file.name}
                                            className="flex items-center justify-between px-3.5 py-2 font-mono text-[10px]"
                                        >
                                            <span className="text-white/70">{file.name}</span>
                                            <span className="tabular-nums text-haze/55">
                                                {file.bytes >= 1024 * 1024
                                                    ? `${(file.bytes / 1024 / 1024).toFixed(2)} MB`
                                                    : `${(file.bytes / 1024).toFixed(1)} KB`}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between border-t border-white/8 px-3.5 py-2 font-mono text-[9px] text-haze/45">
                                    <span>sha256:7f3ac1c4…9d02</span>
                                    <span>ed25519</span>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

                <Reveal delay={0.1} className="mt-4">
                    <div className="overflow-hidden rounded-xl border border-white/9 bg-[#040d0c]">
                        <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5">
                            <span className="field-label text-[8.5px]">pack output</span>
                            <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-haze/40">
                                est. 11 s
                            </span>
                        </div>
                        <div className="overflow-x-auto px-4 py-3 font-mono text-[10.5px] leading-6">
                            {log.map((line, index) => (
                                <p
                                    key={`${line}-${index}`}
                                    className={cn(
                                        "whitespace-pre",
                                        index === 0
                                            ? "text-haze/50"
                                            : index === log.length - 1
                                              ? "text-mint"
                                              : "text-white/55"
                                    )}
                                >
                                    {index === 0 || index === log.length - 1 ? line : `  ✓ ${line}`}
                                </p>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
