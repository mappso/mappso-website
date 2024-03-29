import "./App.scss";
import Resume from "./pages/Resume/Resume";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./pages/Contact/Contact";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound/NotFound";

function App() {
    return (
        <div className="App">
            <header className="App-header"></header>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Contact />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
