import { createContext } from 'react';

import { Container } from '@ts-chimera/di';

export const ContainerContext = createContext<Container>(null as any);
