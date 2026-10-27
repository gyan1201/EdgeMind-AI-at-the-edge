import { useState } from "react";
import { Link } from "react-router-dom";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setSuccess(true);
        setName("");
        setEmail("");
        setMessage("");
        setSubmitting(false);
    };

    return (
        <section className="min-h-screen bg-[#06100f] text-[#ecfbf5]">
            <div className="py-24 md:py-32">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="mb-12">
                        <p className="text-sm font-semibold tracking-[0.26em] text-[#8df8d2] uppercase mb-4">Contact</p>
                        <h1 className="text-5xl font-bold tracking-[-0.05em]">Get in Touch</h1>
                        <p className="text-lg leading-relaxed text-white/60">
                            Have a question about EdgeMind? Want to start a pilot program? 
                            Fill out the form and our team will get back to you within 24 hours.
                        </p>
                    </div>

                    {submitting ? (
                        <div className="bg-[#0a1816] border border-white/15 rounded-3xl p-8 text-center">
                            <p className="text-lg text-white/60">Sending your message...</p>
                            <div className="mt-4 animate-spin h-6 w-6 border-2 border-white/20 border-t-transparent rounded-full"></div>
                        </div>
                    ) : null}

                    <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2 max-w-2xl">
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-2">
                                Your Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Your Name"
                                className="block w-full rounded-lg p-4 bg-[#0a1816] focus:outline-none focus:border-[#8df8d2] transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="you@email.com"
                                className="block w-full rounded-lg p-4 bg-[#0a1816] focus:outline-none focus:border-[#8df8d2] transition-colors"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-white/60 mb-2">
                                Message
                            </label>
                            <textarea
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                placeholder="Tell us about your project, sensor setup, or questions about EdgeMind..."
                                rows={4}
                                className="block w-full rounded-lg p-4 bg-[#0a1816] focus:outline-none focus:border-[#8df8d2] transition-colors resize-none"
                            ></textarea>
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-[#8df8d2] py-3 px-6 text-sm font-semibold text-[#031412] hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? "Sending..." : "Send Message"}
                            </button>
                        </div>
                    </form>

                    <div className="mt-16 pt-16 border-t border-white/10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div>
                                <h4 className="font-medium mb-4 text-white">Quick Links</h4>
                                <ul className="space-y-3 text-white/60">
                                    <li>
                                        <a href="/" className="hover:text-[#8df8d2] transition">Home</a>
                                    </li>
                                    <li>
                                        <a href="/about" className="hover:text-[#8df8d2] transition">About</a>
                                    </li>
                                    <li>
                                        <a href="/docs" className="hover:text-[#8df8d2] transition">Docs</a>
                                    </li>
                                    <li>
                                        <a href="/pricing" className="hover:text-[#8df8d2] transition">Pricing</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-medium mb-4 text-white">Company</h4>
                                <ul className="space-y-3 text-white/60">
                                    <li>
                                        <a href="/team" className="hover:text-[#8df8d2] transition">Team</a>
                                    </li>
                                    <li>
                                        <a href="/blog" className="hover:text-[#8df8d2] transition">Blog</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-medium mb-4 text-white">Support</h4>
                                <ul className="space-y-3 text-white/60">
                                    <li>
                                        <a href="mailto:hello@edgemind.ai" className="hover:text-[#8df8d2] transition">hello@edgemind.ai</a>
                                    </li>
                                    <li>
                                        <a href="mailto:pilots@edgemind.ai" className="hover:text-[#8df8d2] transition">pilots@edgemind.ai</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-medium mb-4 text-white">Follow</h4>
                                <div className="flex gap-3">
                                    <a href="https://linkedin.com/company/edgemind" className="text-white/60 hover:text-[#8df8d2] transition flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border border-white/15">
                                        <svg className="h-4 w-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a5 5 0 11-10 0 5 5 0 0110 0zM12 14a4 4 0 100-8 4 4 0 000 8zM line 12 4h.01"/></svg>
                                    </a>
                                    <a href="https://twitter.com/edgemind_ai" className="text-white/60 hover:text-[#8df8d2] transition flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border border-white/15">
                                        <svg className="h-4 w-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.7 11a4.2 4.2 0 0 1-.5 3.2h5.4a4.2 4.2 0 0 1-.5 3.2h-5.4a4.2 4.2 0 0 1-1.4-2.1zM2.7 9a5.14 5.14 0 0 1 8.4 0 5.14 5.14 0 0 1-8.4 0zM4.8 11.6a4.13 4.13 0 0 1 1.3.9h6.1a4.13 4.13 0 0 1 1.3-.9zM17.3 2.1a5.3 5.3 0 0 1 .4 6.7h-2.6a5.3 5.3 0 0 1-.4-6.7h2.6zM2.7 15a5.12 5.12 0 0 1 8.4 0 5.12 5.12 0 0 1-8.4 0z"/></svg>
                                    </a>
                                    <a href="https://linkedin.com/company/edgemind" className="text-white/60 hover:text-[#8df8d2] transition flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border border-white/15">
                                        <svg className="h-4 w-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a5 5 0 11-10 0 5 5 0 0110 0zM12 14a4 4 0 100-8 4 4 0 000 8zM2.7 15a5.12 5.12 0 0 1 8.4 0 5.12 5.12 0 0 1-8.4 0z"/></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Map Section (placeholder) */}
        <div className="mt-24 bg-[#0a1816]">
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
                <div className="text-center">
                    <p className="text-sm font-semibold tracking-[0.26em] text-[#8df8d2] uppercase mb-4">Location</p>
                    <h2 className="text-5xl font-bold tracking-[-0.05em]">Edgar, Indiana</h2>
                    <p className="text-lg text-white/60">
                        Global operations with remote teams and sensor deployments worldwide.
                    </p>
                </div>
            </div>
        </div>
    );
}