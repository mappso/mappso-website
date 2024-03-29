import React, { useEffect } from "react";
import { ResumeSectionModel } from "../models/resumeModel";
import CodeEditor from "@uiw/react-textarea-code-editor";

import "./WhoAmI.scss";

interface Props { }

const WhoAmISection: ResumeSectionModel<Props> = (props) => {
    const code =
        `namespace Resume;

public static class Founder
{
    public const string Name = "Milo Jørgensen";
    public const string Location = "Aarhus, Denmark";
}`;


    const characterDelay = 20;
    const [sub, setSub] = React.useState<string>("");
    const [done, setDone] = React.useState<boolean>(false);

    useEffect(() => {
        if (sub.length == code.length) {
            setDone(true);
            return;
        };

        const interval = setInterval(() => {
            setSub(sub + code[sub.length]);
        }, characterDelay);
        return () => clearInterval(interval);
    }, [sub]);

    return (
        <div className="contact">
            <CodeEditor
                className="code"
                value={sub}
                language="csharp"
                readOnly
            ></CodeEditor>
        </div>
    );
};

export default WhoAmISection;
