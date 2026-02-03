import React from "react";
import { Outlet } from "react-router-dom";
import NavMenu from "./NavMenu";
import "./Layout.scss";

interface Props { }

const Layout: React.FC<Props> = () => {
    return (
        <div className="layout">
            <NavMenu
                folders={[
                    {
                        title: "portfolio",
                        iconSrc: "/icons/folder-src-open.svg",
                        tabs: [
                            {
                                title: "about.ts",
                                directorySrc: "/",
                            },
                            {
                                title: "contact.cs",
                                directorySrc: "/contact",
                            },
                        ],
                    },
                ]}
            />
            <Outlet />
        </div>
    );
};

export default Layout;
