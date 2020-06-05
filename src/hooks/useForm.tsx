import React, { useState, useMemo } from 'react';

// Interfaces START

interface Validator {
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
const useForm = (settings: FormInput[]) => {
  const convertArrayToObject = (
    arraySource: FormInput[],
    keyFunction: ParameterFunction<string>,
    valueFunction: ParameterFunction<any>
  ) =>
    arraySource.reduce((object: Dictionary<any>, item: FormInput) => {
      object[keyFunction(item)] = valueFunction(item);
      return object;
    }, {});

  const calculateErrorList = (
    value: string,
    errorFunctions: Validator[]
  ): string[] => {
    let errorArray: string[] = [];
    for (let errorFunction of errorFunctions) {
      let errorMessage: string = errorFunction(value);
      if (errorMessage) {
        errorArray.push(errorMessage);
      }
    }
    return errorArray;
  };

  const validatorsByKey: Dictionary<[]> = useMemo(() => {
    return convertArrayToObject(
      settings,
      (item) => item.field,
      (item) => item.validators || []
    );
  }, []);

  const [fields, setFields] = useState<Dictionary<string>>(
    convertArrayToObject(
      settings,
      (item) => item.field,
      (item) => item.value || ''
    )
  );
  const [errors, setErrors] = useState<Dictionary<[]>>(
    convertArrayToObject(
      settings,
      (item) => item.field,
      (item) => calculateErrorList(item.value, validatorsByKey[item.field])
    )
  );

  const disableForm: boolean = useMemo(() => {
    return !![].concat(...Object.values(errors)).length;
  }, [errors]);

  const onChange = (event: React.ChangeEvent<{ name: any; value: any }>) => {
    const { name, value } = event.target;

    if (validatorsByKey[name].length) {
      const newErrorList: string[] = calculateErrorList(
        value,
        validatorsByKey[name]
      );
      const oldErrorList: string[] = errors[name];

      let shouldUpdateErrors: boolean =
        newErrorList.length !== oldErrorList.length;

      if (!shouldUpdateErrors) {
        for (let i = 0; i < newErrorList.length; i++) {
          if (newErrorList[i] !== oldErrorList[i]) {
            shouldUpdateErrors = true;
            break;
          }
        }
      }

      if (shouldUpdateErrors) {
        setErrors((previousErrors) => ({
          ...previousErrors,
          [name]: newErrorList,
        }));
      }
    }

    setFields((previousFields) => ({ ...previousFields, [name]: value }));
  };

  return { fields, onChange, errors, disableForm };
};
// Hook END

// Validator functions START
export const isRequired: Validator = (value: string) =>
  !value ? 'is required' : '';

export const isEmail: Validator = (value) =>
  !/.+@.+\.[A-Za-z]+$/.test(value) ? 'has wrong format' : '';

export const maxChars = (maxChars: number): Validator => (value: string) =>
  value.length >= maxChars ? `size is greater than ${maxChars} characters` : '';
// Validator functions END
export default useForm;
