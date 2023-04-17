/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react';
import { Core } from '@ts-phoenix/core';
import React from 'react';

import { AppProvider, ReactPackage } from '@src/index';

import '@testing-library/jest-dom/extend-expect';

describe('react', () => {
  test('provider', async () => {
    const core = new Core({
      packages: [new ReactPackage()],
    });

    expect(core.isInitialised).toBe(false);

    const loadingText = 'Loading...';
    const myComponentText = 'MyComponent';

    const loadingComponent = <div>{loadingText}</div>;

    const myComponent = <div>{myComponentText}</div>;

    render(
      <AppProvider {...{ core, loadingComponent }}>{myComponent}</AppProvider>,
    );

    expect(screen.getByText(loadingText)).toBeInTheDocument();

    expect(() => screen.getByText(myComponentText)).toThrow(); // not in the document

    await waitFor(() => {
      expect(screen.getByText(myComponentText)).toBeInTheDocument();

      expect(core.isInitialised).toBe(true);
    });
  });
});
