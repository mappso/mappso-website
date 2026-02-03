import React, { useEffect, useState } from "react";
import "./LiveProjects.scss";

interface Project {
    url: string;
    name: string;
    description: string;
    icon?: string;
}

const projects: Project[] = [
    {
        url: "https://compozerr.com",
        name: "Compozerr",
        description: "Full-stack hosting platform with modular templates",
    },
    {
        url: "https://brickstack.dk",
        name: "Brickstack",
        description: "Real estate document management with AI compliance",
    },
    {
        url: "https://pdftoepub-3a3bd.web.app",
        name: "PDF to EPUB",
        description: "Document format converter tool",
    },
    {
        url: "https://limboo.mappso.com",
        name: "Limboo Games",
        description: "Game development portfolio",
    },
    {
        url: "https://minrain.mappso.com",
        name: "Minrain",
        description: "Weather app for motorcyclists",
    },
];

const CACHE_KEY_PREFIX = "domain_status_";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheEntry {
    alive: boolean;
    timestamp: number;
}

const checkDomain = async (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
        const img = new Image();
        const timeout = setTimeout(() => {
            resolve(false);
        }, 5000);

        img.onload = () => {
            clearTimeout(timeout);
            resolve(true);
        };

        img.onerror = () => {
            clearTimeout(timeout);
            // Try without favicon - some sites might not have it
            // Consider it alive if we get any response
            fetch(url, { mode: 'no-cors', cache: 'no-cache' })
                .then(() => resolve(true))
                .catch(() => resolve(false));
        };

        img.src = `${url}/favicon.ico?_=${Date.now()}`;
    });
};

const getCachedStatus = (url: string): boolean | null => {
    try {
        const cached = sessionStorage.getItem(CACHE_KEY_PREFIX + url);
        if (cached) {
            const entry: CacheEntry = JSON.parse(cached);
            if (Date.now() - entry.timestamp < CACHE_DURATION) {
                return entry.alive;
            }
        }
    } catch {
        // Ignore cache errors
    }
    return null;
};

const setCachedStatus = (url: string, alive: boolean): void => {
    try {
        const entry: CacheEntry = { alive, timestamp: Date.now() };
        sessionStorage.setItem(CACHE_KEY_PREFIX + url, JSON.stringify(entry));
    } catch {
        // Ignore cache errors
    }
};

const LiveProjects: React.FC = () => {
    const [statuses, setStatuses] = useState<Record<string, boolean | null>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAllDomains = async () => {
            const initialStatuses: Record<string, boolean | null> = {};

            // First, check cache for all projects
            for (const project of projects) {
                const cached = getCachedStatus(project.url);
                initialStatuses[project.url] = cached;
            }
            setStatuses(initialStatuses);

            // Then check uncached domains in parallel
            const uncachedProjects = projects.filter(
                (p) => initialStatuses[p.url] === null
            );

            if (uncachedProjects.length > 0) {
                const results = await Promise.all(
                    uncachedProjects.map(async (project) => {
                        const alive = await checkDomain(project.url);
                        setCachedStatus(project.url, alive);
                        return { url: project.url, alive };
                    })
                );

                setStatuses((prev) => {
                    const updated = { ...prev };
                    for (const result of results) {
                        updated[result.url] = result.alive;
                    }
                    return updated;
                });
            }

            setLoading(false);
        };

        checkAllDomains();
    }, []);

    const aliveProjects = projects.filter((p) => statuses[p.url] !== false);

    return (
        <section className="live-projects" id="projects">
            <div className="section-container">
                <div className="section-header">
                    <div className="terminal-prompt">
                        <span className="prompt-symbol">$</span>
                        <span className="prompt-command">./check-services.sh</span>
                        <span className={`status-indicator ${!loading ? 'done' : ''}`}>
                            {loading ? '...' : '✓'}
                        </span>
                    </div>
                    <h2 className="section-title">
                        <span className="title-icon">●</span>
                        Live Projects
                    </h2>
                </div>

                <div className="projects-grid">
                    {aliveProjects.map((project) => {
                        const status = statuses[project.url];
                        const isLoading = status === null;

                        return (
                            <a
                                key={project.url}
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`project-card ${isLoading ? 'loading' : ''}`}
                            >
                                <div className="card-header">
                                    <div className={`status-dot ${isLoading ? 'checking' : 'online'}`}>
                                        {isLoading && <div className="dot-pulse"></div>}
                                    </div>
                                    <span className="project-name">{project.name}</span>
                                </div>

                                <p className="project-description">{project.description}</p>

                                <div className="card-footer">
                                    <span className="project-url">
                                        {new URL(project.url).hostname}
                                    </span>
                                    <svg
                                        className="external-icon"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        <polyline points="15 3 21 3 21 9" />
                                        <line x1="10" y1="14" x2="21" y2="3" />
                                    </svg>
                                </div>

                                {isLoading && (
                                    <div className="loading-overlay">
                                        <div className="skeleton-shimmer"></div>
                                    </div>
                                )}
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default LiveProjects;
