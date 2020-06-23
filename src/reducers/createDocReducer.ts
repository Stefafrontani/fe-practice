import * as constants from '../constants/actionTypes';
import { CreateDocActionsTypes } from '../actions/createDoc';

interface CreateDocState {
    documentType: string | null;
};

const initialState: CreateDocState = { 
    documentType: null 
};

export default function createDocReducer(
    state = initialState, 
    action: CreateDocActionsTypes
): CreateDocState {
    switch (action.type) {
        case constants.SET_DOC_TYPE:
            return {
                ...state,
                documentType: action.payload
            }
        default:
            return state;
    }
}
