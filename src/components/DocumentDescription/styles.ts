import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

const documentDescriptionStyles = makeStyles((theme: Theme) => ({
    documentTitle: {
        fontSize: "22px",
        fontWeight: 500,
        padding: "10px 0px",
        textAlign: "center",
    },
    documentContent: {
        fontSize: "18px",
        textAlign: "left",
    }
}));

export default documentDescriptionStyles;