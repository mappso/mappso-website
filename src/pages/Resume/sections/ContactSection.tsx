import React, { useEffect, useRef, useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import copy from "copy-to-clipboard";
import "./ContactSection.scss";

interface Props {}

const ContactSection: React.FC<Props> = () => {
    const clipBoardElements = ["contact@mappso.com", "42471736"];
    const initializedRef = useRef(false);
    const [copied, setCopied] = useState<string | null>(null);

    const code = `// contact.cs
namespace Contact;

public static class Info
{
    public const string Email = "contact@mappso.com";
    public const string CVR = "42471736";

    // Social
    // github.com/milo-codes
    // linkedin.com/in/milojorgensen
}`;

    const characterDelay = 15;
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

    const addToClipboardAction = (span: Element) => {
        let clipBoardElement = "";

        for (const possibleElement of clipBoardElements) {
            if (span.innerHTML.includes(possibleElement)) {
                clipBoardElement = possibleElement;
            }
        }

        const button = document.createElement("button");
        button.classList.add("copy-button");
        button.title = "Click to copy";
        button.addEventListener("click", () => {
            copy(clipBoardElement);
            setCopied(clipBoardElement);
            setTimeout(() => setCopied(null), 2000);
        });

        const parent = span.parentNode;
        parent?.replaceChild(button, span);
        button.appendChild(span);
    };

    useEffect(() => {
        if (!isTypingDone) return;

        if (!initializedRef.current) {
            const spanNodes = document.querySelectorAll(".contact-section span.token.string");

            for (const span of spanNodes) {
                if (clipBoardElements.some((e) => span.innerHTML.includes(e))) {
                    addToClipboardAction(span);
                }
            }
            initializedRef.current = true;
        }
    }, [isTypingDone]);

    const handleCopy = (text: string) => {
        copy(text);
        setCopied(text);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <section className="contact-section" id="contact">
            <div className="contact-container">
                <div className="section-header">
                    <div className="terminal-prompt">
                        <span className="prompt-symbol">$</span>
                        <span className="prompt-command">cat contact.cs</span>
                    </div>
                </div>

                <div className="contact-content">
                    <div className="code-window">
                        <div className="code-header">
                            <span className="file-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#68217a" strokeWidth="2" strokeLinejoin="round"/>
                                    <path d="M2 17l10 5 10-5" stroke="#68217a" strokeWidth="2" strokeLinejoin="round"/>
                                    <path d="M2 12l10 5 10-5" stroke="#68217a" strokeWidth="2" strokeLinejoin="round"/>
                                </svg>
                            </span>
                            <span className="file-name">contact.cs</span>
                        </div>
                        <CodeEditor
                            className="code-editor"
                            value={displayedCode}
                            language="csharp"
                            readOnly
                            padding={20}
                            style={{
                                backgroundColor: "transparent",
                                fontFamily: "'Source Code Pro', monospace",
                            }}
                        />
                    </div>

                    {/* Quick copy buttons */}
                    <div className={`quick-actions ${isTypingDone ? 'visible' : ''}`}>
                        <button
                            className={`action-button ${copied === 'contact@mappso.com' ? 'copied' : ''}`}
                            onClick={() => handleCopy('contact@mappso.com')}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                            </svg>
                            <span>{copied === 'contact@mappso.com' ? 'Copied!' : 'contact@mappso.com'}</span>
                        </button>

                        <a
                            href="https://github.com/milo-codes"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="action-button"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            <span>GitHub</span>
                        </a>

                        <a
                            href="https://linkedin.com/in/milojorgensen"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="action-button"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                            <span>LinkedIn</span>
                        </a>
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
            </div>
        </section>
    );
};

export default ContactSection;
