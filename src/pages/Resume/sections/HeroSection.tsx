import React, { useEffect, useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import "./HeroSection.scss";

interface Props {}

const HeroSection: React.FC<Props> = () => {
    const code = `// about.ts
interface Developer {
  name: string;
  title: string;
  location: string;
  available: boolean;
}

const milo: Developer = {
  name: "Milo Jørgensen",
  title: "Full-Stack Developer & Founder",
  location: "Aarhus, Denmark",
  available: true, // Open to opportunities
};

export default milo;`;

    const characterDelay = 6;
    const [displayedCode, setDisplayedCode] = useState<string>("");
    const [isTypingDone, setIsTypingDone] = useState<boolean>(false);

    useEffect(() => {
        if (displayedCode.length === code.length) {
            setIsTypingDone(true);
            return;
        }

        const timeout = setTimeout(() => {
            setDisplayedCode(code.slice(0, displayedCode.length + 1));
        }, characterDelay);

        return () => clearTimeout(timeout);
    }, [displayedCode, code]);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="hero-section" id="about">
            <div className="hero-content">
                <div className="hero-photo-container">
                    <div className="photo-glow"></div>
                    <img
                        src="/assets/profile.jpeg"
                        alt="Milo Jørgensen"
                        className="hero-photo"
                    />
                    <div className={`availability-badge ${isTypingDone ? 'visible' : ''}`}>
                        <span className="pulse"></span>
                        <span>Available for work</span>
                    </div>
                </div>

                <div className="hero-code-container">
                    <div className="code-window">
                        <div className="code-header">
                            <span className="file-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 3H21V21H3V3Z" stroke="#3178c6" strokeWidth="2"/>
                                    <path d="M14 10V17M14 10H17M14 10H11" stroke="#3178c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M7 14H10" stroke="#3178c6" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </span>
                            <span className="file-name">about.ts</span>
                        </div>
                        <CodeEditor
                            className="code-editor"
                            value={displayedCode}
                            language="typescript"
                            readOnly
                            padding={20}
                            style={{
                                backgroundColor: "transparent",
                                fontFamily: "'Source Code Pro', monospace",
                            }}
                        />
                        {!isTypingDone && <span className="typing-cursor">|</span>}
                    </div>

                    <div className={`hero-cta ${isTypingDone ? 'visible' : ''}`}>
                        <button
                            className="cta-button primary"
                            onClick={() => scrollToSection('projects')}
                        >
                            <span>View Projects</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M7 17L17 7M17 7H7M17 7V17"/>
                            </svg>
                        </button>
                        <button
                            className="cta-button secondary"
                            onClick={() => scrollToSection('contact')}
                        >
                            <span>Contact</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
