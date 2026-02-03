import React, { useState } from "react";
import "./SkillsPanel.scss";

interface Skill {
    name: string;
    proficiency: number; // 1-10
    projects?: string[];
}

interface SkillCategory {
    name: string;
    icon: string;
    skills: Skill[];
}

const skillCategories: SkillCategory[] = [
    {
        name: "Languages",
        icon: "{ }",
        skills: [
            { name: "TypeScript", proficiency: 9, projects: ["Compozerr", "starti.app"] },
            { name: "C# / .NET", proficiency: 9, projects: ["Compozerr", "Holion", "starti.app"] },
            { name: "JavaScript", proficiency: 9, projects: ["Compozerr", "Brickstack"] },
            { name: "Dart", proficiency: 6, projects: ["Holion"] },
        ],
    },
    {
        name: "Frontend",
        icon: "</>",
        skills: [
            { name: "React", proficiency: 9, projects: ["Compozerr", "Brickstack", "mappso"] },
            { name: "Tailwind CSS", proficiency: 8, projects: ["Compozerr", "Brickstack"] },
            { name: "SCSS / CSS", proficiency: 8, projects: ["mappso", "Compozerr"] },
        ],
    },
    {
        name: "Backend",
        icon: "[ ]",
        skills: [
            { name: ".NET Core / 9", proficiency: 9, projects: ["Compozerr", "Holion"] },
            { name: "Node.js", proficiency: 8, projects: ["Compozerr", "starti.app"] },
            { name: "PostgreSQL", proficiency: 7, projects: ["Compozerr"] },
            { name: "Firebase", proficiency: 8, projects: ["Holion", "starti.app"] },
        ],
    },
    {
        name: "DevOps & Infra",
        icon: ">>>",
        skills: [
            { name: "Docker", proficiency: 8, projects: ["Compozerr", "starti.app"] },
            { name: "CI/CD Pipelines", proficiency: 9, projects: ["Compozerr", "starti.app", "Holion"] },
            { name: "Proxmox / VMs", proficiency: 7, projects: ["Compozerr"] },
            { name: "Traefik", proficiency: 7, projects: ["Compozerr"] },
            { name: "Google Cloud", proficiency: 7, projects: ["starti.app"] },
            { name: "Azure DevOps", proficiency: 8, projects: ["Holion"] },
        ],
    },
    {
        name: "Mobile",
        icon: "[ ]",
        skills: [
            { name: ".NET MAUI", proficiency: 8, projects: ["Holion", "starti.app"] },
            { name: "Xamarin", proficiency: 8, projects: ["Holion"] },
            { name: "Flutter", proficiency: 6, projects: ["Holion"] },
        ],
    },
];

const SkillsPanel: React.FC = () => {
    const [expandedCategories, setExpandedCategories] = useState<string[]>(
        skillCategories.map(c => c.name)
    );
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleCategory = (categoryName: string) => {
        setExpandedCategories(prev =>
            prev.includes(categoryName)
                ? prev.filter(c => c !== categoryName)
                : [...prev, categoryName]
        );
    };

    const filteredCategories = skillCategories.map(category => ({
        ...category,
        skills: category.skills.filter(skill =>
            skill.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
    })).filter(category => category.skills.length > 0);

    return (
        <section className="skills-panel" id="skills">
            <div className="panel-container">
                <div className="panel-header">
                    <div className="header-title">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7" rx="1"/>
                            <rect x="14" y="3" width="7" height="7" rx="1"/>
                            <rect x="3" y="14" width="7" height="7" rx="1"/>
                            <rect x="14" y="14" width="7" height="7" rx="1"/>
                        </svg>
                        <span>EXTENSIONS</span>
                    </div>
                </div>

                <div className="search-container">
                    <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="M21 21l-4.35-4.35"/>
                    </svg>
                    <input
                        type="text"
                        placeholder="Search skills..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="categories-list">
                    {filteredCategories.map((category) => (
                        <div key={category.name} className="category">
                            <button
                                className="category-header"
                                onClick={() => toggleCategory(category.name)}
                            >
                                <svg
                                    className={`chevron ${expandedCategories.includes(category.name) ? 'expanded' : ''}`}
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M9 18l6-6-6-6"/>
                                </svg>
                                <span className="category-icon">{category.icon}</span>
                                <span className="category-name">{category.name}</span>
                                <span className="category-count">{category.skills.length}</span>
                            </button>

                            <div className={`skills-list ${expandedCategories.includes(category.name) ? 'expanded' : ''}`}>
                                {category.skills.map((skill) => (
                                    <div
                                        key={skill.name}
                                        className="skill-item"
                                        onMouseEnter={() => setHoveredSkill(skill.name)}
                                        onMouseLeave={() => setHoveredSkill(null)}
                                    >
                                        <div className="skill-icon">
                                            <div className="icon-dot"></div>
                                        </div>
                                        <div className="skill-info">
                                            <span className="skill-name">{skill.name}</span>
                                            <div className="proficiency-bar">
                                                <div
                                                    className="proficiency-fill"
                                                    style={{ width: `${skill.proficiency * 10}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* Tooltip */}
                                        {hoveredSkill === skill.name && skill.projects && (
                                            <div className="skill-tooltip">
                                                <span className="tooltip-label">Used in:</span>
                                                <div className="tooltip-projects">
                                                    {skill.projects.map((project, i) => (
                                                        <span key={i} className="tooltip-project">{project}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsPanel;
