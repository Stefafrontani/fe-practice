import React from 'react';
import documentDescriptionStyles from './styles';
import { useSelector } from '../../reducers/rootReducer';
import messages from './messages';

interface DocumentDescriptionProps {
  className?: string,
  documentId?: string,
}

const getDocumentContent = (documentType: string | null) => {
    switch (documentType) {
        case "1":
            return {
                title: messages.tutelaTitle,
                description: messages.tutelaDescription
            }
        case "2":
            return {
                title: messages.contratoTitle,
                description: messages.contratoDescription
            }
        default:
            return {
                title: messages.tutelaTitle,
                description: messages.tutelaDescription
            }
    }
}

const DocumentDescription: React.FC<DocumentDescriptionProps> = (props) => {

  const { className } = props;
  const documentTypeId = useSelector(state => state.createDoc.documentType);
  const classes = documentDescriptionStyles();
  const content = getDocumentContent(documentTypeId);

  return (
    <div className={className}>
        <h4 className={classes.documentTitle}>{content.title}</h4>
        <p className={classes.documentContent}>
            {content.description}
        </p>
    </div>
  );
}

export default DocumentDescription;
