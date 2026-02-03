import React from "react";
import "./StatusBar.scss";

interface Props {}

const StatusBar: React.FC<Props> = () => {
    const scrollToContact = () => {
        const element = document.getElementById("contact");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <footer className="status-bar">
            <div className="status-left">
                <button className="status-item available" onClick={scrollToContact}>
                    <span className="status-dot"></span>
                    <span>Available for work</span>
                </button>
                <div className="status-item branch">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="6" y1="3" x2="6" y2="15"/>
                        <circle cx="18" cy="6" r="3"/>
                        <circle cx="6" cy="18" r="3"/>
                        <path d="M18 9a9 9 0 0 1-9 9"/>
                    </svg>
                    <span>main</span>
                </div>
            </div>

            <div className="status-right">
                <div className="status-item">
                    <span>Ln 1, Col 1</span>
                </div>
                <div className="status-item">
                    <span>UTF-8</span>
                </div>
                <div className="status-item language">
                    <span>TypeScript React</span>
                </div>
            </div>
        </footer>
    );
};

export default StatusBar;
