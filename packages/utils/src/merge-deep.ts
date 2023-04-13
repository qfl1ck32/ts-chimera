import { ObjectAssignFunctionType } from '@ts-chimera/typings';

const objectAssign: ObjectAssignFunctionType = (target, source, key) => {
  Object.assign(target, {
    [key]: source[key],
  });
};

/**
 *
 * @param args: An object containning the target, the sources and the assign function (defaults to Object.assign (kinda))
 * @returns Nothing. Don't wait.
 */
export const mergeDeep = (args: {
  target: Record<string, any>;

  assignFunction?: Function;

  sources: Record<string, any>[];
}): any => {
  const { sources, target } = args;

  const assignFunction = args.assignFunction || objectAssign;

  if (!sources.length) return target;

  const source = sources.shift();

  if (target instanceof Object && source instanceof Object) {
    for (const key in source) {
      if (source[key] instanceof Object) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep({
          target: target[key],
          assignFunction,
          sources: [source[key]],
        });
      } else {
        assignFunction(target, source, key);
      }
    }
  }

  return mergeDeep({
    target,
    assignFunction,
    sources,
  });
};
