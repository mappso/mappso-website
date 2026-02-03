import React from "react";
import { Outlet } from "react-router-dom";
import NavMenu from "./NavMenu";
import "./Layout.scss";

const Layout: React.FC = () => {
    return (
        <div className="layout">
            <NavMenu />
            <Outlet />
        </div>
    );
};

export default Layout;
