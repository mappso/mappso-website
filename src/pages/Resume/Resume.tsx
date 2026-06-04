import React, { useState } from "react";
import HeroSection from "./sections/HeroSection";
import GitTimeline from "./sections/GitTimeline";
import SkillsPanel from "./sections/SkillsPanel";
import LiveProjects from "./sections/LiveProjects";
import ContactSection from "./sections/ContactSection";
import ProjectModal, { ProjectData, kurvoProject, compozerrProject, startiProject } from "./sections/ProjectModal";
import StatusBar from "../../components/StatusBar";
import SEO from "../../components/SEO";

import "./Resume.scss";

interface FeaturedProject {
    project: ProjectData;
    badge: string;
    blurb: string;
    tech: string[];
}

const featuredProjects: FeaturedProject[] = [
    {
        project: kurvoProject,
        badge: "Personal Project",
        blurb: "Rally-style motorcycle navigation with curvature-scored routes, pace-note voice guidance, and a web route planner.",
        tech: ["React Native", "Node.js", "OSRM"],
    },
    {
        project: compozerrProject,
        badge: "Personal Project",
        blurb: "Full-stack hosting platform with modular templates, CLI tooling, and automated VM infrastructure.",
        tech: [".NET 9", "React", "Proxmox"],
    },
    {
        project: startiProject,
        badge: "CTO Role",
        blurb: "SaaS platform converting websites into native apps with push notifications, biometrics, and geofencing.",
        tech: [".NET MAUI", "Firebase", "GCP"],
    },
];

interface Props {}

const Resume: React.FC<Props> = () => {
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openProjectModal = (project: ProjectData) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const closeProjectModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProject(null), 300);
    };

    return (
        <div className="resume">
            <SEO
                path="/"
                description="Portfolio of Milo R. Jørgensen — Full-Stack Developer & Founder based in Aarhus, Denmark. Building scalable web applications with React, .NET, TypeScript, and cloud infrastructure."
            />
            <HeroSection />

            {/* Project Showcase Cards */}
            <section className="featured-projects" id="featured">
                <div className="featured-container">
                    <div className="section-header">
                        <h2 className="section-title">
                            <span className="title-bracket">&lt;</span>
                            Featured Projects
                            <span className="title-bracket">/&gt;</span>
                        </h2>
                    </div>

                    <div className="project-cards">
                        {featuredProjects.map(({ project, badge, blurb, tech }) => (
                            <button
                                key={project.id}
                                className={`project-card ${project.id}`}
                                onClick={() => openProjectModal(project)}
                            >
                                <div className="card-badge">{badge}</div>
                                <h3>{project.name}</h3>
                                <p>{blurb}</p>
                                <div className="card-tech">
                                    {tech.map((item) => (
                                        <span key={item}>{item}</span>
                                    ))}
                                </div>
                                <div className="card-action">
                                    <span>View Details</span>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7"/>
                                    </svg>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <GitTimeline onOpenCompozerr={() => openProjectModal(compozerrProject)} />

            <LiveProjects />

            <SkillsPanel />

            <ContactSection />
            <StatusBar />

            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={closeProjectModal}
            />
        </div>
    );
};

export default Resume;
