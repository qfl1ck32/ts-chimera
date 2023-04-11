import { useContext } from 'react';

import { ContainerContext } from '../context/container';

export const useContainer = () => {
  return useContext(ContainerContext);
};
