import React from "react";
import { Outlet } from "react-router-dom";
import NavMenu from "./NavMenu";
import StructuredData from "./StructuredData";
import "./Layout.scss";

const Layout: React.FC = () => {
    return (
        <div className="layout">
            <StructuredData />
            <NavMenu />
            <Outlet />
        </div>
    );
};

export default Layout;
