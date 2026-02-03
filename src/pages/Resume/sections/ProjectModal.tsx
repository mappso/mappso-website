import React, { useState, useEffect } from "react";
import "./ProjectModal.scss";

export interface ProjectData {
    id: string;
    name: string;
    tagline: string;
    description: string;
    features: string[];
    techStack: {
        category: string;
        items: string[];
    }[];
    architecture?: {
        description: string;
        diagram: string;
    };
    screenshot?: string;
    link?: string;
}

interface ProjectModalProps {
    project: ProjectData | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "tech" | "screenshot">("overview");

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            setActiveTab("overview");
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleEscape);
        }

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !project) return null;

    const tabs = [
        { id: "overview" as const, label: "Overview" },
        ...(project.architecture ? [{ id: "architecture" as const, label: "Architecture" }] : []),
        { id: "tech" as const, label: "Tech Stack" },
        ...(project.screenshot ? [{ id: "screenshot" as const, label: "Screenshots" }] : []),
    ];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="modal-header">
                    <div className="header-left">
                        <span className="file-icon">📄</span>
                        <span className="file-name">{project.id}.md</span>
                    </div>
                    <button className="close-button" onClick={onClose}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Tabs */}
                <div className="modal-tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="modal-content">
                    {activeTab === "overview" && (
                        <div className="tab-content overview">
                            <h1 className="project-title"># {project.name}</h1>
                            <p className="project-tagline">&gt; {project.tagline}</p>

                            <div className="content-section">
                                <h2>## What I built</h2>
                                <p>{project.description}</p>
                            </div>

                            <div className="content-section">
                                <h2>## Key Features</h2>
                                <ul className="feature-list">
                                    {project.features.map((feature, i) => (
                                        <li key={i}>
                                            <span className="bullet">•</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="visit-button"
                                >
                                    <span>Visit Site</span>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        <polyline points="15 3 21 3 21 9" />
                                        <line x1="10" y1="14" x2="21" y2="3" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    )}

                    {activeTab === "architecture" && project.architecture && (
                        <div className="tab-content architecture">
                            <h2>## Architecture</h2>
                            <p>{project.architecture.description}</p>
                            <pre className="architecture-diagram">
                                {project.architecture.diagram}
                            </pre>
                        </div>
                    )}

                    {activeTab === "tech" && (
                        <div className="tab-content tech-stack">
                            <h2>## Tech Stack</h2>
                            <div className="tech-categories">
                                {project.techStack.map((category, i) => (
                                    <div key={i} className="tech-category">
                                        <h3>{category.category}</h3>
                                        <div className="tech-badges">
                                            {category.items.map((item, j) => (
                                                <span key={j} className="tech-badge">{item}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "screenshot" && project.screenshot && (
                        <div className="tab-content screenshot">
                            <h2>## Screenshots</h2>
                            <div className="screenshot-container">
                                <img
                                    src={project.screenshot}
                                    alt={`${project.name} screenshot`}
                                    className="project-screenshot"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;

// Project data
export const compozerrProject: ProjectData = {
    id: "compozerr",
    name: "Compozerr",
    tagline: "Full-stack hosting platform with modular templates",
    description:
        "A complete deployment platform built from scratch - CLI tooling, web dashboard, and VM infrastructure. Enables developers to deploy projects with a single command, automatic SSL, and modular architecture for authentication, payments, and database integrations.",
    features: [
        "One command to deploy any project",
        "Automatic SSL via Traefik + Let's Encrypt",
        "Modular templates (auth, payments, database)",
        "Real-time terminal access to VMs",
        "OAuth authentication with GitHub",
        "Stripe integration for billing",
    ],
    techStack: [
        {
            category: "CLI",
            items: ["Bun", "TypeScript", "Commander.js", "Ink (React TUI)", "Zod", "SignalR"],
        },
        {
            category: "Web Dashboard",
            items: [".NET 9", "ASP.NET Core", "React 19", "TanStack Router", "TanStack Query", "Tailwind CSS", "PostgreSQL"],
        },
        {
            category: "Infrastructure",
            items: ["Node.js", "Proxmox API", "Traefik", "Docker", "Let's Encrypt"],
        },
    ],
    architecture: {
        description: "Three-tier architecture connecting CLI, Web API, and Hosting infrastructure:",
        diagram: `
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   ┌─────────┐      ┌─────────────┐      ┌──────────────┐   │
│   │   CLI   │─────▶│   Web API   │─────▶│   Hosting    │   │
│   │         │      │             │      │   Manager    │   │
│   └─────────┘      └─────────────┘      └──────┬───────┘   │
│    Bun/TS           .NET 9 +                   │           │
│    Ink              React 19                   ▼           │
│                                          ┌──────────┐      │
│                                          │ Proxmox  │      │
│                                          │   VMs    │      │
│                                          └────┬─────┘      │
│                                               │            │
│                                          ┌────▼─────┐      │
│                                          │ Traefik  │      │
│                                          │ Routing  │      │
│                                          └──────────┘      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
        `,
    },
    screenshot: "/assets/compozerr-screenshot.png",
    link: "https://compozerr.com",
};

export const startiProject: ProjectData = {
    id: "starti",
    name: "starti.app",
    tagline: "Website to native app conversion platform",
    description:
        "As CTO, led development of a SaaS platform that converts mobile-optimized websites into native iOS and Android applications. The platform serves multiple brands through a multi-tenant architecture with advanced mobile features.",
    features: [
        "Push notifications (including AI-powered)",
        "Biometric authentication (fingerprint, Face ID)",
        "NFC and QR code scanning",
        "Geofencing capabilities",
        "Multi-brand infrastructure",
        "7,100+ monthly app downloads",
        "Net Promoter Score: 90",
    ],
    techStack: [
        {
            category: "Mobile",
            items: [".NET MAUI", "Native iOS/Android features"],
        },
        {
            category: "Backend",
            items: ["Firebase", "Google Cloud Storage"],
        },
        {
            category: "Infrastructure",
            items: ["CI/CD Pipelines", "Multi-tenant architecture", "CDN asset delivery"],
        },
    ],
    link: "https://starti.app",
};
