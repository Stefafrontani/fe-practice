import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import classNames from 'classnames';
import dropdownStyles from './styles';
import { CreateDocActions } from '../../actions/createDocActions';

interface OptionItem {
  id: string,
  value: string
}

interface DropdownProps {
  action: (docType: string) => CreateDocActions,
  name: string,
  options: OptionItem[],
  title: string,
  className?: string,
}

const createOptions = (opt: OptionItem) => (
  <option key={opt.id} value={opt.id}>{opt.value}</option>
);

const renderOptions = (options: OptionItem[]) => options.map(createOptions);

const Dropdown: React.FC<DropdownProps> = (props) => {

  const { action, className, name, options, title } = props;
  const [dropdownValue, setDropdownValue] = React.useState<string | number>();
  const classes = dropdownStyles();
  const rootClass = classNames(classes.root, className);

  const getDocumentType = (id: string) => {
    const type = options.filter(opt => opt.id === id);
    if (!type || !type.length) return '';
    return type[0].value;
  }

  const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
    const value = event.target.value;
    setDropdownValue(value);
    action(getDocumentType(value));
  };

  return (
    <div className={rootClass}>
      <FormControl className={classes.formControl}>
        <InputLabel id={`select-${name}-label`}>{title}</InputLabel>
        <Select
          id={`select-${name}`}
          labelId={`select-${name}-label`}
          native
          onChange={handleChange}
          value={dropdownValue}
        >
          <option aria-label="None" value="" />
          {renderOptions(options)}
        </Select>
      </FormControl>
    </div>
  );
}

export default Dropdown;
