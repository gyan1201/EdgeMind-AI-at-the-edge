import { Link } from "react-router-dom";

interface BlogPost {
    id: number;
    title: string;
    description: string;
    date: string;
    author: string;
    readTime: string;
    slug: string;
}

const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: "Running AI on the Edge: A Complete Guide",
        description: "How to deploy compact neural networks on constrained sensor devices.",
        date: "February 15, 2025",
        author: "Dr. Sarah Chen, Lead AI",
        readTime "8 min read",
        slug: "running-ai-on-edge-guide"
    },
    {
        id: 2,
        title: "Model Quantization Techniques for Edge Devices",
        description: "Comparing quantization methods to reduce model size without sacrificing accuracy.",
        date: "January 20, 2025",
        author: "Marcus Oppong, Embedded Lead",
        readTime "6 min read",
        slug: "model-quantization-techniques"
    },
    {
        id: 3,
        title: "Fleet Management Best Practices for Edge AI",
        description: "How to coordinate model updates across hundreds of distributed sensors.",
        date: "December 5, 2024",
        author: "Jamie Patel, Developer Experience",
        readTime "7 min read",
        slug: "fleet-management-best-practices"
    },
    {
        id: 4,
        title: "Real-Time Filtering: Reducing Bandwidth Costs by 90%",
        description: "Case study on how event-first processing transforms sensor networks.",
        date: "November 12, 2024",
        author: "Alex Rivera, Community Engineer",
        readTime "5 min read",
        slug: "real-time-filtering-bandwidth"
    },
];

export default function BlogPage() {
    return (
        <section className="min-h-screen bg-[#06100f] text-[#ecfbf5]">
            <div className="py-24 md:py-32">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="mb-12">
                        <p className="text-sm font-semibold tracking-[0.26em] text-[#8df8d2] uppercase mb-4">Blog</p>
                        <h1 className="text-5xl font-bold tracking-[-0.05em]">Insights from the Edge</h1>
                        <p className="text-lg leading-relaxed text-white/60">
                            Read our latest thoughts on edge AI, model optimization, and sensor intelligence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post) => (
                            <div
                                key={post.id}
                                className="border rounded-2xl p-6 bg-[#0a1816] border-white/15 hover:bg-[#1a2a28] transition-colors"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm text-white/50">{post.date}</span>
                                    <span className="text-xs font-semibold text-[#8df8d2] uppercase">{post.readTime}</span>
                                </div>
                                <h3 className="text-xl font-medium mb-3">{post.title}</h3>
                                <p className="text-white/60 line-clamp-3 mb-6">
                                    {post.description}
                                </p>
                                <div>
                                    <a
                                        href={`/blog/${post.slug}`}
                                        className="text-[{#8df8d2}] hover:underline text-sm"
                                    >
                                        Read more
                                    </a>
                                    <span className="mx-2 text-white/40">|</span>
                                    <a
                                        href={`mailto:hello@edgemind.ai?subject=Blog: ${post.title}`
                                        className="text-[{#8df8d2}] hover:underline text-sm"
                                    >
                                        Share
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 pt-16 border-t border-white/10">
                        <h2 className="text-2xl font-semibold mb-6">Subscribe for edge AI updates</h2>
                        <p className="text-white/60 mb-8">
                            Get our latest articles, case studies, and product updates delivered to your inbox.
                        </p>
                        <form className="max-w-md">
                            <div className="grid gap-4">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="border rounded-lg p-4 bg-[#0a1816] w-full focus:outline-none focus:border-[#8df8d2]"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-[#8df8d2] py-3 px-6 text-sm font-semibold text-[#031412] hover:bg-white transition"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}