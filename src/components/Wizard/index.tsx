import React from 'react';
import Button from "@material-ui/core/Button";
import './styles.css';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, useSelector } from "../../reducers/rootReducer";
import { 
  setCurrentStep as setCurrentStepAction,
  setStepsCompleted as setStepsCompletedAction
} from "../../actions/docSteps";

const Wizard: React.FC<Props> = (props) => {
  const { children, docSteps, setCurrentStep, setStepsCompleted } = props;
  const currentStep = useSelector(state => state.docSteps.currentStep) || 0;
  const steps = useSelector(state => state.docSteps.steps);
  return (
    <div className="wizard">
      {children}
      {steps && (
        <div className="action-buttons">
          {currentStep > 0 && <Button onClick={() => setCurrentStep(currentStep - 1)}>Previous</Button>}
          {currentStep < docSteps.steps.length && <Button onClick={() => setCurrentStep(currentStep + 1)}>Next</Button>}
          {currentStep === docSteps.steps.length && <Button onClick={setStepsCompleted}>Finish</Button>}
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
