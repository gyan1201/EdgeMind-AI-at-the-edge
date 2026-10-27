import { ArrowUpRight } from "./Icons";
import { CopyButton, Eyebrow, Reveal, StatusDot } from "./ui";

const STEPS = [
    { step: "01", title: "Send a stream", detail: "Ten minutes per class, raw and labelled." },
    { step: "02", title: "Bundle + bench", detail: "We quantize, sign, and measure on your target." },
    { step: "03", title: "Ring rollout", detail: "Canary to fleet with a gate at every ring." },
];

const BRIEF = [
    ["scope", "vibration → bearing wear"],
    ["model", "your checkpoint, or ours"],
    ["sample", "10 min / class · raw"],
    ["target", "1–4 device classes"],
    ["gate", "< 2 false forwards / shift"],
    ["timeline", "6 weeks to production"],
];

export default function Pilot() {
    return (
        <section id="pilot" className="relative border-t border-white/8 bg-ink-2/50 py-24 lg:py-28">
            <div className="shell">
                <Reveal>
                    <div className="relative overflow-hidden rounded-2xl border border-mint/20 bg-[linear-gradient(135deg,#08201b_0%,#071a16_45%,#061412_100%)]">
                        <div className="pointer-events-none absolute inset-0 dot-grid opacity-30" />
                        <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-mint/10 blur-[90px]" />
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-mint/50 to-transparent" />

                        <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:p-12">
                            <div className="flex flex-col justify-between">
                                <div>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <Eyebrow>Pilot program</Eyebrow>
                                        <span className="flex items-center gap-1.5 border border-mint/25 bg-mint/6 px-2 py-1 font-mono text-[8.5px] uppercase tracking-[0.12em] text-mint">
                                            <StatusDot />
                                            2 slots · q4
                                        </span>
                                    </div>

                                    <h2 className="mt-6 max-w-xl text-balance text-[clamp(2rem,3.9vw,3.15rem)] font-medium leading-[1.03] tracking-[-0.045em] text-white">
                                        Give your sensors enough intelligence to{" "}
                                        <span className="text-mint">ignore the noise.</span>
                                    </h2>

                                    <p className="mt-6 max-w-lg text-pretty text-[14.5px] leading-7 text-haze">
                                        Bring an existing model or a raw sensor stream. EdgeMind profiles the workload,
                                        packages the runtime, and proves what can be filtered on device before you
                                        commit the fleet.
                                    </p>
                                </div>

                                <div className="mt-9 flex flex-wrap items-center gap-3">
                                    <a
                                        href="mailto:pilots@edgemind.ai?subject=Sensor%20pilot%20brief&body=Sensor%3A%0ASample%20rate%3A%0AModel%3A%0ATarget%20device%3A"
                                        className="btn-primary"
                                    >
                                        pilots@edgemind.ai
                                        <ArrowUpRight className="h-4 w-4" />
                                    </a>
                                    <a href="#runtime" className="btn-ghost">
                                        Re-read the runtime
                                    </a>
                                </div>
                            </div>

                            <div className="flex flex-col justify-between gap-6 border border-white/10 bg-[#04110f]/80 p-5 backdrop-blur-sm">
                                <div>
                                    <div className="flex items-center justify-between border-b border-white/8 pb-3">
                                        <span className="field-label text-[8.5px]">pilot brief</span>
                                        <CopyButton
                                            value={BRIEF.map(([key, value]) => `${key}: ${value}`).join("\n")}
                                            label="Copy brief"
                                        />
                                    </div>
                                    <dl className="mt-1">
                                        {BRIEF.map(([key, value]) => (
                                            <div
                                                key={key}
                                                className="flex items-baseline justify-between gap-4 border-b border-white/5 py-2.5 last:border-b-0"
                                            >
                                                <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-haze/45">
                                                    {key}
                                                </dt>
                                                <dd className="text-right font-mono text-[10.5px] text-white/80">
                                                    {value}
                                                </dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>

                                <div className="grid grid-cols-3 gap-3 border-t border-white/8 pt-4">
                                    {STEPS.map((item) => (
                                        <div key={item.step}>
                                            <p className="font-mono text-[8.5px] tracking-[0.14em] text-mint/60">
                                                {item.step}
                                            </p>
                                            <p className="mt-1.5 text-[11.5px] font-medium text-white/85">{item.title}</p>
                                            <p className="mt-1 text-[10px] leading-4 text-haze/55">{item.detail}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
