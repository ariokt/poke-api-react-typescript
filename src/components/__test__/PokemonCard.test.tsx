import { it, expect, describe, beforeEach, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest'; // Import jest-dom matchers
import PokemonCard from '../PokemonCard';

describe('PokemonCard', () => {
  const dummyPokemon = {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
  };

  beforeEach(() => {
    render(
      <MemoryRouter>
        <PokemonCard pokemon={dummyPokemon} />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    cleanup(); // Cleanup after each test
  });

  it('should render h3 with correct name', async () => {
    const h3Component = screen.getByRole('heading', { level: 3 });
    expect(h3Component.textContent).toBe('Pikachu');
  });

  it('should render a with href same with name', async () => {
    const aComponent = screen.getByRole('link');
    expect(aComponent).toHaveAttribute('href', `/${dummyPokemon.name}`);
  });
});