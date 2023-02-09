import React from "react";
import { ResumeSectionModel } from "../models/resumeModel";

interface Props {
    section: ResumeSectionModel;
}

const ResumeSection: React.FC<Props> = (props) => {
    return (
        <div className="section">
            <props.section></props.section>
        </div>
    );
};

export default ResumeSection;
