import { Container } from '@ts-phoenix/di';
import { createContext } from 'react';

export const ContainerContext = createContext<Container>(null as any);
