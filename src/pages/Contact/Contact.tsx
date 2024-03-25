import React from 'react';
import CodeEditor from "@uiw/react-textarea-code-editor";
import "./Contact.scss";

interface Props {

}

const Contact: React.FC<Props> = (props) => {
   const code = `
const mail = "contact@mappso.com";
const cvr = "42149705";
`;
   return (
      <div className="contact">
         <CodeEditor className="code" value={code} language="typescript" readOnly></CodeEditor>
      </div>
   );
}

export default Contact;