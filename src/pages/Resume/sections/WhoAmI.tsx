import React from "react";
import { ResumeSectionModel } from "../models/resumeModel";

import "../../../styles/pages/Resume/sections/WhoAmI.scss"

interface Props {}

const WhoAmISection: ResumeSectionModel<Props> = (props) => {
    return (
        <div className="whoami">
            <h1>Who Am I?</h1>
        </div>
    );
};

export default WhoAmISection;
