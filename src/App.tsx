import { useState, useCallback, useEffect } from "react";
import "./App.scss";
import Resume from "./pages/Resume/Resume";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./pages/Contact/Contact";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound/NotFound";
import LoadingScreen from "./components/LoadingScreen";
import { COMPANY_CVR } from "./constants/company";

function App() {
    const hasSeenLoading = sessionStorage.getItem("hasSeenLoading");
    const [isLoading, setIsLoading] = useState(!hasSeenLoading);

    const handleLoadingComplete = useCallback(() => {
        sessionStorage.setItem("hasSeenLoading", "true");
        setIsLoading(false);
    }, []);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() !== "c") return;
            if (e.metaKey || e.ctrlKey || e.altKey) return;
            const target = e.target as HTMLElement | null;
            if (target && ["INPUT", "TEXTAREA"].includes(target.tagName))
                return;
            navigator.clipboard.writeText(COMPANY_CVR);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    return (
        <div className="App">
            {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
            <header className="App-header"></header>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Resume />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
