import PdfMake from 'pdfmake/build/pdfmake';

import { TDocumentDefinitions} from 'types'

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

function createPdf(pdfType: string = 'default') {
    return PdfMake.createPdf(pdfDefinitions[pdfType]);
}

export { createPdf };