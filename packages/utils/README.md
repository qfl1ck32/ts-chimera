# @ts-phoenix/utils

`@ts-phoenix/utils` is a package of utility functions for TypeScript projects. It includes the `makeArray` function, which converts a value to an array, and the `mergeDeep` function, which deeply merges objects.

## Installation

You can install the package using npm or yarn:

```bash
npm i @ts-phoenix/utils
```

or

```bash
yarn add @ts-phoenix/utils
```

## Usage

### makeArray

The `makeArray` function takes a value and returns an array. If the value is already an array, it is returned unchanged. If the value is not an array, it is wrapped in an array.

```typescript
import { makeArray } from '@ts-phoenix/utils';

makeArray(42); // returns [42]
makeArray([1, 2, 3]); // returns [1, 2, 3]
makeArray('hello'); // returns ['hello']
```

### mergeDeep

The `mergeDeep` function deeply merges objects. It takes an object with a `target` property, which is the object to merge into, a `sources` property, which is an array of objects to merge from, and an optional `assignFunction` property, which is a custom function to use for merging properties.

```typescript
import { mergeDeep } from '@ts-phoenix/utils';

const target = {
  a: 1,
  b: {
    c: 2,
    d: [3, 4],
  },
};

const source = {
  a: 5,
  b: {
    c: 6,
    d: [7, 8],
  },
};

mergeDeep({ target, sources: [source] });

/*
Returns:
{
  a: 5,
  b: {
    c: 6,
    d: [7, 8],
  },
}
*/
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please make sure to update tests as appropriate.

## License

`@ts-phoenix/utils` is licensed under the GPL 3.0 license.
