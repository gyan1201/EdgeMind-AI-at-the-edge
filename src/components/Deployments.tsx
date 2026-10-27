import { DEPLOYMENTS, WORKLOAD_MANIFEST } from "@/lib/data";
import { cn } from "@/utils/cn";
import { CheckIcon, CpuIcon } from "./Icons";
import { CopyButton, Reveal, SectionHead } from "./ui";

const INTERFACES = {
    inputs: ["I2S", "IIO", "CSI-2", "SPI", "Modbus", "BLE"],
    transports: ["MQTT 5", "gRPC", "HTTPS", "AMQP", "OPC UA"],
    targets: ["Cortex-M7", "Cortex-A53", "RISC-V", "Jetson Orin", "x86 gateway"],
};

const GUARANTEES = [
    "Keeps your sensor drivers and device tree",
    "No Linux required on MCU-class targets",
    "OTA over cellular with resumable delta bundles",
];

function Manifest() {
    const lines = WORKLOAD_MANIFEST.split("\n");

    return (
        <div className="overflow-hidden rounded-xl border border-white/9 bg-[#040d0c]">
            <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5">
                <span className="field-label text-[8.5px]">workload.yaml</span>
                <CopyButton value={WORKLOAD_MANIFEST} label="Copy manifest" />
            </div>
            <pre className="overflow-x-auto px-4 py-4 font-mono text-[10px] leading-[1.8]">
                <code>
                    {lines.map((line, index) => {
                        if (line.trimStart().startsWith("#")) {
                            return (
                                <div key={index} className="whitespace-pre text-haze/50">
                                    {line}
                                </div>
                            );
                        }
                        const [key, ...rest] = line.split(":");
                        const value = rest.join(":");
                        return (
                            <div key={index} className="whitespace-pre">
                                <span className="text-mint/70">{key}</span>
                                {value ? (
                                    <>
                                        <span className="text-white/25">:</span>
                                        <span className="text-white/60">{value}</span>
                                    </>
                                ) : null}
                            </div>
                        );
                    })}
                </code>
            </pre>
        </div>
    );
}

export default function Deployments() {
    return (
        <section id="deploy" className="relative border-t border-white/8 bg-ink py-24 lg:py-32">
            <div className="pointer-events-none absolute inset-0 dot-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent_75%)]" />
            <div className="shell relative">
                <SectionHead
                    index="06"
                    eyebrow="Deployments"
                    title={
                        <>
                            Built for sensors
                            <br />
                            that cannot wait.
                        </>
                    }
                    body={
                        <p>
                            Use EdgeMind when bandwidth is scarce, privacy matters, or the decision has to happen
                            before a gateway or cloud service responds. Four reference workloads ship with the
                            runtime.
                        </p>
                    }
                />

                <Reveal className="mt-14 overflow-hidden rounded-xl border border-white/9">
                    <div className="hidden grid-cols-[1.15fr_0.95fr_1.25fr_0.7fr_0.65fr_0.7fr] gap-4 border-b border-white/8 bg-white/3 px-5 py-3 md:grid">
                        {["sensor", "signal", "detects", "bundle", "p50", "target"].map((label) => (
                            <span key={label} className="field-label text-[8.5px]">
                                {label}
                            </span>
                        ))}
                    </div>

                    <div className="divide-y divide-white/7 bg-panel/50">
                        {DEPLOYMENTS.map((row, index) => (
                            <div
                                key={row.sensor}
                                className={cn(
                                    "group grid gap-3 px-4 py-5 transition-colors hover:bg-white/3 md:grid-cols-[1.15fr_0.95fr_1.25fr_0.7fr_0.65fr_0.7fr] md:items-center md:gap-4 md:px-5 md:py-4",
                                    index % 2 === 1 && "bg-white/[0.012]"
                                )}
                            >
                                <div>
                                    <p className="text-[14px] font-medium text-white">{row.sensor}</p>
                                    <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-haze/50 md:hidden">
                                        {row.signal}
                                    </p>
                                </div>
                                <p className="hidden font-mono text-[10px] text-haze/65 md:block">{row.signal}</p>
                                <div>
                                    <p className="text-[12.5px] leading-5 text-haze">{row.useCase}</p>
                                    <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.08em] text-mint/70">
                                        {row.model}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 md:block">
                                    <span className="font-mono text-[11px] tabular-nums text-white/80">{row.size}</span>
                                    <span className="font-mono text-[11px] tabular-nums text-haze/60 md:hidden">
                                        {row.latency}
                                    </span>
                                </div>
                                <span className="hidden font-mono text-[11px] tabular-nums text-haze/70 md:block">
                                    {row.latency}
                                </span>
                                <div className="flex items-center gap-2">
                                    <CpuIcon className="h-3.5 w-3.5 shrink-0 text-haze/40" />
                                    <span className="truncate font-mono text-[9.5px] uppercase tracking-[0.06em] text-haze/65">
                                        {row.target}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/8 bg-white/2 px-5 py-3">
                        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-haze/40">
                            int8 · calibrated per channel · measured on device
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-haze/40">
                            + 3.1 MB runtime
                        </span>
                    </div>
                </Reveal>

                <div className="mt-4 grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
                    <Reveal delay={0.06}>
                        <Manifest />
                    </Reveal>

                    <Reveal delay={0.12} className="panel flex flex-col justify-between p-5">
                        <div>
                            <p className="field-label">integration surface</p>
                            <div className="mt-3 space-y-3.5">
                                {(
                                    [
                                        ["input drivers", INTERFACES.inputs],
                                        ["transports", INTERFACES.transports],
                                        ["targets", INTERFACES.targets],
                                    ] as const
                                ).map(([label, items]) => (
                                    <div key={label}>
                                        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-haze/45">
                                            {label}
                                        </p>
                                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                                            {items.map((item) => (
                                                <span
                                                    key={item}
                                                    className="border border-white/10 bg-white/3 px-2 py-1 font-mono text-[9.5px] text-white/70"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-5 space-y-2.5 border-t border-white/8 pt-4">
                            {GUARANTEES.map((item) => (
                                <div key={item} className="flex items-start gap-2.5">
                                    <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mint" />
                                    <span className="text-[12px] leading-5 text-haze/80">{item}</span>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
