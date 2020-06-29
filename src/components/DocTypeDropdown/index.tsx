import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import classNames from 'classnames';
import dropdownStyles from './styles';
import { useSelector } from '../../reducers/rootReducer';

type reduxDropdownState = "documentType";

interface OptionItem {
  id: string,
  value: string
}

interface DropdownProps {
  handleChange: (event: React.ChangeEvent<{ value: any }>) => void,
  name: reduxDropdownState,
  options: OptionItem[],
  title: string,
  className?: string,
}

const createOptions = (opt: OptionItem) => (
  <option key={opt.id} value={opt.id}>{opt.value}</option>
);

const renderOptions = (options: OptionItem[]) => options.map(createOptions);

const DocTypeDropdown: React.FC<DropdownProps> = (props) => {

  const { className, handleChange, name, options, title } = props;
  const documentType = useSelector(state => state.createDoc[name]);
  const classes = dropdownStyles();
  const rootClass = classNames(classes.root, className);

  return (
    <div className={rootClass}>
      <FormControl className={classes.formControl}>
        <InputLabel id={`select-${name}-label`}>{title}</InputLabel>
        <Select
          id={`select-${name}`}
          labelId={`select-${name}-label`}
          native
          onChange={handleChange}
          value={documentType}
        >
          <option aria-label="None" value="" />
          {renderOptions(options)}
        </Select>
      </FormControl>
    </div>
  );
}

export default DocTypeDropdown;
