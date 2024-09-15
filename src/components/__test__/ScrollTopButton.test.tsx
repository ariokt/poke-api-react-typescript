import { it, expect, describe, vitest, beforeEach, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'; // Import jest-dom matchers
import ScrollTopButton from '../ScrollTopButton';

describe('ScrollTopButton', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollTo', {
      writable: true,
      value: vitest.fn(),
    });

    render(<ScrollTopButton />);
  });

  afterEach(() => {
    cleanup(); // Cleanup after each test
  });

  it('it should render UP text', () => {
    const button = screen.getByRole('button');
    expect(button.textContent).toBe('UP');
  });

  it('it should scroll to top smoothly when clicked', async () => {
    const button = screen.getByRole('button');
    await fireEvent.click(button);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});