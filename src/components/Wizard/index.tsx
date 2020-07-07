import React from 'react';
import Button from "@material-ui/core/Button";
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from "../../reducers/rootReducer";
import { 
  setCurrentStep as setCurrentStepAction,
  setStepsCompleted as setStepsCompletedAction,
  SetCurrentStep,
  SetStepsCompleted
} from "../../actions/docSteps";

interface PrevBtn {
  currentStep: number,
  setCurrentStep: (step: number) => SetCurrentStep,
}

interface NextBtn {
  currentStep: number,
  setCurrentStep: (step: number) => SetCurrentStep,
  totalSteps: number
}

interface FinishBtn {
  currentStep: number,
  setStepsCompleted: () => SetStepsCompleted,
  totalSteps: number,
}

const PreviousButton: React.FC<PrevBtn> = ({ currentStep, setCurrentStep }) => {
  if (currentStep <= 0) return null;
  return (
    <Button onClick={() => setCurrentStep(currentStep - 1)}>Previous</Button>
  );
}

const NextButton: React.FC<NextBtn> = ({ currentStep, setCurrentStep, totalSteps }) => {
  if (currentStep >= totalSteps - 1) return null;
  return (
    <Button onClick={() => setCurrentStep(currentStep + 1)}>Next</Button>
  );
}

const FinishButton: React.FC<FinishBtn> = ({ currentStep, setStepsCompleted, totalSteps }) => {
  if (currentStep !== totalSteps - 1) return null;
  return (
    <Button onClick={setStepsCompleted}>Finish</Button>
  );
}

const Wizard: React.FC<Props> = (props) => {
  const { children, docSteps, setCurrentStep, setStepsCompleted } = props;
  const currentStep = docSteps.currentStep || 0;
  const steps = docSteps.steps;
  const totalSteps = docSteps.steps.length;
  return (
    <div className="wizard">
      {children}
      {steps && (
        <div className="action-buttons">
          <PreviousButton currentStep={currentStep} setCurrentStep={setCurrentStep} />
          <NextButton currentStep={currentStep} setCurrentStep={setCurrentStep} totalSteps={totalSteps} />
          <FinishButton currentStep={currentStep} setStepsCompleted={setStepsCompleted} totalSteps={totalSteps} />
        </div>
      )}
    </div>
  );
};

const mapDispatch = {
  setCurrentStep: (step: number) => setCurrentStepAction(step),
  setStepsCompleted: setStepsCompletedAction
}

const mapState = (state: RootState) => ({
  docSteps: state.docSteps
})

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

export default connector(Wizard);
