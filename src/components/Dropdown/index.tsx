import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import classNames from 'classnames';
import dropdownStyles from './styles';

interface OptionItem {
  id: number,
  value: string
}

type DropdownValue = string | number | undefined;

interface DropdownProps {
  className?: string,
  name: string,
  onChange: (event: React.ChangeEvent<{ value: any }>) => void,
  options: OptionItem[],
  title: string,
  value: DropdownValue,
}

const createOptions = (opt: OptionItem) => (
  <option key={opt.id} value={opt.id}>{opt.value}</option>
);

const renderOptions = (options: OptionItem[]) => options.map(createOptions);

const Dropdown: React.FC<DropdownProps> = (props) => {

  const { className, name, options, title, onChange, value} = props;
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
          onChange={onChange}
          value={value}
        >
          <option aria-label="None" value="" />
          {renderOptions(options)}
        </Select>
      </FormControl>
    </div>
  );
}

export default Dropdown;
