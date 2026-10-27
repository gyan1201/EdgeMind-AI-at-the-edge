import { children, Navigation, Outlet } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen bg-[#06100f] text-[#ecfbf5]">
            <Navigation className="hidden md:flex items-center gap-8 text-white/75" />
            <div className="py-8 px-6 md:px-10">
                {children}
            </div>
        </main>
    );
}