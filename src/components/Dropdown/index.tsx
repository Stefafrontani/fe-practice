import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import classNames from 'classnames';
import useStyles from './styles';

type DropdownOption = {
  id: number,
  value: string
}

type DropdownProps = {
  name: string,
  options: DropdownOption[],
  title: string,
  className?: string,
}

const renderOptions = (options: DropdownOption[]) => options.map((opt) => (
  <MenuItem key={opt.id} value={opt.id}>{opt.value}</MenuItem>
));

const Dropdown: React.FC<DropdownProps> = (props) => {
  
  const { className, name, options, title } = props;
  const [dropdownValue, setDropdownValue] = React.useState<string | number>();
  const classes = useStyles();
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
          {options && options.length && renderOptions(options)}
        </Select>
      </FormControl>
    </div>
  );
}

export default Dropdown;
