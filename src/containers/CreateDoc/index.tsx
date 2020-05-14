import React from 'react';
import { createPdf } from './pdf';

const CreateDoc: React.FC = () => {

    function openPdf(): void {
        createPdf().open();
    }

    function downloadPdf() : void {
        createPdf().download();
    }

    return (
        <React.Fragment>
            <h1>CreateDoc Page</h1>
            <button onClick={openPdf}>See preview</button>
            <button onClick={downloadPdf}>Download PDF</button>
        </React.Fragment>
    );
}

export default CreateDoc;