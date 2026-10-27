import { TICKER } from "@/lib/data";

export default function Ticker() {
    const items = [...TICKER, ...TICKER];

    return (
        <div className="relative overflow-hidden border-y border-white/8 bg-ink-2/60 py-3.5">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
            <div aria-hidden className="animate-marquee flex w-max items-center gap-10 hover:[animation-play-state:paused]">
                {items.map((item, index) => (
                    <div key={`${item}-${index}`} className="flex items-center gap-10">
                        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-haze/70 whitespace-nowrap">
                            {item}
                        </span>
                        <span aria-hidden className="h-1 w-1 rotate-45 bg-mint/40" />
                    </div>
                ))}
            </div>
        </div>
    );
}
