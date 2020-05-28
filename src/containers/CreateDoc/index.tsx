import React from 'react';
import Dropdown from '../../components/Dropdown';
import documentTypes from './config';
import { createPdf } from './pdf';
import { connect } from 'react-redux'
import { setDocType } from './createDocSlice';

interface CreateDocProps {
    setDocType: (value: string) => void,
}

const getDocumentType = (id: Number) => {
    const type = documentTypes.filter(type => type.id === id);
    if (!type || !type.length) return '';
    return type[0].value;
}

const CreateDoc: React.FC<CreateDocProps> = ({ setDocType }) => {

    const [dropdownValue, setDropdownValue] = React.useState<string | number>();

    const handleDropdownChange = (event: React.ChangeEvent<{ value: any }>) => { 
        const value = Number(event.target.value);
        setDropdownValue(value);
        setDocType(getDocumentType(value));
    };

    function openPdf(): void {
        createPdf().open();
    }

    function downloadPdf() : void {
        createPdf().download();
    }

    return (
        <React.Fragment>
            <h1>CreateDoc Page</h1>
            <Dropdown 
                name="documentType" 
                title="Document type" 
                options={documentTypes}
                onChange={handleDropdownChange}
                value={dropdownValue} 
            />
            <button onClick={openPdf}>See preview</button>
            <button onClick={downloadPdf}>Download PDF</button>
        </React.Fragment>
    );
}

const mapDispatch = { setDocType };

export default connect(null, mapDispatch)(CreateDoc);