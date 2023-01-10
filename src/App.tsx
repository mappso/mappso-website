import { useState } from "react";
import "./styles/App.scss";
import NavMenu from "./components/NavMenu";
import Resume from "./pages/Resume";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="App">
            <header className="App-header">
                <NavMenu
                    tabs={[
                        {
                            title: "Tab.cs",
                            content: Resume,
                        },
                        {
                            title: "Tab2.ts",
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
