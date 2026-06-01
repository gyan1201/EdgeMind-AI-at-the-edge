import { useState } from "react";

type Mode = "cloud" | "edge";

const capabilities = [
    {
        title: "Tiny model packaging",
        body: "Compress, quantize, and ship neural networks that fit on constrained sensor memory.",
    },
    {
        title: "Local signal decisions",
        body: "Classify vibration, audio, image, and environmental signals in milliseconds on device.",
    },
    {
        title: "Event-first networking",
        body: "Forward only verified events, anomaly windows, and metadata instead of continuous raw streams.",
    },
    {
        title: "Fleet-safe updates",
        body: "Roll out new models with signed bundles, staged releases, and rollback controls.",
    },
];

const pipeline = ["Sense", "Infer", "Filter", "Forward"];

const deployments = [
    ["Machine vibration", "Bearing wear, cavitation, imbalance", "1D CNN or anomaly model"],
    ["Acoustic sensing", "Leaks, defects, occupancy cues", "Keyword and spectrogram models"],
    ["Low-power vision", "Presence, quality checks, safety zones", "Quantized object detectors"],
    ["Environmental nodes", "Air, heat, pressure, and motion alerts", "Sensor fusion classifiers"],
];

const modeCopy = {
    cloud: {
        label: "Raw relay",
        headline: "Every packet leaves the sensor.",
        description: "Useful signals and background noise travel together, increasing bandwidth, storage, and review time.",
        bandwidth: "18.4 MB/min",
        latency: "900 ms",
        noise: "76%",
        decision: "Delayed",
    },
    edge: {
        label: "EdgeMind filter",
        headline: "Only meaningful events leave the sensor.",
        description: "A compact model scores the stream locally and forwards the moments that need action.",
        bandwidth: "1.6 MB/min",
        latency: "34 ms",
        noise: "8%",
        decision: "Immediate",
    },
};

const packetHeights = [44, 72, 26, 88, 39, 66, 51, 94, 30, 58, 79, 34, 90, 48, 62, 28, 83, 36, 67, 52];

