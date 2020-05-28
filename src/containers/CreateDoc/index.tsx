import React, { useState } from "react";
import Dropdown from "../../components/Dropdown";
import documentTypes from "./config";
import { createPdf } from "./pdf";
import "./createDoc.css";

import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import VisibilityIcon from "@material-ui/icons/Visibility";
import createDocStyles from "./styles";
import DeleteIcon from "@material-ui/icons/Delete";

const CreateDoc: React.FC = () => {
  const [docProcessInitialized, handleProcessInitialization] = useState<
    Boolean
  >(false);

  const classes = createDocStyles();

  function openPdf(): void {
    createPdf().open();
  }

  function downloadPdf(): void {
    createPdf().download();
  }

  return (
    <section className="page_main">
      <div className="page__content">
        <ul className="Dont-know-what-is-this">
          <li>Tutela</li>
          <li>Contrato</li>
          <li>Demanda</li>
          <li>Sugerencia documento</li>
        </ul>
        <div className="page__content__information">
          <div className="information">
            <h4 className="information__title">¿Qué es una tutela?</h4>
            <p className="information__explanation">
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
        </div>
        <div className="page__content__instructions">
          <div className="instructions">
            <h4 className="instructions__title">¿Qué debo hacer?</h4>
            <p className="instructions__explanation">
              Puedes leer mas información general sobre la tutela
              a la izquierda o comenzar a crearla con el botón
              "Iniciar documento"
            </p>
            <p className="instructions__explanation">
              Una vez inicializado el proceso, puedes cancelarlo
              en cualquier momento haciendo click en el botón
              "Cancelar Documento"
            </p>
          </div>
        </div>
        <div className="page__content__document">
          {docProcessInitialized ? (
            <Button
              onClick={() => handleProcessInitialization(false)}
              startIcon={<DeleteIcon />}
            >
              Cancelar Documento
            </Button>
          ) : (
              <Button
                color="default"
                onClick={() => handleProcessInitialization(true)}
              >
                Iniciar Documento
              </Button>
            )}
          {docProcessInitialized ? (
            <React.Fragment>
              <Dropdown
                name="documentType"
                title="Document type"
                options={documentTypes}
              />
              <Button
                onClick={openPdf}
                variant="contained"
                color="default"
                classes={classes}
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
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default CreateDoc;
