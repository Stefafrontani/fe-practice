import * as constants from '../constants/actionTypes';
import { DocStepsActionsTypes } from '../actions/docSteps';
import { ReactNode } from 'react';

export interface Step {
    title: string,
    component: ReactNode
}

interface DocStepsState {
    completed: boolean,
    currentStep: number | null,
    steps: Step[] | []
};

const initialState: DocStepsState = { 
    currentStep: null,
    completed: false, 
    steps: []
};

export default function docStepsReducer(
    state = initialState, 
    action: DocStepsActionsTypes
): DocStepsState {
    switch (action.type) {
        case constants.SET_CURRENT_STEP:
            return {
                ...state,
                currentStep: action.payload
            }
        case constants.SET_STEPS_COMPLETED:
            return {
                ...state,
                completed: true,
                currentStep: null,
                steps: []
            }
        case constants.SET_DOC_STEPS:
            return {
                ...state,
                steps: action.payload
            }
        default:
            return state;
    }
}
