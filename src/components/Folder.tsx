import React from "react";
import { FolderModel } from "../models/folder.model";
import Tab from "./Tab";
import "../styles/Folder.scss";

interface Props {
    folder: FolderModel;
}

const Folder: React.FC<Props> = (props) => {
    return (
        <div className="folder">
            <div className="upper">
                <div className="icon">
                    <img src={props.folder.iconSrc} alt="folder logo" />
                </div>
                <p>{props.folder.title}</p>
            </div>
            <div className="items">
                <div className="tab-column">
                    {props.folder.tabs.map((t, index) => (
                        <Tab key={index} tab={t} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Folder;
