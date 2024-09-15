import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react'
import DefaultLayout from '../DefaultLayout';
import { BrowserRouter } from 'react-router-dom';

describe('DefaultLayout', () => {
  it('should render correctly with title pokedex', () => {
    render(
      <BrowserRouter>
        <DefaultLayout><div>test</div></DefaultLayout>
      </BrowserRouter>
    )

    const title = screen.getByRole('heading', {level: 1});
    expect(title.textContent).toEqual('Pokedéx');
  });
})