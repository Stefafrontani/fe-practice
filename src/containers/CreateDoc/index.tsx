import React from 'react';
import Dropdown from '../../components/Dropdown';
import documentTypes from './config';
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
            <Dropdown name="documentType" title="Document type" options={documentTypes} />
            <button onClick={openPdf}>See preview</button>
            <button onClick={downloadPdf}>Download PDF</button>
        </React.Fragment>
    );
}

export default CreateDoc;