import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TabModel } from "../models/tab.model";
import { getIconSrc } from "../services/iconSelectionService";
import "../styles/navigation/Tab.scss";

interface Props {
    tab: TabModel;
    className?: string;
    onPressed?: () => void;
}

const Tab: React.FC<Props> = (props) => {
    const location = useLocation();

    const tabClassName = "tab" + (props.className ? " " + props.className : "") + (props.tab.directorySrc == location.pathname ? " active" : "");

    const iconSrc = getIconSrc(props.tab.title);

    return (
        <Link to={props.tab.directorySrc} className="link" onClick={props.onPressed}>
            <div className={tabClassName}>
                <div className="icon">
                    <img src={iconSrc} alt="tab logo" />
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
