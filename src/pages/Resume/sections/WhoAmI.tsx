import React from "react";
import { ResumeSectionModel } from "../models/resumeModel";

import "./WhoAmI.scss"

interface Props {}

const WhoAmISection: ResumeSectionModel<Props> = (props) => {
    return (
        <div className="whoami">
            <h1>Who Am I?</h1>
        </div>
    );
};

export default WhoAmISection;
