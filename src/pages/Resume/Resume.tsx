import React from "react";
import ResumeSection from "./components/Section";
import { ResumeSectionModel } from "./models/resumeModel";
import WhoAmISection from "./sections/WhoAmI";

import "./Resume.scss";

interface Props { }

const Resume: React.FC<Props> = (props) => {
    const sections: ResumeSectionModel[] = [WhoAmISection];

    return (
        <div className="resume">
            {sections.map((sec, index) => (
                <ResumeSection key={index} section={sec} />
            ))}
        </div>
    );
};

export default Resume;
