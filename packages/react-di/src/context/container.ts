import { Container } from '@ts-chimera/di';
import { createContext } from 'react';

export const ContainerContext = createContext<Container>(null as any);
