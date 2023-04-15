import { Core } from '@ts-chimera/core';
import { ReactPackage } from '@ts-chimera/react';
import * as yup from 'yup';
import { AppPackage } from './app';

export const core = new Core({
  packages: [new ReactPackage(), new AppPackage()],
});
