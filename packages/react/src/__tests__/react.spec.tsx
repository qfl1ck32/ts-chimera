/**
 * @jest-environment jsdom
 */

import { Core } from '@ts-phoenix/core';
import { AppProvider, ReactPackage } from '@src/index';

import { render, act, screen, waitFor } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom/extend-expect';

describe('react', () => {
  test('provider', async () => {
    const core = new Core({
      packages: [new ReactPackage()],
    });

    expect(core.isInitialised).toBe(false);

    const Component = render(
      <AppProvider core={core}>
        <div>MyComponent</div>
      </AppProvider>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    expect(() => screen.getByText('MyComponent')).toThrow(); // not in the document

    await waitFor(() => {
      expect(screen.getByText('MyComponent')).toBeInTheDocument();

      expect(core.isInitialised).toBe(true);
    });
  });
});
