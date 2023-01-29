import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TabModel } from "../models/tab.model";
import "../styles/Tab.scss";

interface Props {
    tab: TabModel;
}

const Tab: React.FC<Props> = (props) => {
    const location = useLocation();

    const tabClassName = "tab" + (props.tab.directorySrc == location.pathname ? " active" : "");

    return (
        <Link to={props.tab.directorySrc} className="link">
            <div className={tabClassName}>
                <div className="icon">
                    <img src="/logo.svg" alt="tab logo" />
                </div>
                <p>{props.tab.title}</p>
                <div className="cross">
                    <div className="line left"></div>
                    <div className="line right"></div>
                </div>
                <div className="divider"></div>
            </div>
        </Link>
    );
};

export default Tab;
