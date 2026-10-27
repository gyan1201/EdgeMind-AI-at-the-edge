import { Link, useLocation } from "react-router-dom";

export default function AboutPage() {
    const location = useLocation();

    return (
        <section className="min-h-screen bg-[#06100f] text-[#ecfbf5]">
            <div className="relative py-24 md:py-32">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <p className="text-sm font-semibold tracking-[0.26em] text-[#8df8d2] uppercase mb-4">About EdgeMind</p>
                            <h1 className="text-5xl font-bold tracking-[-0.05em] mb-6 leading-tight">
                                AI at the edge, built for the real world.
                            </h1>
                            <p className="text-lg leading-8 text-white/60 mb-8">
                                EdgeMind was founded on the belief that intelligent machines should process data where it's generated. By running compact AI models directly on sensors, we enable real-time decision-making without the latency and cost of cloud round-trips.
                            </p>
                            <div className="space-y-4 text-white/70">
                                <div className="flex items-start">
                                    <span className="text-[#8df8d2] mr-3 flex-shrink-0 flex w-6 h-6 rounded-full bg-[#8df8d2] opacity-80 align-middle"></span>
                                    <div>
                                        <p className="font-medium">Founded</p>
                                        <p className="text-xs text-white/40">2024</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-[#8df8d2] mr-3 flex-shrink-0 flex w-6 h-6 rounded-full bg-[#8df8d2] opacity-80 align-middle"></span>
                                    <div>
                                        <p className="font-medium">Team Size</p>
                                        <p className="text-xs text-white/40">15+ engineers and researchers</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-[#8df8d2] mr-3 flex-shrink-0 flex w-6 h-6 rounded-full bg-[#8df8d2] opacity-80 align-middle"></span>
                                    <div>
                                        <p className="font-medium">Backed By</p>
                                        <p className="text-xs text-white/40">Early-stage venture partnership</p>
                                    </div>
                                </div>
                            </div>
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="mailto:hello@edgemind.ai"
                                className="mt-8 inline-flex items-center justify-center bg-[#8df8d2] px-6 py-4 text-sm font-semibold text-[#031412] transition hover:bg-white shadow-[0_0_15px_rgba(141,248,210,0.2)]"
                            >
                                hello@edgemind.ai
                            </motion.a>
                        </div>

                        <div className="relative flex justify-center items-center lg:col-span-1">
                            <div className="glass-card rounded-[2rem] p-8 sm:p-10 w-full max-w-md bg-black/30 backdrop-blur-sm border border-white/10">
                                <h2 className="text-2xl font-semibold tracking-[-0.04em] mb-6">The Team</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="border rounded-lg p-4 bg-[#0a1816]">
                                        <h3 className="font-medium mb-2">Lead AI</h3>
                                        <p className="text-xs text-white/50">Specializing in model compression and optimization</p>
                                    </div>
                                    <div className="border rounded-lg p-4 bg-[#0a1816]">
                                        <h3 className="font-medium mb-2">Embedded Engineering</h3>
                                        <p className="text-xs text-white/50">Expertise in running models on constrained devices</p>
                                    </div>
                                    <div className="border rounded-lg p-4 bg-[#0a1816]">
                                        <h3 className="font-medium mb-2">Developer Experience</h3>
                                        <p className="text-xs text-white/50">Focus on developer-friendly tooling and workflows</p>
                                    </div>
                                    <div className="border rounded-lg p-4 bg-[#0a1816]">
                                        <h3 className="font-medium mb-2">Community</h3>
                                        <p className="text-xs text-white/50">Building the edge AI community</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-24 bg-[#0a1816]">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <p className="text-5xl font-bold text-[#8df8d2]">10ms</p>
                            <p className="text-white/60 mt-2">Average latency</p>
                        </div>
                        <div>
                            <p className="text-5xl font-bold text-[#8df8d2]">90%</p>
                            <p className="text-white/60 mt-2">Bandwidth reduction</p>
                        </div>
                        <div>
                            <p className="text-5xl font-bold text-[#8df8d2]">50+</p>
                            <p className="text-white/60 mt-2">Supported sensors</p>
                        </div>
                        <div>
                            <p className="text-5xl font-bold text-[#8df8d2]">99.9%</p>
                            <p className="text-white/60 mt-2">Uptime guarantee</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}