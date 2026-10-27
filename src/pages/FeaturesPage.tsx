import { Link } from "react-router-dom";

interface FeatureCategory {
    id: number;
    title: string;
    description: string;
    icon: string;
    features: Feature[];
}

interface Feature {
    title: string;
    body: string;
    icon?: string;
}

const featureCategories: FeatureCategory[] = [
    {
        id: 1,
        title: "Tiny Model Packaging",
        description: "Compress, quantize, and ship neural networks that fit on constrained sensor memory.",
        icon: "📦",
        features: [
            {
                title: "Model Compression",
                body: "Reduce model size by 70-90% while maintaining accuracy through pruning and quantization techniques."
            },
            {
                title: "Format Conversion",
                body: "Convert models between TensorFlow, PyTorch, ONNX, and TensorRT formats for edge compatibility."
            },
            {
                title: "Hardware Optimization",
                body: "Auto-tune models for specific edge hardware: ARM Cortex, RISC-V, Google Coral, NVIDIA Jetson."
            },
            {
                title: "One-Click Packaging",
                body: "Generate ready-to-deploy bundles with a single command: `edgemind package model.tflite`."
            }
        ]
    },
    {
        id: 2,
        title: "Local Signal Decisions",
        description: "Classify vibration, audio, image, and environmental signals in milliseconds on device.",
        icon: "🤖",
        features: [
            {
                title: "On-Device Inference",
                body: "Millisecond-level scoring of sensor streams without cloud round-trip latency."
            },
            {
                title: "Multi-Modal Support",
                body: "Process vibration, audio, image, and environmental sensor data through dedicated pipelines."
            },
            {
                title: "Threshold Configuration",
                body: "Configurable anomaly thresholds per sensor type with real-time tuning capabilities."
            },
            {
                title: "Zero-Latency Decisions",
                body: "Critical decisions (stop machine, raise alarm, redirect flow) happen instantly on device."
            }
        ]
    },
    {
        id: 3,
        title: "Event-First Networking",
        description: "Forward only verified events, anomaly windows, and metadata instead of continuous raw streams.",
        icon: "📡",
        features: [
            {
                title: "Stream Scoring",
                body: "Every moment of sensor data scored locally; only meaningful events transmitted."
            },
            {
                title: "Bandwidth Reduction",
                body: "90%+ reduction in data transmitted; from 18.4 MB/min to 1.6 MB/min typical."
            },
            {
                title: "Anomaly Windows",
                body: "Package noisy telemetry into verified event clusters for downstream processing."
            },
            {
                title: "Metadata Extraction",
                body: "Extract only essential metadata (timestamp, sensor ID, confidence score) per event."
            }
        ]
    },
    {
        id: 4,
        title: "Fleet-Safe Updates",
        description: "Roll out new models with signed bundles, staged releases, and rollback controls.",
        icon: "🚀",
        features: [
            {
                title: "Signed Model Bundles",
                body: "Every model update cryptographically signed; devices reject tampered or unsigned packages."
            },
            {
                title: "Staged Rollouts",
                body: "Deploy to 1% of fleet first, monitor, then expand to 100% with automatic rollback on failure."
            },
            {
                title: "Over-the-Air Updates",
                body: "Push new models, config changes, and threshold updates to thousands of devices simultaneously."
            },
            {
                title: "Rollback Controls",
                body: "Instant revert to previous model version if deployment issues detected; zero downtime guaranteed."
            }
        ]
    },
    {
        id: 5,
        title: "Edge Runtime",
        icon: "⚡",
        features: [
            {
                title: "Model Packaging",
                body: "Compress, quantize, and ship neural networks that fit on constrained sensor memory."
            },
            {
                title: "Local Signal Decisions",
                body: "Classify vibration, audio, image, and environmental signals in milliseconds on device."
            },
            {
                title: "Event-First Networking",
                body: "Forward only verified events, anomaly windows, and metadata instead of continuous raw streams."
            },
            {
                title: "Fleet-Safe Updates",
                body: "Roll out new models with signed bundles, staged releases, and rollback controls."
            }
        ]
    }
];

