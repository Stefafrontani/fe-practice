import React, { useState, useMemo } from 'react';

// Interfaces START

export interface Validator {
  (value: string): string;
}

interface FormInput {
  field: string;
  value: string;
  validators: Validator[];
}
interface ParameterFunction<T> {
  (value: FormInput): T;
}

interface Dictionary<T> {
  [key: string]: T;
}

// Interfaces END

// Hook START
const useForm = (fieldsSettings: FormInput[]) => {
  const convertArrayToObject = (
    dataSource: FormInput[],
    createKey: ParameterFunction<string>,
    createValue: ParameterFunction<any>
  ) =>
    dataSource.reduce((object: Dictionary<any>, item: FormInput) => {
      object[createKey(item)] = createValue(item);
      return object;
    }, {});

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

  const [validatorsByKey] = useState<Dictionary<[]>>(
    convertArrayToObject(
      fieldsSettings,
      (item) => item.field,
      (item) => item.validators || []
    )
  );

  const [fields, setFields] = useState<Dictionary<string>>(
    convertArrayToObject(
      fieldsSettings,
      (item) => item.field,
      (item) => item.value || ''
    )
  );
  const [formErrors, setFormErrors] = useState<Dictionary<[]>>(
    convertArrayToObject(
      fieldsSettings,
      (item) => item.field,
      (item) => calculateErrorsForValue(item.value, validatorsByKey[item.field])
    )
  );

  const disableForm = useMemo<boolean>(() => {
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

    if (validatorsByKey[name].length) {
      const newErrors = calculateErrorsForValue(value, validatorsByKey[name]);
      const oldErrors = formErrors[name];

      if (shouldUpdateFormErrors(newErrors, oldErrors)) {
        setFormErrors((previousErrors) => ({
          ...previousErrors,
          [name]: newErrors,
        }));
      }
    }

    setFields((previousFields) => ({ ...previousFields, [name]: value }));
  };

  return { fields, onChange, errors: formErrors, disableForm };
};
// Hook END

export { useForm };
