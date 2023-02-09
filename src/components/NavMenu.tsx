import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FolderModel } from "../models/folder.model";
import { TabModel } from "../models/tab.model";
import "../styles/navigation/NavMenu.scss";
import "../styles/navigation/NavMenuIcons.scss";
import BurgerMenu from "./BurgerMenu";
import Tab from "./Tab";
interface Props {
    folders: FolderModel[];
}

const NavMenu: React.FC<Props> = (props) => {
    const [active, setActive] = useState(false);

    const location = useLocation();

    const tabs = props.folders.map((f) => f.tabs).flat();

    const title = tabs.find((t) => t.directorySrc == location.pathname)?.title ?? "not found";

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
                    <BurgerMenu folders={props.folders}/>
                </div>
            </div>
            <div className="nav-menu-tabs-section">
                {tabs.map((t, index) => (
                    <Tab key={index} tab={t} />
                ))}
            </div>
        </div>
    );
};

export default NavMenu;
