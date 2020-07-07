import * as constants from '../constants/actionTypes';
import { Step } from '../reducers/docStepsReducer';

//define action interfaces
export interface SetStepsCompleted {
    type: typeof constants.SET_STEPS_COMPLETED;
}

export interface SetCurrentStep {
    type: typeof constants.SET_CURRENT_STEP;
    payload: number;
}

export interface SetDocSteps {
    type: typeof constants.SET_DOC_STEPS;
    payload: Step[];
}

//define actions
export const setStepsCompleted = (): SetStepsCompleted => ({
   type: constants.SET_STEPS_COMPLETED
});

export const setCurrentStep = (currentStep: number): SetCurrentStep => ({
    type: constants.SET_CURRENT_STEP,
    payload: currentStep
 });

export const setDocSteps = (steps: Step[]): SetDocSteps => ({
    type: constants.SET_DOC_STEPS,
    payload: steps
});

export type DocStepsActionsTypes = SetStepsCompleted | SetCurrentStep | SetDocSteps;
