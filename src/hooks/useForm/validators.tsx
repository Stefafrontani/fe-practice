import { Validator } from '.';

export const isRequired: Validator = (value: string) =>
  !value ? 'is required' : '';

export const isEmail: Validator = (value) =>
  !/.+@.+\.[A-Za-z]+$/.test(value) ? 'has wrong format' : '';

export const maxChars = (maxChars: number): Validator => (value: string) =>
  value.length >= maxChars ? `size is greater than ${maxChars} characters` : '';
