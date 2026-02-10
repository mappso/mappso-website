import { useState, useEffect } from "react";
import "./NavMenu.scss";

interface NavSection {
    id: string;
    label: string;
}

const sections: NavSection[] = [
    { id: "about", label: "about" },
    { id: "featured", label: "featured" },
    { id: "experience", label: "experience" },
    { id: "projects", label: "live" },
    { id: "skills", label: "skills" },
    { id: "contact", label: "contact" },
];

const NavMenu: React.FC = () => {
    const [activeSection, setActiveSection] = useState("about");
    const [dotHover, setDotHover] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 150;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i].id);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i].id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [mobileMenuOpen]);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setMobileMenuOpen(false);
        }
    };

    const closeButtonClicked = () => {
        window.close();
    };

    return (
        <nav className="nav-menu">
            <div className="nav-content">
                {/* macOS Window Dots */}
                <div
                    className="window-dots"
                    onMouseOver={() => setDotHover(true)}
                    onMouseOut={() => setDotHover(false)}
                >
                    <div onClick={closeButtonClicked} className="dot red">
                        <div className={`icon icon-close${dotHover ? " show" : ""}`}></div>
                    </div>
                    <div className="dot yellow">
                        <div className={`icon icon-minimize${dotHover ? " show" : ""}`}></div>
                    </div>
                    <div className="dot green">
                        <div className={`icon icon-maximize${dotHover ? " show" : ""}`}></div>
                    </div>
                </div>

                {/* Path/Breadcrumb Style Navigation - Desktop */}
                <div className="nav-path">
                    <span className="path-prefix">~/mappso</span>
                    <span className="path-separator">/</span>
                    <div className="section-links">
                        {sections.map((section, index) => (
                            <span key={section.id}>
                                <button
                                    className={`nav-link ${activeSection === section.id ? "active" : ""}`}
                                    onClick={() => scrollToSection(section.id)}
                                >
                                    {section.label}
                                </button>
                                {index < sections.length - 1 && (
                                    <span className="link-separator">/</span>
                                )}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle navigation menu"
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-header">
                    <span className="terminal-prompt">
                        <span className="prompt-symbol">$</span>
                        <span className="prompt-text">cd ~/mappso/</span>
                        <span className="cursor-blink">_</span>
                    </span>
                </div>
                <div className="mobile-menu-links">
                    {sections.map((section, index) => (
                        <button
                            key={section.id}
                            className={`mobile-nav-link ${activeSection === section.id ? 'active' : ''}`}
                            onClick={() => scrollToSection(section.id)}
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <span className="link-prefix">./</span>
                            <span className="link-name">{section.label}</span>
                            {activeSection === section.id && (
                                <span className="active-indicator">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path d="M5 12l5 5L20 7"/>
                                    </svg>
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mobile overlay */}
            {mobileMenuOpen && (
                <div
                    className="mobile-menu-overlay"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </nav>
    );
};

export default NavMenu;
