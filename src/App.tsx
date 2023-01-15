import { useEffect, useState } from "react";
import "./styles/App.scss";
import NavMenu from "./components/NavMenu";
import Resume from "./pages/Resume";
import WebFont from "webfontloader";

function App() {
    useEffect(() => {
        WebFont.load({
            google: {
                families: ["Source Code Pro"],
            },
        });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <NavMenu
                    tabs={[
                        {
                            title: "Test.cs",
                            content: Resume,
                        },
                        {
                            title: "hej aske.ts",
                            content: Resume,
                        },
                        {
                            title: "Tab3.dart",
                            content: Resume,
                        },
                    ]}
                ></NavMenu>
            </header>
        </div>
    );
}

export default App;
