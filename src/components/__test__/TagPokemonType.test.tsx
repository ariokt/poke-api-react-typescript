import { it, expect, describe, vitest, beforeEach, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'; // Import jest-dom matchers
import TagPokemonType from '../TagPokemonType';

describe('TagPokemonType', () => {

  afterEach(() => {
    cleanup(); // Cleanup after each test
  });

  it('it should render div with role pokemon-type and text same as pokeType prop', () => {
    render(<TagPokemonType pokemonType='normal' />);
    const button = screen.getByRole('pokemon-type');
    expect(button.textContent).toBe('normal');
  });

  it('it should render div with bg color base on pokeType prop', () => {
    render(<TagPokemonType pokemonType='' />);
    const button = screen.getByRole('pokemon-type');
    expect(button).toHaveProperty('style.backgroundColor', 'black');
  });
});