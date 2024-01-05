import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useQuery, QueryClientProvider, QueryClient } from '@tanstack/react-query'; 
import ZipCodeInputContainer from '../components/Header/ZipCodeInputContainer';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('ZipCodeInputContainer', () => {
  it('displays loader and disables input when loading', async () => {
    const queryClient = new QueryClient();  

    // Mock the useQuery hook response for loading state
    (useQuery as jest.Mock).mockReturnValue({ isLoading: true, error: null, refetch: jest.fn() });

    render(
      <QueryClientProvider client={queryClient}>
        <ZipCodeInputContainer />
      </QueryClientProvider>
    );

    // Check if the loader is displayed
    expect(screen.getByTestId('circular-progress')).toBeInTheDocument();

    // Check if the zip-code input is disabled when loading
    expect(screen.getByTestId('zip-code')).toBeDisabled();

  });

  it('enables button when not loading', async () => {
    const queryClient = new QueryClient(); 

    (useQuery as jest.Mock).mockReturnValue({ isLoading: false, error: null, refetch: jest.fn() });

    render(
      <QueryClientProvider client={queryClient}>
        <ZipCodeInputContainer />
      </QueryClientProvider>
    );

    // Check if the loader is not displayed
    expect(screen.queryByTestId('circular-progress')).toBeNull();

    // Check if the button is enabled when not loading
    expect(screen.getByTestId('submit-button')).toBeEnabled();

  });

});
