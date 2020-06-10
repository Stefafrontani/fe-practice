import React, { useState, useMemo } from 'react';

// Interfaces START

export interface Validator {
  (value: string): string;
}

interface FormInput {
  value: string;
  validators: Validator[];
}
interface ParameterKeyFunction<T> {
  (key: string): T;
}
interface ParameterValueFunction<T> {
  (value: FormInput, key: string): T;
}

interface Dictionary<T> {
  [key: string]: T;
}

// Interfaces END

// Hook START
const useForm = (fieldsSettings: Dictionary<FormInput>) => {
  const convertArrayToObject = (
    dataSource: Dictionary<FormInput>,
    createKey: ParameterKeyFunction<string>,
    createValue: ParameterValueFunction<any>
  ) =>
    Object.entries(dataSource).reduce(
      (object: Dictionary<any>, item: [string, FormInput]) => {
        let [key, value] = item;
        object[createKey(key)] = createValue(value, key);
        return object;
      },
      {}
    );

  const calculateErrorsForValue = (
    value: string,
    validators: Validator[]
  ): string[] => {
    let errors: string[] = [];
    for (let validator of validators) {
      let errorMessage: string = validator(value);
      if (errorMessage) {
        errors.push(errorMessage);
      }
    }
    return errors;
  };

  const getValidatorsByKey = (key: string) => {
    return fieldsSettings[key].validators || [];
  };

  const [values, setValues] = useState<Dictionary<string>>(
    convertArrayToObject(
      fieldsSettings,
      (key) => key,
      (value) => value.value || ''
    )
  );
  const [formErrors, setFormErrors] = useState<Dictionary<[]>>(
    convertArrayToObject(
      fieldsSettings,
      (key) => key,
      (value, key) =>
        calculateErrorsForValue(value.value, getValidatorsByKey(key))
    )
  );

  const disableSubmit = useMemo<boolean>(() => {
    return !![].concat(...Object.values(formErrors)).length;
  }, [formErrors]);

  const shouldUpdateFormErrors = (
    newErrors: string[],
    oldErrors: string[]
  ): boolean => {
    let shouldUpdate = newErrors.length !== oldErrors.length;

    if (!shouldUpdate) {
      for (let i = 0; i < newErrors.length; i++) {
        if (newErrors[i] !== oldErrors[i]) {
          shouldUpdate = true;
          break;
        }
      }
    }

    return shouldUpdate;
  };

  const onChange = (event: React.ChangeEvent<{ name: any; value: any }>) => {
    const { name, value } = event.target;

    if (getValidatorsByKey(name).length) {
      const newErrors = calculateErrorsForValue(
        value,
        getValidatorsByKey(name)
      );
      const oldErrors = formErrors[name];

      if (shouldUpdateFormErrors(newErrors, oldErrors)) {
        setFormErrors((previousErrors) => ({
          ...previousErrors,
          [name]: newErrors,
        }));
      }
    }

    setValues((previousValues) => ({ ...previousValues, [name]: value }));
  };

  return { values, onChange, errors: formErrors, disableSubmit };
};
// Hook END

export { useForm };
