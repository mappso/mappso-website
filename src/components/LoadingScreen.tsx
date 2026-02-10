import React, { useState, useEffect } from "react";
import "./LoadingScreen.scss";

interface LoadingScreenProps {
    onComplete: () => void;
    minimumDuration?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
    onComplete,
    minimumDuration = 1750,
}) => {
    const [isExiting, setIsExiting] = useState(false);
    const [showTagline, setShowTagline] = useState(false);

    useEffect(() => {
        // Show tagline after a moment
        const taglineTimer = setTimeout(() => {
            setShowTagline(true);
        }, 800);

        // Start exit
        const exitTimer = setTimeout(() => {
            setIsExiting(true);
        }, minimumDuration);

        // Complete
        const completeTimer = setTimeout(() => {
            onComplete();
        }, minimumDuration + 600);

        return () => {
            clearTimeout(taglineTimer);
            clearTimeout(exitTimer);
            clearTimeout(completeTimer);
        };
    }, [minimumDuration, onComplete]);

    return (
        <div className={`loading-screen ${isExiting ? "exiting" : ""}`}>
            <div className="loading-content">
                <img
                    src="/assets/logo_white.png"
                    alt="mappso"
                    className="logo"
                />
                <div className={`tagline ${showTagline ? "visible" : ""}`}>
                    software & consulting
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
