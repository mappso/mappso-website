import React from 'react';
import './Contact.scss';
interface Props {

}

const Contact: React.FC<Props> = (props) => {
   return (
      <div className="contact">
         <h1>Contact me at</h1>
         <br/>
         <p>contact@mappso.com</p>
      </div>
   );
}

export default Contact;