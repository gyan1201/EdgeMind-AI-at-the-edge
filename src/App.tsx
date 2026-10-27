import Deployments from "./components/Deployments";
import Fleet from "./components/Fleet";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Networking from "./components/Networking";
import Packaging from "./components/Packaging";
import Pilot from "./components/Pilot";
import Runtime from "./components/Runtime";
import Signals from "./components/Signals";

export default function App() {
    return (
        <div className="min-h-screen bg-ink text-[#e9f7f2]">
            <a
                href="#runtime"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-mint focus:px-4 focus:py-2 focus:text-[12px] focus:font-semibold focus:text-ink"
            >
                Skip to content
            </a>
            <Nav />
            <main>
                <Hero />
                <Runtime />
                <Packaging />
                <Signals />
                <Networking />
                <Fleet />
                <Deployments />
                <Pilot />
            </main>
            <Footer />
        </div>
    );
}
