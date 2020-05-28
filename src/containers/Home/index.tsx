import React from 'react';
import { useTypedSelector } from '../../store';

const Home: React.FC = () => {
  const docType = useTypedSelector(state => state.createDoc.docType);
  return <>
    <h2>Home</h2>
    {<p>Selected document type: {docType}</p>}
  </>
}

export default Home;
