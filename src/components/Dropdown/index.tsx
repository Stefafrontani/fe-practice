import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import classNames from 'classnames';
import dropdownStyles from './styles';

interface OptionItem {
  id: number,
  value: string
}

interface OptionsListProps {
  options: OptionItem[],
}

interface DropdownProps {
  name: string,
  options: OptionItem[],
  title: string,
  className?: string,
}

const OptionsList: React.FC<OptionsListProps> = (props) => {
  
  const { options } = props;

  if (options && options.length) {
    return (
      <div>
        {options.map((opt) => (
          <MenuItem key={opt.id} value={opt.id}>{opt.value}</MenuItem>
        ))}
      </div>
    );
  }

  return null;
}

const Dropdown: React.FC<DropdownProps> = (props) => {

  const { className, name, options, title } = props;
  const [dropdownValue, setDropdownValue] = React.useState<string | number>();
  const classes = dropdownStyles();
  const rootClass: string = classNames(classes.root, className);

  const handleChange = (event: React.ChangeEvent<{ value: any }>) => { 
    setDropdownValue(event.target.value);
  };

  return (
    <div className={rootClass}>
      <FormControl className={classes.formControl}>
        <InputLabel id={`select-${name}-label`}>{title}</InputLabel>
        <Select
          id={`select-${name}`}
          labelId={`select-${name}-label`}
          onChange={handleChange}
          value={dropdownValue}
        >
          <OptionsList options={options} />
        </Select>
      </FormControl>
    </div>
  );
}

export default Dropdown;
