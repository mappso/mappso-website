import React from "react";
import { Outlet } from "react-router-dom";
import NavMenu from "./NavMenu";
import "../styles/Layout.scss";

interface Props {}

const Layout: React.FC<Props> = (props) => {
    return (
        <div className="layout">
            <NavMenu
                folders={[
                    {
                        title: "src",
                        iconSrc: "src/assets/icons/folder-src-open.svg",
                        tabs: [
                            {
                                title: "Resume.cs",
                                directorySrc: "/",
                            },
                            {
                                title: "contact.ts",
                                directorySrc: "/contact",
                            },
                            {
                                title: "Tab3.dart",
                                directorySrc: "/test",
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
