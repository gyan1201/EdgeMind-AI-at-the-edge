import { useState } from "react";
import { motion } from "framer-motion";

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

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

export default function App() {
    const [mode, setMode] = useState<Mode>("edge");
    const activeMode = modeCopy[mode];

    return (
        <main className="min-h-screen bg-[#06100f] text-[#ecfbf5]">
            {/* Hero Section */}
            <section className="relative min-h-screen overflow-hidden bg-[#06100f]">
                <img
                    src="/images/edgemind-edge-sensor.jpg"
                    alt="Compact AI sensor module mounted on industrial equipment"
                    className="animate-hero-drift absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,8,0.96)_0%,rgba(2,8,8,0.82)_35%,rgba(2,8,8,0.24)_72%,rgba(2,8,8,0.56)_100%)]" />
                
                <header className="absolute inset-x-0 top-0 z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-sm text-white/75 md:px-10">
                    <motion.a 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        href="#top" 
                        className="font-semibold tracking-[0.28em] text-white uppercase neon-text-mint"
                    >
                        EdgeMind
                    </motion.a>
                    <motion.nav 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hidden items-center gap-8 md:flex"
                    >
                        <a className="transition hover:text-white" href="#runtime">Runtime</a>
                        <a className="transition hover:text-white" href="#filtering">Filtering</a>
                        <a className="transition hover:text-white" href="#deploy">Deploy</a>
                    </motion.nav>
                </header>

                <div id="top" className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-28 md:px-10">
                    <motion.div 
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="max-w-3xl"
                    >
                        <motion.p variants={fadeUp} className="text-6xl font-semibold tracking-[-0.08em] text-white sm:text-8xl lg:text-9xl neon-text-mint">
                            EdgeMind
                        </motion.p>
                        <motion.h1 variants={fadeUp} className="mt-8 max-w-2xl text-3xl font-medium tracking-[-0.04em] text-white sm:text-5xl">
                            Lightweight AI where sensing starts.
                        </motion.h1>
                        <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
                            Software for running compact AI models directly on cameras, microphones, vibration probes, and environmental sensors so machines filter data in real time.
                        </motion.p>
                        <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="#pilot"
                                className="inline-flex items-center justify-center bg-[#8df8d2] px-6 py-4 text-sm font-semibold text-[#031412] transition hover:bg-white shadow-[0_0_20px_rgba(141,248,210,0.3)]"
                            >
                                Build a sensor pilot
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="#runtime"
                                className="glass-card inline-flex items-center justify-center border border-white/35 px-6 py-4 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
                            >
                                See the runtime
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Runtime Section */}
            <section id="runtime" className="relative bg-[#0a1816] px-6 py-24 text-[#ecfbf5] md:px-10 lg:py-32 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#8df8d2]/5 rounded-full blur-[120px] pointer-events-none" />
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="relative z-10 mx-auto max-w-7xl"
                >
                    <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
                        <motion.div variants={fadeUp}>
                            <p className="mb-5 text-sm font-semibold tracking-[0.26em] text-[#8df8d2] uppercase">Edge runtime</p>
                            <h2 className="max-w-xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
                                Inference without the cloud round trip.
                            </h2>
                        </motion.div>
                        <div className="pt-2 text-lg leading-8 text-white/70">
                            <motion.p variants={fadeUp}>
                                EdgeMind turns trained models into sensor-ready workloads. The runtime handles model packaging, stream processing, event thresholds, and fleet updates without forcing teams to rebuild their device stack.
                            </motion.p>
                            <div className="mt-12">
                                {capabilities.map((item, index) => (
                                    <motion.div 
                                        key={item.title} 
                                        variants={fadeUp}
                                        whileHover={{ x: 8, backgroundColor: "rgba(255,255,255,0.03)" }}
                                        className="grid gap-4 border-t border-white/15 py-7 sm:grid-cols-[0.45fr_0.55fr] transition-colors rounded-lg px-2 -mx-2"
                                    >
                                        <h3 className="text-xl font-semibold tracking-[-0.03em] text-white">{item.title}</h3>
                                        <p className="text-base leading-7 text-white/50">{item.body}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 border-y border-white/15 py-10">
                        <motion.div variants={staggerContainer} className="grid gap-8 md:grid-cols-4">
                            {pipeline.map((step, index) => (
                                <motion.div key={step} variants={fadeUp} className="relative group">
                                    <p className="text-sm font-semibold tracking-[0.2em] text-[#8df8d2] uppercase">0{index + 1}</p>
                                    <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] transition-colors group-hover:text-[#8df8d2]">{step}</p>
                                    {index < pipeline.length - 1 ? <div className="mt-7 hidden h-px bg-white/15 md:block" /> : null}
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Filtering Section with 3D Tilt Card */}
            <section id="filtering" className="relative overflow-hidden bg-[#06100f] px-6 py-24 text-[#ecfbf5] md:px-10 lg:py-32">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00F0FF]/5 rounded-full blur-[100px] pointer-events-none" />
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="relative z-10 mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center"
                >
                    <motion.div variants={fadeUp}>
                        <p className="mb-5 text-sm font-semibold tracking-[0.26em] text-[#8df8d2] uppercase">Real-time filtering</p>
                        <h2 className="max-w-xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
                            Move the first decision into the sensor.
                        </h2>
                        <p className="mt-7 max-w-xl text-lg leading-8 text-white/66">
                            EdgeMind keeps raw streams local and converts noisy telemetry into verified events. Teams see less duplicate data, shorter response loops, and clearer signals for downstream systems.
                        </p>
                    </motion.div>

                    <motion.div 
                        variants={fadeUp}
                        whileHover={{ scale: 1.02, rotateY: -2, rotateX: 2 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        style={{ perspective: 1000 }}
                        className="glass-card rounded-[2rem] p-5 sm:p-8"
                    >
                        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
                            <div>
                                <p className="text-sm font-semibold tracking-[0.22em] text-[#8df8d2] uppercase">Stream mode</p>
                                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">{activeMode.headline}</h3>
                            </div>
                            <div className="grid grid-cols-2 border border-white/15 text-sm font-semibold rounded-lg overflow-hidden bg-black/20">
                                {(["cloud", "edge"] as Mode[]).map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => setMode(item)}
                                        className={`px-4 py-3 transition-colors ${mode === item ? "bg-[#8df8d2] text-[#06100f]" : "text-white/70 hover:bg-white/10 hover:text-white"}`}
                                    >
                                        {modeCopy[item].label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <p className="mt-6 text-base leading-7 text-white/68 h-14">{activeMode.description}</p>

                        <div className="relative mt-8 h-56 overflow-hidden rounded-3xl bg-[#071a18] ring-1 ring-white/10 shadow-inner">
                            <div className="scan-line" />
                            <div className="absolute inset-x-6 bottom-8 flex h-36 items-end justify-between gap-2">
                                {packetHeights.map((height, index) => {
                                    const isEvent = index === 3 || index === 7 || index === 12 || index === 16;
                                    const visible = mode === "cloud" || isEvent;

                                    return (
                                        <motion.span
                                            layout
                                            initial={false}
                                            animate={{ 
                                                height: `${height}%`,
                                                opacity: visible ? 1 : 0.2,
                                                backgroundColor: visible ? (isEvent ? "#8df8d2" : "rgba(255,255,255,0.35)") : "rgba(255,255,255,0.1)"
                                            }}
                                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                            key={`${height}-${index}`}
                                            className="packet block w-full rounded-t-full"
                                            style={{ animationDelay: `${index * 90}ms` }}
                                        />
                                    );
                                })}
                            </div>
                            <div className="absolute left-6 top-6 flex items-center gap-3 text-sm text-white/70 backdrop-blur-sm bg-black/20 px-3 py-1.5 rounded-full border border-white/10">
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
                                    <motion.p 
                                        key={value}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-2 text-xl font-semibold tracking-[-0.03em] text-white"
                                    >
                                        {value}
                                    </motion.p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Deploy Section */}
            <section id="deploy" className="relative bg-[#0a1816] px-6 py-24 text-[#ecfbf5] md:px-10 lg:py-32">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="mx-auto max-w-7xl"
                >
                    <div className="max-w-3xl">
                        <motion.p variants={fadeUp} className="mb-5 text-sm font-semibold tracking-[0.26em] text-[#8df8d2] uppercase">Deployments</motion.p>
                        <motion.h2 variants={fadeUp} className="text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
                            Built for sensors that cannot wait.
                        </motion.h2>
                        <motion.p variants={fadeUp} className="mt-7 text-lg leading-8 text-white/60">
                            Use EdgeMind when bandwidth is scarce, privacy matters, or a decision needs to happen before a gateway or cloud service responds.
                        </motion.p>
                    </div>

                    <div className="mt-16 border-t border-white/15">
                        {deployments.map(([sensor, useCase, model]) => (
                            <motion.div 
                                variants={fadeUp}
                                whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.02)" }}
                                key={sensor} 
                                className="grid gap-5 border-b border-white/15 py-8 md:grid-cols-[0.8fr_1.1fr_1fr] md:items-center transition-colors rounded-xl px-4 -mx-4"
                            >
                                <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">{sensor}</h3>
                                <p className="text-white/60">{useCase}</p>
                                <p className="font-medium text-[#8df8d2]">{model}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Pilot Section */}
            <section id="pilot" className="bg-[#06100f] px-6 py-24 text-[#ecfbf5] md:px-10 lg:py-32">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="mx-auto grid max-w-7xl gap-12 border-t border-white/14 pt-14 lg:grid-cols-[1fr_0.8fr] lg:items-end"
                >
                    <motion.div variants={fadeUp}>
                        <p className="mb-5 text-sm font-semibold tracking-[0.26em] text-[#8df8d2] uppercase">Pilot program</p>
                        <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
                            Give your sensors enough intelligence to ignore the noise.
                        </h2>
                    </motion.div>
                    <motion.div variants={fadeUp}>
                        <p className="text-lg leading-8 text-white/66">
                            Bring an existing model or a raw sensor stream. EdgeMind helps profile the workload, package the runtime, and prove what can be filtered on device.
                        </p>
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="mailto:pilots@edgemind.ai"
                            className="mt-8 inline-flex items-center justify-center bg-[#8df8d2] px-6 py-4 text-sm font-semibold text-[#031412] transition hover:bg-white shadow-[0_0_15px_rgba(141,248,210,0.2)]"
                        >
                            pilots@edgemind.ai
                        </motion.a>
                    </motion.div>
                </motion.div>
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