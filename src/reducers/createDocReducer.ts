import * as constants from '../constants/actionTypes';
import { CreateDocActions } from '../actions/createDocActions';

interface CreateDocState {
    documentType: string | null;
};

const initialState: CreateDocState = { 
    documentType: null 
};

export default function createDocReducer(
    state = initialState, 
    action: CreateDocActions
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
