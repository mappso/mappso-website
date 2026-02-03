import React, { useState, useEffect, useRef } from "react";
import "./GitTimeline.scss";

interface AchievementLink {
    text: string;
    linkText: string;
    linkType: "modal" | "external";
    linkTarget: string;
    suffix?: string;
}

interface Experience {
    id: string;
    date: string;
    type: "founder" | "employee" | "side";
    commitType: "feat" | "refactor" | "init";
    scope: string;
    title: string;
    company: string;
    companyUrl?: string;
    description: string;
    achievements: Array<string | AchievementLink>;
    techStack: string[];
    branchStart?: boolean;
    branchEnd?: boolean;
    parallel?: boolean;
}

interface GitTimelineProps {
    onOpenCompozerr?: () => void;
}

const experiences: Experience[] = [
    {
        id: "mappso",
        date: "2021 - present",
        type: "founder",
        commitType: "feat",
        scope: "mappso",
        title: "Founder & Programmer",
        company: "mappso",
        description: "Running my own software consultancy, building products and helping companies with technical solutions.",
        achievements: [
            { text: "Built ", linkText: "Compozerr", linkType: "modal", linkTarget: "compozerr", suffix: " - full-stack hosting platform" },
            "Developed Brickstack - AI-powered document management",
            "Created Minrain - weather app for motorcyclists",
        ],
        techStack: ["TypeScript", "React", ".NET", "Node.js", "Docker"],
        branchStart: true,
    },
    {
        id: "starti",
        date: "2023 - 2026",
        type: "employee",
        commitType: "feat",
        scope: "starti",
        title: "Chief Technology Officer",
        company: "starti.app",
        companyUrl: "https://starti.app",
        description: "Led development of a SaaS platform converting websites into native iOS/Android apps with advanced mobile features.",
        achievements: [
            { text: "Built mobile app platform at ", linkText: "starti.app", linkType: "external", linkTarget: "https://starti.app" },
            "Architected multi-tenant infrastructure serving multiple brands",
            "Platform achieved 7,100+ monthly downloads, NPS 90",
        ],
        techStack: [".NET MAUI", "Firebase", "Google Cloud", "TypeScript", "CI/CD"],
        parallel: true,
    },
    {
        id: "holion",
        date: "2022 - 2026",
        type: "employee",
        commitType: "feat",
        scope: "holion",
        title: "Software Developer",
        company: "Holion ApS",
        companyUrl: "https://holion.dk",
        description: "Full-stack development at a Danish IT consultancy specializing in mobile apps and enterprise solutions.",
        achievements: [
            { text: "Full-stack development at ", linkText: "holion.dk", linkType: "external", linkTarget: "https://holion.dk" },
            "Built cross-platform mobile apps with .NET MAUI, Xamarin, Flutter",
            "Shipped apps from concept to App Store",
        ],
        techStack: ["C#", ".NET MAUI", "Xamarin", "Flutter", "Firebase", "Azure"],
        parallel: true,
        branchEnd: true,
    },
    {
        id: "funday",
        date: "2020 - 2022",
        type: "employee",
        commitType: "feat",
        scope: "funday",
        title: "Student Project Assistant",
        company: "Funday Factory",
        companyUrl: "https://www.fundaygames.dk",
        description: "Game development and playtesting at a Danish game studio.",
        achievements: [
            { text: "Game dev at ", linkText: "fundaygames.dk", linkType: "external", linkTarget: "https://www.fundaygames.dk" },
            "Contributed to game development projects",
            "Learned professional game development workflows",
        ],
        techStack: ["C#", "Unity", "Game Development"],
    },
    {
        id: "limboo",
        date: "2018 - 2022",
        type: "side",
        commitType: "init",
        scope: "limboo",
        title: "Game Developer",
        company: "Limboo App Games",
        companyUrl: "https://limboo.mappso.com",
        description: "Independent game development, creating and publishing mobile games.",
        achievements: [
            { text: "Published games at ", linkText: "limboo.mappso.com", linkType: "external", linkTarget: "https://limboo.mappso.com" },
            "Learned full product lifecycle",
            "Built games from concept to release",
        ],
        techStack: ["C#", "Unity", "Mobile Development"],
    },
];

