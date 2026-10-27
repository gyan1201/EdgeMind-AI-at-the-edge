import { Link } from "react-router-dom";

export default function PricingPage() {
    return (
        <section className="min-h-screen bg-[#06100f] text-[#ecfbf5]">
            <div className="py-24 md:py-32">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="mb-12">
                        <p className="text-sm font-semibold tracking-[0.26em] text-[#8df8d2] uppercase mb-4">Pricing</p>
                        <h1 className="text-5xl font-bold tracking-[-0.05em]">Choose a plan</h1>
                        <p className="text-lg leading-relaxed text-white/60">
                            Select the plan that fits your deployment scale.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {/* Free Plan */}
                        <div className="border rounded-3xl p-8 bg-[#0a1816] border-white/15 hover:bg-[#1a2a28] transition-colors max-w-md">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-xs font-semibold tracking-[0.18em] text-white/42 uppercase">Free</span>
                                <span className="text-2xl font-bold text-[#8df8d2]">$0</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Community</h3>
                            <ul className="space-y-3 text-white/70">
                                <li>• Up to 10 devices</li>
                                <li>• Model quantization only</li>
                                <li>• Community support</li>
                                <li>• Email updates</li>
                            </ul>
                            <Link to="/pricing" className="mt-6 inline-flex items-center justify-center bg-[#8df8d2] px-4 py-2 text-sm font-semibold text-[#031412] transition">
                                Start Free
                            </Link>
                        </div>

                        {/* Pro Plan */}
                        <div className="border rounded-3xl p-8 bg-[#0a1816] border-[#8df8d2] hover:bg-[#1a2a28] transition-colors max-w-md">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-xs font-semibold tracking-[0.18em] text-white/42 uppercase">Pro</span>
                                <span className="text-2xl font-bold text-[#8df8d2]">$49/mo</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Professional</h3>
                            <ul className="space-y-3 text-white/70">
                                <li>• Unlimited devices</li>
                                <li>• Full model packaging</li>
                                <li>• Fleet management</li>
                                <li>• Priority support</li>
                                <li>• Analytics dashboard</li>
                            </ul>
                            <Link to="/pricing" className="mt-6 inline-flex items-center justify-center bg-[#8df8d2] px-4 py-2 text-sm font-semibold text-[#031412] transition">
                                Get Pro
                            </Link>
                        </div>

                        {/* Enterprise Plan */}
                        <div className="border rounded-3xl p-8 bg-[#0a1816] border-border-white/15 hover:bg-[#1a2a28] transition-colors max-w-md">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-xs font-semibold tracking-[0.18em] text-white/42 uppercase">Enterprise</span>
                                <span className="text-2xl font-bold">Custom</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Custom</h3>
                            <ul className="space-y-3 text-white/70">
                                <li>• Everything in Pro</li>
                                <li>• On-premise deployment</li>
                                <li>• SLA guarantees</li>
                                <li>• Dedicated support</li>
                                <li>• Custom integrations</li>
                            </ul>
                            <Link to="/pricing" className="mt-6 inline-flex items-center justify-center bg-[#8df8d2] px-4 py-2 text-sm font-semibold text-[#031412] transition">
                                Contact Sales
                            </Link>
                        </div>
                    </div>

                    <div className="mt-16 pt-16 border-t border-white/10">
                        <h2 className="text-2xl font-semibold mb-6">Compare plans</h2>
                        <p className="text-white/60 mb-8">
                            All plans include model quantization, edge runtime, and fleet-safe updates. Upgrade for priority support and advanced features.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="border rounded-lg p-4 bg-[#0a1816]">
                                <p className="text-sm font-medium">Free</p>
                                <p className="text-xs text-white/50">Getting started</p>
                            </div>
                            <div className="border rounded-lg p-4 bg-[#0a1816]">
                                <p className="text-sm font-medium">Pro</p>
                                <p className="text-xs text-white/50">Professional use</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}