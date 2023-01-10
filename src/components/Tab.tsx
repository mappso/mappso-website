import React from "react";
import { TabModel } from "../models/tab.model";
import "../styles/NavMenu.scss";

interface Props {
    tab: TabModel;
}

const Tab: React.FC<Props> = (props) => {
    return (
        <div className="tab">
            <p>{props.tab.title}</p>
        </div>
    );
};

export default Tab;
