import React, { useState } from "react";
import copy from "copy-to-clipboard";
import "./ContactSection.scss";

const ContactSection: React.FC = () => {
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = (text: string) => {
        copy(text);
        setCopied(text);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <section className="contact-section" id="contact">
            <div className="contact-container">
                <div className="contact-header">
                    <h2>Let's Connect</h2>
                    <p>Available for freelance work and interesting projects</p>
                </div>

                <div className="contact-grid">
                    {/* Email */}
                    <button
                        className={`contact-card ${copied === 'contact@mappso.com' ? 'copied' : ''}`}
                        onClick={() => handleCopy('contact@mappso.com')}
                    >
                        <div className="card-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="4" width="20" height="16" rx="2"/>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                            </svg>
                        </div>
                        <div className="card-content">
                            <span className="card-label">Email</span>
                            <span className="card-value">contact@mappso.com</span>
                        </div>
                        <div className="card-action">
                            {copied === 'contact@mappso.com' ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                            ) : (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                                </svg>
                            )}
                        </div>
                    </button>

                    {/* GitHub */}
                    <a
                        href="https://github.com/tomilodk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-card"
                    >
                        <div className="card-icon github">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                        </div>
                        <div className="card-content">
                            <span className="card-label">GitHub</span>
                            <span className="card-value">tomilodk</span>
                        </div>
                        <div className="card-action">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15 3 21 3 21 9"/>
                                <line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                        </div>
                    </a>

                    {/* LinkedIn */}
                    <a
                        href="https://www.linkedin.com/in/milorj/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-card"
                    >
                        <div className="card-icon linkedin">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                        </div>
                        <div className="card-content">
                            <span className="card-label">LinkedIn</span>
                            <span className="card-value">milorj</span>
                        </div>
                        <div className="card-action">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15 3 21 3 21 9"/>
                                <line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                        </div>
                    </a>

                    {/* Blog */}
                    <a
                        href="https://blog.mappso.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-card"
                    >
                        <div className="card-icon blog">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                            </svg>
                        </div>
                        <div className="card-content">
                            <span className="card-label">Blog</span>
                            <span className="card-value">blog.mappso.com</span>
                        </div>
                        <div className="card-action">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15 3 21 3 21 9"/>
                                <line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                        </div>
                    </a>
                </div>

                <div className="contact-footer">
                    <span className="cvr">CVR: 42471736</span>
                    <span className="location">Aarhus, Denmark</span>
                </div>
            </div>

            {/* Toast notification */}
            {copied && (
                <div className="copy-toast">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>Copied to clipboard!</span>
                </div>
            )}
        </section>
    );
};

export default ContactSection;
