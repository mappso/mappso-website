import React, { useState } from "react";
import HeroSection from "./sections/HeroSection";
import GitTimeline from "./sections/GitTimeline";
import SkillsPanel from "./sections/SkillsPanel";
import LiveProjects from "./sections/LiveProjects";
import ContactSection from "./sections/ContactSection";
import ProjectModal, { ProjectData, compozerrProject, startiProject } from "./sections/ProjectModal";
import StatusBar from "../../components/StatusBar";

import "./Resume.scss";

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
                        <button
                            className="project-card compozerr"
                            onClick={() => openProjectModal(compozerrProject)}
                        >
                            <div className="card-badge">Personal Project</div>
                            <h3>Compozerr</h3>
                            <p>Full-stack hosting platform with modular templates, CLI tooling, and automated VM infrastructure.</p>
                            <div className="card-tech">
                                <span>.NET 9</span>
                                <span>React</span>
                                <span>Proxmox</span>
                            </div>
                            <div className="card-action">
                                <span>View Details</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </div>
                        </button>

                        <button
                            className="project-card starti"
                            onClick={() => openProjectModal(startiProject)}
                        >
                            <div className="card-badge">CTO Role</div>
                            <h3>starti.app</h3>
                            <p>SaaS platform converting websites into native apps with push notifications, biometrics, and geofencing.</p>
                            <div className="card-tech">
                                <span>.NET MAUI</span>
                                <span>Firebase</span>
                                <span>GCP</span>
                            </div>
                            <div className="card-action">
                                <span>View Details</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </section>

            <GitTimeline onOpenCompozerr={() => openProjectModal(compozerrProject)} />

            <div className="two-column-section">
                <SkillsPanel />
                <LiveProjects />
            </div>

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
