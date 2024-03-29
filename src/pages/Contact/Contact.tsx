import React, { useEffect, useRef } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import copy from "copy-to-clipboard";
import "./Contact.scss";

interface Props { }

const Contact: React.FC<Props> = (props) => {
   const clipBoardElements = ["contact@mappso.com", "42149705"];
   const initializedRef = useRef(false); // Ref to track initialization

   const addToClipboardAction = (span: Element) => {
      let clipBoardElement = "";

      for (const possibleElement of clipBoardElements) {
         if (span.innerHTML.includes(possibleElement)) {
            clipBoardElement = possibleElement;
         }
      }

      const button = document.createElement("button");
      button.classList.add("copy");
      button.addEventListener("click", () => {
         copy(clipBoardElement);
      });

      const parent = span.parentNode;
      parent?.replaceChild(button, span);
      button.appendChild(span);
   };

   const code = `const mail = "contact@mappso.com";\nconst cvr = "42149705";`;

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


   useEffect(() => {
      if (!done) return;

      if (!initializedRef.current) {
         const spanNodes = document.querySelectorAll("span.token.string");

         for (const span of spanNodes) {
            if (clipBoardElements.some((e) => span.innerHTML.includes(e))) {
               addToClipboardAction(span);
            }
         }
         initializedRef.current = true;
      }
   }, [clipBoardElements, done]);


   return (
      <div className="contact">
         <CodeEditor
            className="code"
            value={sub}
            language="typescript"
            readOnly
         ></CodeEditor>
      </div>
   );
};

export default Contact;
