import { yupResolver } from '@hookform/resolvers/yup';
import { use } from '@ts-phoenix/react-di';
import { I18n } from '@ts-phoenix/react-i18n';
import { useEffect } from 'react';
import {
  FieldValues,
  UseFormProps,
  useForm as baseUseForm,
} from 'react-hook-form';
// eslint-disable-next-line import/named
import { ISchema, InferType } from 'yup';

export function useForm<
  T extends ISchema<any>,
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
>(props: UseFormProps<TFieldValues, TContext> & { schema: T }) {
  const { schema, ...rest } = props;

  const i18n = use(I18n);

  const form = baseUseForm<InferType<typeof schema>>({
    ...rest,

    resolver: yupResolver(schema as any),
  });

  useEffect(() => {
    form.trigger(Object.keys(form.formState.errors) as any);
  }, [i18n.activePolyglot]);

  const getErrorMessage = (field: keyof InferType<typeof schema>) =>
    form.formState.errors[field]?.message as string | undefined;

  const hasErrors = Object.keys(form.formState.errors).length > 0;

  return {
    ...form,
    hasErrors,
    getErrorMessage,
  };
}
