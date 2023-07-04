type ISchema<T> = () => T;

export type GetSchemaType<T extends ISchema<any>> = ReturnType<T>;