export default function App() {
    const [mode, setMode] = useState<Mode>("edge");
    const activeMode = modeCopy[mode];

    return (
        <main className="min-h-screen bg-[#06100f] text-[#ecfbf5]">
            <section className="relative min-h-screen overflow-hidden bg-[#06100f]">
                <img
                    src="/images/edgemind-edge-sensor.jpg"
                    alt="Compact AI sensor module mounted on industrial equipment"
                    className="animate-hero-drift absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,8,0.96)_0%,rgba(2,8,8,0.82)_35%,rgba(2,8,8,0.24)_72%,rgba(2,8,8,0.56)_100%)]" />
                <header className="reveal absolute inset-x-0 top-0 z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-sm text-white/75 md:px-10">
                    <a href="#top" className="font-semibold tracking-[0.28em] text-white uppercase">
                        EdgeMind
                    </a>
                    <nav className="hidden items-center gap-8 md:flex">
                        <a className="transition hover:text-white" href="#runtime">
                            Runtime
                        </a>
                        <a className="transition hover:text-white" href="#filtering">
                            Filtering
                        </a>
                        <a className="transition hover:text-white" href="#deploy">
                            Deploy
                        </a>
                    </nav>
                </header>

                <div id="top" className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-28 md:px-10">
                    <div className="max-w-3xl">
                        <p className="reveal text-6xl font-semibold tracking-[-0.08em] text-white sm:text-8xl lg:text-9xl">
                            EdgeMind
                        </p>
                        <h1 className="reveal delay-1 mt-8 max-w-2xl text-3xl font-medium tracking-[-0.04em] text-white sm:text-5xl">
                            Lightweight AI where sensing starts.
                        </h1>
                        <p className="reveal delay-2 mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
                            Software for running compact AI models directly on cameras, microphones, vibration probes, and environmental sensors so machines filter data in real time.
                        </p>
                        <div className="reveal delay-3 mt-10 flex flex-col gap-4 sm:flex-row">
                            <a
                                href="#pilot"
                                className="inline-flex items-center justify-center bg-[#8df8d2] px-6 py-4 text-sm font-semibold text-[#031412] transition hover:bg-white"
                            >
                                Build a sensor pilot
                            </a>
                            <a
                                href="#runtime"
                                className="inline-flex items-center justify-center border border-white/35 px-6 py-4 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
                            >
                                See the runtime
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section id="runtime" className="bg-[#edf7f4] px-6 py-24 text-[#06100f] md:px-10 lg:py-32">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
                        <div>
                            <p className="mb-5 text-sm font-semibold tracking-[0.26em] text-[#117c68] uppercase">Edge runtime</p>
                            <h2 className="max-w-xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
                                Inference without the cloud round trip.
                            </h2>
                        </div>
                        <div className="pt-2 text-lg leading-8 text-[#31413d]">
                            <p>
                                EdgeMind turns trained models into sensor-ready workloads. The runtime handles model packaging, stream processing, event thresholds, and fleet updates without forcing teams to rebuild their device stack.
                            </p>
                            <div className="mt-12">
                                {capabilities.map((item) => (
                                    <div key={item.title} className="grid gap-4 border-t border-[#adc6bd] py-7 sm:grid-cols-[0.45fr_0.55fr]">
                                        <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#06100f]">{item.title}</h3>
                                        <p className="text-base leading-7 text-[#4a5a56]">{item.body}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 border-y border-[#adc6bd] py-10">
                        <div className="grid gap-8 md:grid-cols-4">
                            {pipeline.map((step, index) => (
                                <div key={step} className="relative">
                                    <p className="text-sm font-semibold tracking-[0.2em] text-[#117c68] uppercase">0{index + 1}</p>
                                    <p className="mt-4 text-3xl font-semibold tracking-[-0.04em]">{step}</p>
                                    {index < pipeline.length - 1 ? <div className="mt-7 hidden h-px bg-[#74ad9d] md:block" /> : null}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="filtering" className="overflow-hidden bg-[#06100f] px-6 py-24 text-[#ecfbf5] md:px-10 lg:py-32">
                <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                    <div>
                        <p className="mb-5 text-sm font-semibold tracking-[0.26em] text-[#8df8d2] uppercase">Real-time filtering</p>
                        <h2 className="max-w-xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
                            Move the first decision into the sensor.
                        </h2>
                        <p className="mt-7 max-w-xl text-lg leading-8 text-white/66">
                            EdgeMind keeps raw streams local and converts noisy telemetry into verified events. Teams see less duplicate data, shorter response loops, and clearer signals for downstream systems.
                        </p>
                    </div>

                    <div className="rounded-[2rem] border border-white/12 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 sm:p-8">
                        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
                            <div>
                                <p className="text-sm font-semibold tracking-[0.22em] text-[#8df8d2] uppercase">Stream mode</p>
                                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">{activeMode.headline}</h3>
                            </div>
                            <div className="grid grid-cols-2 border border-white/15 text-sm font-semibold">
                                {(["cloud", "edge"] as Mode[]).map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => setMode(item)}
                                        className={`px-4 py-3 transition ${mode === item ? "bg-[#8df8d2] text-[#06100f]" : "text-white/70 hover:bg-white/10 hover:text-white"}`}
                                    >
                                        {modeCopy[item].label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <p className="mt-6 text-base leading-7 text-white/68">{activeMode.description}</p>

                        <div className="relative mt-8 h-56 overflow-hidden rounded-3xl bg-[#071a18] ring-1 ring-white/10">
                            <div className="scan-line" />
                            <div className="absolute inset-x-6 bottom-8 flex h-36 items-end justify-between gap-2">
                                {packetHeights.map((height, index) => {
                                    const isEvent = index === 3 || index === 7 || index === 12 || index === 16;
                                    const visible = mode === "cloud" || isEvent;

                                    return (
                                        <span
                                            key={`${height}-${index}`}
                                            className={`packet block w-full rounded-t-full transition-all duration-500 ${visible ? (isEvent ? "bg-[#8df8d2]" : "bg-white/35") : "bg-white/10 opacity-20"}`}
                                            style={{ height: `${height}%`, animationDelay: `${index * 90}ms` }}
                                        />
                                    );
                                })}
                            </div>
                            <div className="absolute left-6 top-6 flex items-center gap-3 text-sm text-white/70">
                                <span className="signal-dot h-3 w-3 rounded-full bg-[#8df8d2]" />
                                Local model scoring live stream
                            </div>
                        </div>

                        <div className="mt-8 grid gap-5 sm:grid-cols-4">
                            {[
                                ["Bandwidth", activeMode.bandwidth],
                                ["Latency", activeMode.latency],
                                ["Noise", activeMode.noise],
                                ["Decision", activeMode.decision],
                            ].map(([label, value]) => (
                                <div key={label} className="border-t border-white/12 pt-4">
                                    <p className="text-xs font-semibold tracking-[0.18em] text-white/42 uppercase">{label}</p>
                                    <p className="mt-2 text-xl font-semibold tracking-[-0.03em] text-white">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="deploy" className="bg-[#edf7f4] px-6 py-24 text-[#06100f] md:px-10 lg:py-32">
                <div className="mx-auto max-w-7xl">
                    <div className="max-w-3xl">
                        <p className="mb-5 text-sm font-semibold tracking-[0.26em] text-[#117c68] uppercase">Deployments</p>
                        <h2 className="text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
                            Built for sensors that cannot wait.
                        </h2>
                        <p className="mt-7 text-lg leading-8 text-[#40504c]">
                            Use EdgeMind when bandwidth is scarce, privacy matters, or a decision needs to happen before a gateway or cloud service responds.
                        </p>
                    </div>

                    <div className="mt-16 border-t border-[#adc6bd]">
                        {deployments.map(([sensor, useCase, model]) => (
                            <div key={sensor} className="grid gap-5 border-b border-[#adc6bd] py-8 md:grid-cols-[0.8fr_1.1fr_1fr] md:items-center">
                                <h3 className="text-2xl font-semibold tracking-[-0.04em]">{sensor}</h3>
                                <p className="text-[#40504c]">{useCase}</p>
                                <p className="font-medium text-[#117c68]">{model}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="pilot" className="bg-[#06100f] px-6 py-24 text-[#ecfbf5] md:px-10 lg:py-32">
                <div className="mx-auto grid max-w-7xl gap-12 border-t border-white/14 pt-14 lg:grid-cols-[1fr_0.8fr] lg:items-end">
                    <div>
                        <p className="mb-5 text-sm font-semibold tracking-[0.26em] text-[#8df8d2] uppercase">Pilot program</p>
                        <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
                            Give your sensors enough intelligence to ignore the noise.
                        </h2>
                    </div>
                    <div>
                        <p className="text-lg leading-8 text-white/66">
                            Bring an existing model or a raw sensor stream. EdgeMind helps profile the workload, package the runtime, and prove what can be filtered on device.
                        </p>
                        <a
                            href="mailto:pilots@edgemind.ai"
                            className="mt-8 inline-flex items-center justify-center bg-[#8df8d2] px-6 py-4 text-sm font-semibold text-[#031412] transition hover:bg-white"
                        >
                            pilots@edgemind.ai
                        </a>
                    </div>
                </div>
            </section>

            <footer className="border-t border-white/10 bg-[#06100f] px-6 py-8 text-sm text-white/45 md:px-10">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p>EdgeMind - AI at the edge.</p>
                    <p>Software for real-time sensor intelligence.</p>
                </div>
            </footer>
        </main>
    );
}