import { createContext } from 'react';

import { Container } from '@ts-phoenix/di';

export const ContainerContext = createContext<Container>(null as any);
