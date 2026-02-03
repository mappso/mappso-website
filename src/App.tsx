import { useState, useCallback } from "react";
import "./App.scss";
import Resume from "./pages/Resume/Resume";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./pages/Contact/Contact";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound/NotFound";
import LoadingScreen from "./components/LoadingScreen";

function App() {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoadingComplete = useCallback(() => {
        setIsLoading(false);
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
