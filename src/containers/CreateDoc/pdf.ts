import PdfMake from 'pdfmake/build/pdfmake';

import { TDocumentDefinitions } from 'types';
import { TCreatedPdf } from 'types';

type PdfType = 'default' | 'sOne';

const pdfDefinitions: Record<PdfType, TDocumentDefinitions> = {
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

function createPdf(pdfType: PdfType = 'default'): TCreatedPdf {
    return PdfMake.createPdf(pdfDefinitions[pdfType]);
}

export { createPdf };