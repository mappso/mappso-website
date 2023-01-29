import { useState } from "react";
import { useLocation } from "react-router-dom";
import { TabModel } from "../models/tab.model";
import "../styles/NavMenu.scss";
import "../styles/NavMenuIcons.scss";
import BurgerMenu from "./BurgerMenu";
import Tab from "./Tab";
interface Props {
    tabs: TabModel[];
}

const NavMenu: React.FC<Props> = (props) => {
    const [active, setActive] = useState(false);

    const location = useLocation();

    const title = props.tabs.find((t) => t.directorySrc == location.pathname)?.title ?? "not found";

    const closeButtonClicked = () => {
        console.log("Close");
        
        window.close();
    };

    const minimizeButtonClicked = () => {
        console.log("Minimize");
    };

    const maximizeButtonClicked = () => {
        console.log("Maximize");
    };

    return (
        <div className="nav-menu">
            <div className="nav-menu-top">
                <div className="nav-menu-top-left" onMouseOver={() => setActive(true)} onMouseOut={() => setActive(false)}>
                    <div onClick={closeButtonClicked} className="dot red">
                        <div className={"icon icon-close" + (active ? " show" : "")}></div>
                    </div>
                    <div onClick={minimizeButtonClicked} className="dot yellow">
                        <div className={"icon icon-minimize" + (active ? " show" : "")}></div>
                    </div>
                    <div onClick={maximizeButtonClicked} className="dot green">
                        <div className={"icon icon-maximize" + (active ? " show" : "")}></div>
                    </div>
                </div>
                <div className="nav-menu-top-middle">
                    <p>{title}</p>
                </div>
                <div className="nav-menu-top-right">
                    <BurgerMenu/>
                </div>
            </div>
            <div className="nav-menu-tabs-section">
                {props.tabs.map((t, index) => (
                    <Tab key={index} tab={t} />
                ))}
            </div>
        </div>
    );
};

export default NavMenu;
