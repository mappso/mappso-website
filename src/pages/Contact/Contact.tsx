import React, { useEffect } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import copy from "copy-to-clipboard";
import "./Contact.scss";

interface Props {}

const Contact: React.FC<Props> = (props) => {
    const clipBoardElements = ["contact@mappso.com", "42149705"];

    const addToClipboardAction = (span: Element) => {
        let clipBoardElement = "";

        for (const possibleElement of clipBoardElements) {
            if (span.innerHTML.includes(possibleElement)) {
                clipBoardElement = possibleElement;
            }
        }

        const button = document.createElement("button");

        button.classList.add("no-style");

        button.addEventListener("click", () => {
            copy(clipBoardElement);
        });

        const parent = span.parentNode;
        parent?.replaceChild(button, span);

        button.appendChild(span);
    };

    const code = `const mail = "contact@mappso.com";
const cvr = "42149705";`;

    useEffect(() => {
        const spanNodes = document.querySelectorAll("span.token.string");

        for (const span of spanNodes) {
            if (clipBoardElements.some((e) => span.innerHTML.includes(e))) {
                addToClipboardAction(span);
            }
        }
    }, []);

    return (
        <div className="contact">
            <CodeEditor
                className="code"
                value={code}
                language="typescript"
                // rehypePlugins={[
                //    [rehypePrism as any, { ignoreMissing: true }],
                //    [
                //      rehypeRewrite as any,
                //      {
                //        rewrite: (node: any, index: number, parent: any) => {
                //          if (node.properties?.className?.includes("code-line")) {
                //            if (index === 0 && node.properties?.className) {
                //              node.properties.className.push("demo01");
                //              // console.log("~~~", index, node.properties?.className);
                //            }
                //          }
                //          if (node.type === "text" && node.value === "return" && parent.children.length === 1) {
                //            parent.properties.className.push("demo123");
                //          }
                //        }
                //      }
                //    ]
                //  ]}
                readOnly
            ></CodeEditor>
        </div>
    );
};

export default Contact;
