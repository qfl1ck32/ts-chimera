// eslint-disable-next-line import/named
import { LocaleObject } from 'yup';

export const array: LocaleObject['array'] = {
  length: 'Acest câmp trebuie să conțină cel puțin ${length} elemente',
  max: 'Acest câmp trebuie să aibă cel mult ${max} elemente',
  min: 'Acest câmp trebuie să aibă cel puțin ${min} elemente',
};

export const boolean: LocaleObject['boolean'] = {};

export const date: LocaleObject['date'] = {
  max: 'Data trebuie să fie înainte de ${max}',
  min: 'Data trebuie să fie după ${min}',
};

export const mixed: LocaleObject['mixed'] = {
  default: 'Acest câmp este invalid.',
  notOneOf: 'Acest câmp nu poate avea una dintre următoarele valori: ${values}',
  oneOf: 'Acest câmp trebuie să aibă una dintre următoarele valori: ${values}',
  required: 'Acest câmp este obligatoriu',
};

export const number: LocaleObject['number'] = {
  integer: 'Acest câmp trebuie să fie un număr întreg',
  lessThan: 'Acest câmp trebuie să fie mai mic decât ${less}',
  max: 'Acest câmp trebuie să fie mai mic sau egal decât ${max}',
  min: 'Acest câmp trebuie să fie mai mare sau egal decât ${min}',
  moreThan: 'Acest câmp trebuie să fie mai mare decât ${more}',
  negative: 'Acest câmp trebuie să fie un număr negativ',
  positive: 'Acest câmp trebuie să fie un număr pozitiv',
};

export const object: LocaleObject['object'] = {
  noUnknown: 'Acest câmp nu poate avea chei nespecificate în forma obiectului',
};

export const string: LocaleObject['string'] = {
  email: 'Acest câmp trebuie să fie un e-mail valid',
  length: 'Acest câmp trebuie să conțină exact ${length} caractere',
  lowercase: 'Acest câmp trebuie să fie un șir de caractere mici',
  matches: 'Acest câmp trebuie să se potrivească următorului model: "${regex}"',
  max: 'Acest câmp trebuie să aibă cel mult ${max} caractere',
  min: 'Acest câmp trebuie să aibă cel puțin ${min} caractere',
  trim: 'Acest câmp trebuie să nu conțină spații înainte sau după text',
  uppercase: 'Acest câmp trebuie să fie un șir de caractere mari',
  url: 'Acest câmp trebuie să fie un URL valid',
};

export const ro = {
  array,
  boolean,
  date,
  mixed,
  number,
  object,
  string,
} as LocaleObject;
