import React from "react";
import { TabModel } from "../models/tab.model";
import "../styles/NavMenu.scss";
import Tab from "./Tab";

interface Props {
    tabs: TabModel[];
}

const NavMenu: React.FC<Props> = (props) => {
    return (
        <div className="nav-menu">
            <div className="nav-menu-top">
                <div className="dot red"></div>
                <div className="dot yellow"></div>
                <div className="dot green"></div>
            </div>
            <div className="nav-menu-tabs-section">
                {props.tabs.map((t) => (
                    <Tab tab={t} />
                ))}
            </div>
        </div>
    );
};

export default NavMenu;
