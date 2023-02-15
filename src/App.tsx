import { useEffect, useState } from "react";
import "./App.scss";
import NavMenu from "./components/NavMenu";
import Resume from "./pages/Resume/Resume";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./pages/Contact/Contact";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound/NotFound";

function App() {
    const action = () => {
        console.log("Clicked");
    }
    return (
        <div className="App">
            <header className="App-header"></header>
            <BrowserRouter>
                <Routes>
                    <Route path="/" action={action} element={<Layout />}>
                        <Route index action={action} element={<Resume />} />
                        <Route path="contact" action={action} element={<Contact />} />
                        <Route path="test" action={action} element={<Contact />} />
                        <Route path="*" action={action} element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
