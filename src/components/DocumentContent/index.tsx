import React from 'react';
import documentContentStyles from './styles';
import { useSelector } from '../../reducers/rootReducer';
import config from './config';

interface DocumentContentProps {
  className?: string,
  documentId?: string,
}

const getDocumentContent = (documentType: string | null) => {
    if (!documentType) {
        return config["default"];
    }
    return config[documentType];
}

const DocumentContent: React.FC<DocumentContentProps> = (props) => {

  const { className } = props;
  const documentTypeId = useSelector(state => state.createDoc.documentType);
  const classes = documentContentStyles();
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

export default DocumentContent;
