import PdfMake from 'pdfmake/build/pdfmake';

import { TDocumentDefinitions } from 'types';
import { TCreatedPdf } from 'types';

interface PdfDefinitions {
    [pdfDefinition: string]: TDocumentDefinitions
}

const pdfDefinitions: PdfDefinitions = {
    default : {
        content: 'Content',
        header: 'Header',
        footer: 'Footer'
    },
    sOne: {
        content: 'Content',
        header: 'Header',
        footer: 'Footer',
        background: 'background'
    }
}

function createPdf(pdfType: string = 'default'): TCreatedPdf {
    return PdfMake.createPdf(pdfDefinitions[pdfType]);
}

export { createPdf };