import React from "react";
import "./SkillsPanel.scss";

interface Skill {
    name: string;
    proficiency: number;
}

interface SkillCategory {
    name: string;
    skills: Skill[];
}

const skillCategories: SkillCategory[] = [
    {
        name: "Languages",
        skills: [
            { name: "TypeScript", proficiency: 9 },
            { name: "C# / .NET", proficiency: 9 },
            { name: "Dart", proficiency: 6 },
        ],
    },
    {
        name: "Frontend",
        skills: [
            { name: "React", proficiency: 9 },
            { name: "Tailwind CSS", proficiency: 8 },
            { name: "SCSS", proficiency: 8 },
        ],
    },
    {
        name: "Backend",
        skills: [
            { name: ".NET Core / 9", proficiency: 9 },
            { name: "Node.js", proficiency: 8 },
            { name: "PostgreSQL", proficiency: 7 },
            { name: "Firebase", proficiency: 8 },
        ],
    },
    {
        name: "DevOps",
        skills: [
            { name: "Docker", proficiency: 8 },
            { name: "CI/CD", proficiency: 9 },
            { name: "Proxmox", proficiency: 7 },
            { name: "Traefik", proficiency: 7 },
            { name: "GCP", proficiency: 7 },
            { name: "Azure DevOps", proficiency: 8 },
        ],
    },
    {
        name: "Mobile",
        skills: [
            { name: ".NET MAUI", proficiency: 8 },
            { name: "Xamarin", proficiency: 8 },
            { name: "Flutter", proficiency: 6 },
        ],
    },
];

const SkillsPanel: React.FC = () => {
    return (
        <section className="skills-section" id="skills">
            <div className="skills-container">
                <div className="section-header">
                    <div className="terminal-prompt">
                        <span className="prompt-symbol">$</span>
                        <span className="prompt-command">cat package.json | jq '.dependencies'</span>
                    </div>
                    <h2 className="section-title">
                        <span className="title-bracket">{"{"}</span>
                        Tech Stack
                        <span className="title-bracket">{"}"}</span>
                    </h2>
                </div>

                <div className="skills-grid">
                    {skillCategories.map((category) => (
                        <div key={category.name} className="skill-category">
                            <h3 className="category-name">{category.name}</h3>
                            <div className="skill-tags">
                                {category.skills.map((skill) => (
                                    <div
                                        key={skill.name}
                                        className="skill-tag"
                                        style={{
                                            '--proficiency': `${skill.proficiency * 10}%`
                                        } as React.CSSProperties}
                                    >
                                        <span className="skill-name">{skill.name}</span>
                                        <div className="skill-bar">
                                            <div className="skill-fill"></div>
                                        </div>
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
