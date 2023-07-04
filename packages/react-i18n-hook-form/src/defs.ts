// eslint-disable-next-line import/named
import { InferType } from 'yup';

type ISchema<T> = () => T;

export type GetSchemaType<T extends ISchema<any>> = InferType<ReturnType<T>>;
