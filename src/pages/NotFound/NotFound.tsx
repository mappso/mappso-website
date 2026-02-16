import React from 'react';
import SEO from '../../components/SEO';

interface Props {

}

const NotFound: React.FC<Props> = (props) => {
   return (
      <div>
         <SEO title="Page Not Found" description="The page you're looking for doesn't exist." />
         <h1>404 - Page not found</h1>
      </div>
   );
}

export default NotFound;