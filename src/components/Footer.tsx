import { ArrowUpRight } from "./Icons";
import { StatusDot } from "./ui";

const COLUMNS = [
    {
        title: "Platform",
        links: [
            { label: "Runtime", href: "#runtime" },
            { label: "Packaging", href: "#packaging" },
            { label: "Signals", href: "#signals" },
        ],
    },
    {
        title: "Operations",
        links: [
            { label: "Networking", href: "#networking" },
            { label: "Fleet updates", href: "#fleet" },
            { label: "Deployments", href: "#deploy" },
        ],
    },
    {
        title: "Reference",
        links: [
            { label: "Workload manifest", href: "#deploy" },
            { label: "Event envelope", href: "#networking" },
            { label: "Pilot program", href: "#pilot" },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="relative border-t border-white/8 bg-ink">
            <div className="shell py-14">
                <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center border border-mint/30">
                                <svg viewBox="0 0 24 24" className="h-5 w-5 text-mint" fill="none" aria-hidden>
                                    <path
                                        d="M4 13.2h3.6l1.6-4.6 2.6 9 2-5.8 1.4 2.6H20"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                            <div>
                                <p className="text-[15px] font-semibold text-white">EdgeMind</p>
                                <p className="font-mono text-[8.5px] uppercase tracking-[0.24em] text-haze/60">
                                    ai at the edge
                                </p>
                            </div>
                        </div>
                        <p className="mt-5 max-w-sm text-[13px] leading-6 text-haze/70">
                            Software for real-time sensor intelligence. Package the model, decide on device, forward
                            the event, update the fleet.
                        </p>
                        <div className="mt-5 flex flex-wrap items-center gap-4 font-mono text-[9px] uppercase tracking-[0.14em] text-haze/50">
                            <span className="flex items-center gap-1.5">
                                <StatusDot />
                                all systems nominal
                            </span>
                            <span className="text-white/15">|</span>
                            <span>runtime 3.4.0</span>
                            <span className="text-white/15">|</span>
                            <span>fleet 1,200 nodes</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                        {COLUMNS.map((column) => (
                            <div key={column.title}>
                                <p className="field-label text-[8.5px]">{column.title}</p>
                                <ul className="mt-3.5 space-y-2.5">
                                    {column.links.map((link) => (
                                        <li key={link.label}>
                                            <a
                                                href={link.href}
                                                className="text-[12px] text-haze/70 transition-colors hover:text-mint"
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 flex flex-col gap-3 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-haze/50">
                        © 2026 EdgeMind · AI at the edge
                    </p>
                    <div className="flex flex-wrap items-center gap-5">
                        <a
                            href="mailto:pilots@edgemind.ai"
                            className="font-mono text-[9px] uppercase tracking-[0.14em] text-haze/50 transition-colors hover:text-white"
                        >
                            pilots@edgemind.ai
                        </a>
                        <a
                            href="https://github.com/gyan1201/EdgeMind-AI-at-the-edge"
                            target="_blank"
                            rel="noreferrer"
                            className="group flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-haze/50 transition-colors hover:text-white"
                        >
                            source
                            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
