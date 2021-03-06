import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

const dropdownStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 140,
  },
}));

export default dropdownStyles;