export default function FeaturesPage() {
    return (
        <section className="min-h-screen bg-[#06100f] text-[#ecfbf5]">
            <div className="py-24 md:py-32">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="mb-12">
                        <p className="text-sm font-semibold tracking-[0.26em] text-[#8df8d2] uppercase mb-4">Capabilities</p>
                        <h1 className="text-5xl font-bold tracking-[-0.05em]">EdgeMind Features</h1>
                        <p className="text-lg leading-relaxed text-white/60">
                            Comprehensive capability suite for running compact AI models directly on sensors.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {featureCategories.map((category) => (
                            <div
                                key={category.id}
                                className="border rounded-2xl p-6 bg-[#0a1816] border-white/15 hover:bg-[#1a2a28] transition-colors"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-3xl">{category.icon}</span>
                                    <h3 className="text-xl font-medium">{category.title}</h3>
                                </div>
                                <p className="text-white/60 text-sm mb-6 line-clamp-2">
                                    {category.description}
                                </p>
                                <ul className="space-y-3 text-white/60">
                                    {category.features.map((feature) => (
                                        <li key={feature.title} className="flex items-start">
                                            <span className="text-[#8df8d2] mr-3 flex-shrink-0">●</span>
                                            <div>
                                                <p className="font-medium">{feature.title}</p>
                                                <p className="text-xs">{feature.body}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 pt-16 border-t border-white/10">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="font-medium mb-4 text-white">How It Works</h3>
                                <ol className="list-decimal list-inside space-y-4 text-white/60">
                                    <li>
                                        <p className="font-medium">Package</p>
                                        <p>Compress and quantify your trained model for edge deployment.</p>
                                    </li>
                                    <li>
                                        <p className="font-medium">Deploy</p>
                                        <p>Push the packaged model to your fleet of sensors.</p>
                                    </li>
                                    <li>
                                        <p className="font-medium">Filter</p>
                                        <p>Edge device scores stream locally and forwards only verified events.</p>
                                    </li>
                                    <li>
                                        <p className="font-medium">Update</p>
                                        <p>Staged rollouts with signed bundles and rollback controls.</p>
                                    </li>
                                </ol>
                            </div>
                            <div>
                                <h3 className="font-medium mb-4 text-white">Industries</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="border rounded-lg p-4 bg-[#0a1816] hover:bg-[#1a2a28] transition-colors">
                                        <p className="font-medium text-[#8df8d2]">Industrial</p>
                                        <p className="text-xs text-white/50">Vibration, acoustic, environmental monitoring</p>
                                    </div>
                                    <div className="border rounded-lg p-4 bg-[#0a1816] hover:bg-[#1a2a28] transition-colors">
                                        <p className="font-medium text-[#8df8d2]">Automotive</p>
                                        <p className="text-xs text-white/50">LiDAR processing, driver monitoring, fleet tracking</p>
                                    </div>
                                    <div className="border rounded-lg p-4 bg-[#0a1816] hover:bg-[#1a2a28] transition-colors">
                                        <p className="font-medium text-[#8df8d2]">Healthcare</p>
                                        <p className="text-xs text-white/50">Patient monitoring, equipment diagnosis, drug delivery</p>
                                    </div>
                                    <div className="border rounded-lg p-4 bg-[#0a1816] hover:bg-[#1a2a28] transition-colors">
                                        <p className="font-medium text-[#8df8d2]">Smart Cities</p>
                                        <p className="text-xs text-white/50">Traffic monitoring, environmental sensing, public safety</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-[#0a1816] py-24 md:py-32">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="text-sm font-semibold tracking-[0.26em] text-[#8df8d2] uppercase mb-4">Ready to Get Started?</p>
                            <h2 className="text-4xl font-bold tracking-[-0.05em]">Put Edge AI on Your Sensors Today</h2>
                            <p className="text-lg text-white/60 mb-6">
                                Join the early access program and deploy compact models on your sensor fleet in minutes.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="/contact" className="bg-[#8df8d2] py-3 px-6 text-sm font-semibold text-[#031412] hover:bg-white transition">
                                    Contact Sales
                                </a>
                                <a href="https://github.com/gyan1201/EdgeMind-AI-at-the-edge/blob/main/README.md" className="border border-white/15 py-3 px-6 text-sm font-semibold text-white hover:border-[#8df8d2] transition">
                                    GitHub Repo
                                </a>
                            </div>
                        </div>
                        <div className="lg:col-span-1">
                            <div className="border rounded-2xl p-6 bg-[#06100f] border-white/15">
                                <h4 className="font-medium mb-4 text-white">Quick Stats</h4>
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <p className="text-3xl font-bold text-[#8df8d2]">10ms</p>
                                        <p className="text-xs text-white/50">Latency</p>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-[#8df8d2]">90%</p>
                                        <p className="text-xs text-white/50">Bandwidth Reduction</p>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-[#8df8d2]">50+</p>
                                        <p className="text-xs text-white/50">Sensor Types</p>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-[#8df8d2]">99.9%</p>
                                        <p className="text-xs text-white/50">Uptime</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}