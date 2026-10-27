import { Link } from "react-router-dom";

export default function DocsPage() {
    return (
        <section className="min-h-screen bg-[#06100f] text-[#ecfbf5]">
            <div className="py-24 md:py-32">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="mb-12">
                        <p className="text-sm font-semibold tracking-[0.26em] text-[#8df8d2] uppercase mb-4">Documentation</p>
                        <h1 className="text-5xl font-bold tracking-[-0.05em]">Getting Started</h1>
                        <p className="text-lg leading-relaxed text-white/60">
                            Get your first edge model running in minutes.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        <div>
                            <h2 className="text-2xl font-semibold mb-6">Quick Start</h2>
                            <ol className="list-decimal list-inside space-y-4 text-white/70">
                                <li>
                                    <p className="font-medium">Install EdgeMind CLI</p>
                                    <p className="mt-2 text-sm">npm install -g @edgemind/cli</p>
                                </li>
                                <li>
                                    <p className="font-medium">Initialize a project</p>
                                    <p className="mt-2 text-sm">edgemind init my-sensor</p>
                                </li>
                                <li>
                                    <p className="font-medium">Package your model</p>
                                    <p className="mt-2 text-sm">edgemind package model.tflite</p>
                                </li>
                                <li>
                                    <p className="font-medium">Deploy to device</p>
                                    <p className="mt-2 text-sm">edgemind deploy --device-id sensor-01</p>
                                </li>
                            </ol>
                        </endol>

                        <div>
                            <h2 className="text-2xl font-semibold mb-6">Guides</h2>
                            <ul className="space-y-4 text-white/70">
                                <li>
                                    <Link to="/docs/model-packaging" className="text-blue-500 hover:underline">
                                        Model Packaging Guide
                                    </Link>
                                    <p className="text-xs mt-1 text-white/40">Compress and quantize models for edge deployment</p>
                                </li>
                                <li>
                                    <Link to="/docs/stream-processing" className="text-blue-500 hover:underline">
                                        Stream Processing
                                    </Link>
                                    <p className="text-xs mt-1 text-white/40">Processing sensor data streams on device</p>
                                </li>
                                <li>
                                    <Link to="/docs/fleet-updates" className="text-blue-500 hover:underline">
                                        Fleet-Safe Updates
                                    </Link>
                                    <p className="text-xs mt-1 text-white/40"> staged rollouts and rollback</p>
                                </li>
                                <li>
                                    <Link to="/docs/api-reference" className="text-blue-500 hover:underline">
                                        API Reference
                                    </Link>
                                    <p className="text-xs mt-1 text-white/40">CLI and runtime API</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-16 pt-16 border-t border-white/10">
                        <h2 className="text-2xl font-semibold mb-6">SDKs</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="border rounded-lg p-4 bg-[#0a1816] hover:bg-[#1a2a28] transition-colors">
                                <h3 className="font-medium mb-2">Python SDK</h3>
                                <p className="text-xs text-white/50">pip install edgemind-sdk</p>
                            </div>
                            <div className="border rounded-lg p-4 bg-[#0a1816] hover:bg-[#1a2a28] transition-colors">
                                <h3 className="font-medium mb-2">Node.js SDK</h3>
                                <p className="text-xs text-white/50">npm i @edgemind/sdk</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}