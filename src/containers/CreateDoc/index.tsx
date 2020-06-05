import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import GetAppIcon from "@material-ui/icons/GetApp";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Dropdown from "../../components/Dropdown";
import documentTypes from "./config";
import { createPdf } from "./pdf";
import createDocClasses from "./styles";
import "./createDoc.css";

const CreateDoc: React.FC = () => {
  const [docInitialized, setDocInitialization] = useState<Boolean>(false);

  const docClasses = createDocClasses();

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
        <h4 className="content__information-title">¿Qué es una tutela?</h4>
        <p className="content__information-explanation">
          Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Excepteur sint occaecat
          cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum. Consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute
          irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa
          qui officia deserunt mollit anim id est laborum.
        </p>
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
          <React.Fragment>
            <Button
              onClick={handleDocInitialization}
              startIcon={<DeleteIcon />}
              data-docinitialized={false}
            >
              Cancelar Documento
              </Button>
            <Dropdown
              name="documentType"
              title="Document type"
              options={documentTypes}
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
          </React.Fragment>
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

export default CreateDoc;
