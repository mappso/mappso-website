import React from "react";
import { Outlet } from "react-router-dom";
import NavMenu from "./NavMenu";
import "../styles/Layout.scss";

interface Props {}

const Layout: React.FC<Props> = (props) => {
    return (
        <div className="layout">
            <NavMenu
                tabs={[
                    {
                        title: "Resume.cs",
                        iconSrc: "/logo.svg",
                        directorySrc: "/",
                    },
                    {
                        title: "contact.ts",
                        iconSrc: "/logo.svg",
                        directorySrc: "/contact",
                    },
                    {
                        title: "Tab3.dart",
                        iconSrc: "/logo.svg",
                        directorySrc: "/test",
                    },
                ]}
            />
            <Outlet />
        </div>
    );
};

export default Layout;
