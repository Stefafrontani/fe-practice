import * as constants from '../constants/actionTypes';

//define action interfaces
export interface SetDocType {
    type: typeof constants.SET_DOC_TYPE;
    payload: string;
}

//define actions
export const setDocType = (docType: string): SetDocType => ({
   type: constants.SET_DOC_TYPE,
   payload: docType
});

export type CreateDocActions = SetDocType;