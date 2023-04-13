import { Container } from 'inversify';
import { createContext } from 'react';

export const ContainerContext = createContext<Container>(null as any);
