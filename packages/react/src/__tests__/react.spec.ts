import { Core } from '@ts-chimera/core';
import { ReactPackage, yup } from '@src/index';

describe('react', () => {
  it('should work', async () => {
    const core = new Core({
      packages: [new ReactPackage()],
    });

    await core.initialise();

    console.log('Done');
  });
});
