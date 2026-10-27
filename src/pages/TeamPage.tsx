import { Link } from "react-router-dom";

export default function TeamPage() {
    return (
        <section className="min-h-screen bg-[#06100f] text-[#ecfbf5]">
            <div className="py-24 md:py-32">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="mb-12">
                        <p className="text-sm font-semibold tracking-[0.26em] text-[#8df8d2] uppercase mb-4">The Team</p>
                        <h1 className="text-5xl font-bold tracking-[-0.05em]">Meet the team behind EdgeMind</h1>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        {/* Dr. Sarah Chen */}
                        <div className="border rounded-2xl p-6 bg-[#0a1816] border-white/15 hover:bg-[#1a2a28] transition-colors">
                            <div className="w-20 h-20 rounded-full bg-[#8df8d2] flex items-center justify-center mb-4">
                                <span className="text-[#06100f] font-bold text-sm">SC</span>
                            </div>
                            <h3 className="text-xl font-medium mb-2">Dr. Sarah Chen</h3>
                            <p className="text-white/50 mb-3">Co-founder & Lead AI</p>
                            <p className="text-xs text-white/40">
                                PhD in Computer Science, Stanford. 10+ years experience in model compression and deployment on resource-constrained devices.
                            </p>
                            <div className="mt-4">
                                <Link href="https://linkedin.com/in/sarah-chen" className="text-[{#8df8d2}] hover:underline text-sm">LinkedIn</Link>
                                <Link href="https://twitter.com/sarahchen" className="text-[{#8df8d2}] hover:underline text-sm ml-3">Twitter</Link>
                            </div>
                        </div>

                        {/* Marcus Oppong -->
                        <div className="border rounded-2xl p-6 bg-[#0a1816] border-white/15 hover:bg-[#1a2a28] transition-colors">
                            <div className="w-20 h-20 rounded-full bg-[#8df8d2] flex items-center justify-center mb-4">
                                <span className="text-[#06100f] font-bold text-sm">MO</span>
                            </div>
                            <h3 className="text-xl font-medium mb-2">Marcus Oppong</h3>
                            <p className="text-white/50 mb-3">Embedded Systems Lead</p>
                            <p className="text-xs text-white/40">
                                Former IoT hardware engineer with experience deploying AI on embedded devices across automotive and industrial sectors.
                            </p>
                            <div className="mt-4">
                                <Link href="https://linkedin.com/in/marcus-oppong" className="text-[{#8df8d2}] hover:underline text-sm">LinkedIn</Link>
                            </div>
                        </div>-->

                        {/* Jamie Patel -->
                        <div className="border rounded-2xl p-6 bg-[#0a1816] border-white/15 hover:bg-[#1a2a28] transition-colors">
                            <div className="w-20 h-20 rounded-full bg-[#8df8d2] flex items-center justify-center mb-4">
                                <span className="text-[#06100f] font-bold text-sm">JP</span>
                            </div>
                            <h3 className="text-xl font-medium mb-2">Jamie Patel</h3>
                            <p className="text-white/50 mb-3">Developer Experience</p>
                            <p className="text-xs text-white/40">
                                Creator of developer-friendly tooling and documentation. Former developer advocate at a leading cloud AI platform.
                            </p>
                            <div className="mt-4">
                                <Link href="https://linkedin.com/in/jamie-patel" className="text-[{#8df8d2}] hover:underline text-sm">LinkedIn</Link>
                            </div>
                        </div>-->

                        {/* Alex Rivera -->
                        <div className="border rounded-2xl p-6 bg-[#0a1816] border-white/15 hover:bg-[#1a2a28] transition-colors">
                            <div className="w-20 h-20 rounded-full bg-[#8df8d2] flex items-center justify-center mb-4">
                                <span className="text-[#06100f] font-bold text-sm">AR</span>
                            </div>
                            <h3 className="text-xl font-medium mb-2">Alex Rivera</h3>
                            <p className="text-white/50 mb-3">Community Engineer</p>
                            <p className="text-xs text-white/40">
                                Leads the EdgeMind community, organizes meetups, and fosters open-source contributions for edge AI.
                            </p>
                            <div className="mt-4">
                                <Link href="https://linkedin.com/in/alex-rivera-edgemind" className="text-[{#8df8d2}] hover:underline text-sm">LinkedIn</Link>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </section>
    );
}