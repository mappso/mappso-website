import React, { useEffect, useState } from "react";
import { FolderModel } from "../models/folder.model";
import "./BurgerMenu.scss";
import Folder from "./Folder";
import Tab from "./Tab";

interface Props {
    folders: FolderModel[];
}

const BurgerMenu: React.FC<Props> = (props) => {
    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);

    useEffect(() => {
        console.log("BurgerMenu.tsx: useEffect: burgerMenuOpen: " + burgerMenuOpen);
    }, [burgerMenuOpen]);

    return (
        <div className="menu-root">
            <div className="toggle-menu-button" onClick={() => setBurgerMenuOpen(!burgerMenuOpen)}>
                <div className="graphic">
                    <div className="line"></div>
                </div>
            </div>

            <div
                className={"burger-menu" + (burgerMenuOpen ? " show" : "")}
                onClick={() => {
                    console.log("pressed");
                }}
            >
                <div
                    className="transparent-area"
                    onClick={() => {
                        setBurgerMenuOpen(false);
                    }}
                ></div>
                <div className="content">{burgerMenuOpen ? props.folders.map((f, index) => <Folder key={index} folder={f} onPressedAny={() => setBurgerMenuOpen(false)} />) : null}</div>
            </div>
        </div>
    );
};

export default BurgerMenu;