const GitTimeline: React.FC<GitTimelineProps> = ({ onOpenCompozerr }) => {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [hasAutoExpanded, setHasAutoExpanded] = useState(false);
    const timelineRef = useRef<HTMLDivElement>(null);
    const firstItemRef = useRef<HTMLDivElement>(null);

    // Auto-expand first item when scrolling into view
    useEffect(() => {
        if (hasAutoExpanded) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAutoExpanded) {
                        // Slight delay for better visual effect
                        setTimeout(() => {
                            setExpandedId(experiences[0].id);
                            setHasAutoExpanded(true);
                        }, 300);
                    }
                });
            },
            {
                threshold: 0.3,
                rootMargin: "-50px 0px",
            }
        );

        if (firstItemRef.current) {
            observer.observe(firstItemRef.current);
        }

        return () => observer.disconnect();
    }, [hasAutoExpanded]);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const getTypeColor = (type: Experience["type"]) => {
        switch (type) {
            case "founder": return "#a855f7"; // Purple
            case "employee": return "#3b82f6"; // Blue
            case "side": return "#10b981"; // Green
        }
    };

    return (
        <section className="git-timeline" id="experience">
            <div className="section-header">
                <div className="terminal-prompt">
                    <span className="prompt-symbol">$</span>
                    <span className="prompt-command">git log --oneline --graph</span>
                </div>
            </div>

            <div className="timeline-container" ref={timelineRef}>
                <div className="timeline-graph">
                    {experiences.map((exp, index) => (
                        <div
                            key={exp.id}
                            ref={index === 0 ? firstItemRef : undefined}
                            className={`timeline-item ${expandedId === exp.id ? 'expanded' : ''} ${exp.parallel ? 'parallel' : ''}`}
                        >
                            {/* Git graph visualization */}
                            <div className="graph-column">
                                <div className="graph-lines">
                                    {/* Main branch line */}
                                    <div className="main-line" style={{ backgroundColor: getTypeColor(exp.type) }}></div>
                                </div>

                                {/* Commit dot */}
                                <div
                                    className="commit-dot"
                                    style={{ backgroundColor: getTypeColor(exp.type) }}
                                    onClick={() => toggleExpand(exp.id)}
                                >
                                    <div className="dot-inner"></div>
                                </div>
                            </div>

                            {/* Commit content */}
                            <div className="commit-content" onClick={() => toggleExpand(exp.id)}>
                                <div className="commit-header">
                                    <span className="commit-hash">{exp.id.slice(0, 7)}</span>
                                    <span className="commit-message">
                                        <span className="commit-type">{exp.commitType}</span>
                                        <span className="commit-scope">({exp.scope})</span>
                                        <span className="commit-title">: {exp.title}</span>
                                    </span>
                                    <span className="commit-date">{exp.date}</span>
                                </div>

                                {/* Expanded content */}
                                <div className={`commit-details ${expandedId === exp.id ? 'visible' : ''}`}>
                                    <div className="details-content">
                                        <div className="company-badge" style={{ borderColor: getTypeColor(exp.type) }}>
                                            {exp.company}
                                        </div>

                                        <p className="description">{exp.description}</p>

                                        <div className="achievements">
                                            <span className="label">Changes:</span>
                                            <ul>
                                                {exp.achievements.map((achievement, i) => (
                                                    <li key={i}>
                                                        <span className="diff-add">+</span>
                                                        {typeof achievement === "string" ? (
                                                            achievement
                                                        ) : achievement.linkType === "modal" ? (
                                                            <>
                                                                {achievement.text}
                                                                <button
                                                                    className="inline-link"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        if (achievement.linkTarget === "compozerr" && onOpenCompozerr) {
                                                                            onOpenCompozerr();
                                                                        }
                                                                    }}
                                                                >
                                                                    {achievement.linkText}
                                                                </button>
                                                                {achievement.suffix}
                                                            </>
                                                        ) : (
                                                            <>
                                                                {achievement.text}
                                                                <a
                                                                    href={achievement.linkTarget}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-link external"
                                                                    onClick={(e) => e.stopPropagation()}
                                                                >
                                                                    {achievement.linkText}
                                                                </a>
                                                                {achievement.suffix}
                                                            </>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="tech-stack">
                                            {exp.techStack.map((tech, i) => (
                                                <span key={i} className="tech-badge">{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Legend */}
                <div className="timeline-legend">
                    <div className="legend-item">
                        <span className="legend-dot" style={{ backgroundColor: "#a855f7" }}></span>
                        <span>Founder</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-dot" style={{ backgroundColor: "#3b82f6" }}></span>
                        <span>Employee</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-dot" style={{ backgroundColor: "#10b981" }}></span>
                        <span>Side Project</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GitTimeline;
