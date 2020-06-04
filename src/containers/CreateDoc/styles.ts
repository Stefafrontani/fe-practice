import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";

const createDocStyles = makeStyles((theme: Theme) => ({
    openPdfButton: {
        margin: theme.spacing(2),
    },
}));

export default createDocStyles;
