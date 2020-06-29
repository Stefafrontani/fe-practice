import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from 'react-redux';
import VisibilityIcon from "@material-ui/icons/Visibility";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import GetAppIcon from "@material-ui/icons/GetApp";
import Dropdown from "../../components/DocTypeDropdown";
import DocumentContent from "../../components/DocumentContent";
import Wizard from "../../components/Wizard";
import documentTypes from "./config";
import { createPdf } from "./pdf";
import { setDocType as setDocTypeAction } from "../../actions/createDoc";
import { 
  setCurrentStep as setCurrentStepAction,
  setDocSteps as setDocStepsAction 
} from "../../actions/docSteps";
import { Step } from '../../reducers/docStepsReducer';
import { RootState } from "../../reducers/rootReducer";
import createDocClasses from "./styles";
import "./createDoc.css";

const initialDocSteps = [
  {
    title: "Name",
    component: <input placeholder="name" />
  },
  {
    title: "Last Name",
    component: <input placeholder="name" />
  },
  {
    title: "Age",
    component: <select>
        <option value="value1">20</option> 
        <option value="value2" selected>30</option>
        <option value="value3">40</option>
      </select>
  },
];

const CreateDoc: React.FC<Props> = (props) => {
  const [docInitialized, setDocInitialization] = useState<Boolean>(false);
  const { docSteps, setCurrentStep, setDocSteps } = props;
  const { currentStep, steps } = docSteps;
  const docClasses = createDocClasses();

  useEffect(() => {
    // initial config hard coded to show an example
    setDocSteps(initialDocSteps);
    setCurrentStep(0);
  }, []);

  function openPdf(): void {
    createPdf().open();
  }

  function downloadPdf(): void {
    createPdf().download();
  }

  function handleDocInitialization(event: React.MouseEvent<HTMLButtonElement>): void {
    const button = event.currentTarget;
    const buttonDataAttributes = button.dataset;
    const docinitialized = buttonDataAttributes.docinitialized || 'false';
    const parsedDocInitialized: boolean = JSON.parse(docinitialized);

    setDocInitialization(parsedDocInitialized);
  }

  const handleDropdownChange = (event: React.ChangeEvent<{ value: any }>) => {
    props.setDocType(event.target.value);
  };

  return (
    <div className="content">
      <ul>
        <li>Tutela</li>
        <li>Contrato</li>
        <li>Demanda</li>
        <li>Sugerencia documento</li>
      </ul>
      {/* TODO All of that text info should come from a config or endpoint data */}
      <div className="content__information">
        <DocumentContent />
      </div>
      <div className="content__instructions">
        <h4 className="content__instructions-title">¿Qué debo hacer?</h4>
        <p className="content__instructions-explanation">
          Puedes leer mas información general sobre la tutela
          a la izquierda o comenzar a crearla con el botón
          "Iniciar documento"
          </p>
        <p className="content__instructions-explanation">
          Una vez inicializado el proceso, puedes cancelarlo
          en cualquier momento haciendo click en el botón
          "Cancelar Documento"
          </p>
      </div>
      <div>
        {docInitialized ? (
          <Wizard>
            <Button
              onClick={handleDocInitialization}
              startIcon={<DeleteIcon />}
              data-docinitialized={false}
            >
              Cancelar Documento
              </Button>
            <Dropdown 
                name="documentType" 
                options={documentTypes} 
                handleChange={handleDropdownChange} 
                title="Document type" 
            />
            <Button
              onClick={openPdf}
              variant="contained"
              color="default"
              className={docClasses.openPdfButton}
              startIcon={<VisibilityIcon />}
            >
              Ver archivo
              </Button>
            <Button
              onClick={downloadPdf}
              variant="contained"
              color="default"
              startIcon={<GetAppIcon />}
            >
              Descargar pdf
            </Button>
            {/* TODO: This should be in a new component */}
            {(steps && currentStep !== null) && (
              <div>
                <p>{steps[currentStep].title}</p>
                <p>{steps[currentStep].component}</p>
              </div>
            )}
          </Wizard>
        ) : (
            <Button
              color="default"
              onClick={handleDocInitialization}
              data-docinitialized={true}
            >
              Iniciar Documento
            </Button>
          )}
      </div>
    </div>
  );
};

const mapDispatch = {
    setDocType: (docType: string) => setDocTypeAction(docType),
    setDocSteps: (steps: Step[]) => setDocStepsAction(steps),
    setCurrentStep: (step: number) => setCurrentStepAction(step),
}

const mapState = (state: RootState) => ({
    docType: state.createDoc.documentType,
    docSteps: state.docSteps
})

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

export default connector(CreateDoc);
