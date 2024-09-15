import { it, expect, describe, vitest, beforeEach, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'; // Import jest-dom matchers

import FilterByType from '../FilterByType';

describe('FilterByType', () => {
  const setFilterType = vitest.fn();

  beforeEach(() => {
    render(<FilterByType typeValue='' setFilterType={setFilterType} />);
  });

  afterEach(() => {
    cleanup(); // Cleanup after each test
  });

  it('should have value empty and display value all type on first render', () => {
    const selectComponent = screen.getByRole('combobox');
    
    expect(selectComponent).toHaveValue('');
    expect(selectComponent).toHaveDisplayValue('all type');
  });

  it('should call setFilterType with correct value', async () => {
    await waitFor(() => {
      const selectComponent = screen.getByRole('combobox');

      fireEvent.change(selectComponent, { target: { value: 'normal' } });

      expect(setFilterType).toHaveBeenCalledWith('normal');
    })
  });
});