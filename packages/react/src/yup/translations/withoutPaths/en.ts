import { LocaleObject } from 'yup';

export const array: LocaleObject['array'] = {
  length: 'This field must have at least ${length} items',
  max: 'This field must have less than or equal to ${max} items',
  min: 'This field must have at least ${min} items',
};

export const boolean: LocaleObject['boolean'] = {};

export const date: LocaleObject['date'] = {
  max: 'The date must be earlier than ${max}',
  min: 'The date must be later than ${min}',
};

export const mixed: LocaleObject['mixed'] = {
  default: 'This field is invalid',
  notOneOf: 'This field must not be one of the following values: ${values}',
  oneOf: 'This field must be one of the following values: ${values}',
  required: 'This field is required',
};

export const number: LocaleObject['number'] = {
  integer: 'This field must be an integer',
  lessThan: 'This field must be less than ${less}',
  max: 'This field must be less than or equal to ${max}',
  min: 'This field must be greater than or equal to ${min}',
  moreThan: 'This field must be greater than ${more}',
  negative: 'This field must be a negative number',
  positive: 'This field must be a positive number',
};

export const object: LocaleObject['object'] = {
  noUnknown: 'This field cannot have keys not specified in the object shape',
};

export const string: LocaleObject['string'] = {
  email: 'This field must be a valid email',
  length: 'This field must be exactly ${length} characters',
  lowercase: 'This field must be a lowercase string',
  matches: 'This field must match the following: "${regex}"',
  max: 'This field must be at most ${max} characters',
  min: 'This field must be at least ${min} characters',
  trim: 'This field must be a trimmed string',
  uppercase: 'This field must be an upper case string',
  url: 'This field must be a valid URL',
};

export const en = {
  array,
  boolean,
  date,
  mixed,
  number,
  object,
  string,
} as LocaleObject;
