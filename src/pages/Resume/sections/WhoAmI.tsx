import React, { useEffect } from "react";
import { ResumeSectionModel } from "../models/resumeModel";
import CodeEditor from "@uiw/react-textarea-code-editor";

import "./WhoAmI.scss";

interface Props {}

const WhoAmISection: ResumeSectionModel<Props> = (props) => {
    const code = `
import React, { useEffect } from "react";
import { ResumeSectionModel } from "../models/resumeModel";
import CodeEditor from "@uiw/react-textarea-code-editor";

import "./WhoAmI.scss";

interface Props {}

const WhoAmISection: ResumeSectionModel<Props> = (props) => {
    const code = \`
    import React from "react";
    import { ResumeSectionModel } from "../models/resumeModel";
    import CodeEditor from "@uiw/react-textarea-code-editor";
    \`

    const [codeSection, setCodeSection] = React.useState<string>("");

    let interval: NodeJS.Timer | undefined;

    useEffect(() => {
        if (interval) return;

        let internalCodeSection = codeSection;

        interval = setInterval(() => {
            if (internalCodeSection.length <= code.length) {
                internalCodeSection += code[internalCodeSection.length] ?? "";

                setCodeSection(internalCodeSection);
            } else {
                clearInterval(interval);
            }
        }, 20);
    }, []);

    return (
        <div className="whoami">
            <CodeEditor className="code" value={codeSection} language="typescript" readOnly></CodeEditor>
        </div>
    );
};

export default WhoAmISection;

    `;

    const [codeSection, setCodeSection] = React.useState<string>("");

    let interval: NodeJS.Timer | undefined;

    useEffect(() => {
        if (interval) return;

        let internalCodeSection = codeSection;

        interval = setInterval(() => {
            if (internalCodeSection.length <= code.length) {
                internalCodeSection += code[internalCodeSection.length] ?? "";

                setCodeSection(internalCodeSection);
            } else {
                clearInterval(interval);
            }
        }, 5);
    }, []);

    return (
        <div className="whoami">
            <CodeEditor className="code" value={codeSection} language="typescript" readOnly></CodeEditor>
        </div>
    );
};

export default WhoAmISection;
