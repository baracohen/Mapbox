// Header.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header/Header';

test('renders Header component correctly', () => {
  render(<Header />);

  // Check if the Header component is in the document
  const headerComponent = screen.getByTestId('header-component');
  expect(headerComponent).toBeInTheDocument();

  // Check if the ZipCodeInputContainer component is in the document
  const zipCodeInputContainer = screen.getByTestId('zip-code-input-container');
  expect(zipCodeInputContainer).toBeInTheDocument();
});
