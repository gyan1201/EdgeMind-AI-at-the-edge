import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { ArrowUpRight, CloseIcon, MenuIcon } from "./Icons";
import { StatusDot } from "./ui";

const LINKS = [
    { label: "Runtime", href: "#runtime" },
    { label: "Packaging", href: "#packaging" },
    { label: "Signals", href: "#signals" },
    { label: "Networking", href: "#networking" },
    { label: "Fleet", href: "#fleet" },
];

function Mark({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden>
            <rect x="1.2" y="1.2" width="29.6" height="29.6" rx="7" stroke="currentColor" strokeOpacity="0.32" />
            <rect x="6.2" y="6.2" width="19.6" height="19.6" rx="4" stroke="currentColor" strokeOpacity="0.55" />
            <path
                d="M8.4 16.4h3.1l1.9-5.2 2.9 9.9 2.1-6.2 1.3 2.4h2.9"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState<string>("");

    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 16);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const sections = LINKS.map((link) => document.querySelector(link.href)).filter(
            (el): el is Element => Boolean(el)
        );
        if (!sections.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(`#${entry.target.id}`);
                });
            },
            { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            <motion.div
                style={{ scaleX: progress }}
                className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-mint/40 via-mint to-ice"
            />

            <header
                className={cn(
                    "fixed inset-x-0 top-0 z-50 transition-all duration-300",
                    scrolled
                        ? "border-b border-white/8 bg-ink/80 backdrop-blur-xl"
                        : "border-b border-transparent bg-transparent"
                )}
            >
                <div className="shell flex h-[68px] items-center justify-between gap-6">
                    <a href="#top" className="group flex items-center gap-3" aria-label="EdgeMind home">
                        <span className="text-mint transition-transform duration-500 group-hover:rotate-90">
                            <Mark className="h-8 w-8" />
                        </span>
                        <span className="flex flex-col leading-none">
                            <span className="text-[15px] font-semibold tracking-[-0.01em] text-white">EdgeMind</span>
                            <span className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.28em] text-haze/70">
                                ai at the edge
                            </span>
                        </span>
                    </a>

                    <nav className="hidden items-center gap-1 lg:flex" aria-label="Sections">
                        {LINKS.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "relative rounded-md px-3 py-2 text-[12.5px] font-medium transition-colors",
                                    active === link.href
                                        ? "text-white"
                                        : "text-haze hover:text-white"
                                )}
                            >
                                {link.label}
                                {active === link.href ? (
                                    <motion.span
                                        layoutId="nav-active"
                                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                        className="absolute inset-x-2.5 -bottom-[1px] h-px bg-mint"
                                    />
                                ) : null}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <span className="hidden items-center gap-2 border border-white/10 bg-white/2 px-2.5 py-1.5 xl:flex">
                            <StatusDot />
                            <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-haze">
                                runtime 3.4.0
                            </span>
                        </span>
                        <a href="#pilot" className="btn-primary hidden px-4 py-2.5 text-[12px] sm:inline-flex">
                            Build a pilot
                            <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                        <button
                            type="button"
                            aria-label={open ? "Close menu" : "Open menu"}
                            aria-expanded={open}
                            onClick={() => setOpen((value) => !value)}
                            className="flex h-10 w-10 items-center justify-center rounded-md border border-white/12 text-white/80 transition-colors hover:border-mint/50 hover:text-white lg:hidden"
                        >
                            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {open ? (
                        <motion.div
                            key="mobile-menu"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden border-t border-white/8 bg-ink/95 backdrop-blur-xl lg:hidden"
                        >
                            <div className="shell flex flex-col py-4">
                                {LINKS.map((link, index) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setOpen(false)}
                                        className="flex items-center justify-between border-b border-white/6 py-3.5 text-[15px] text-white/85"
                                    >
                                        <span>{link.label}</span>
                                        <span className="font-mono text-[10px] tracking-[0.2em] text-haze/50">
                                            0{index + 1}
                                        </span>
                                    </a>
                                ))}
                                <a
                                    href="#pilot"
                                    onClick={() => setOpen(false)}
                                    className="btn-primary mt-4 w-full"
                                >
                                    Build a sensor pilot
                                    <ArrowUpRight className="h-4 w-4" />
                                </a>
                            </div>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </header>
        </>
    );
}
