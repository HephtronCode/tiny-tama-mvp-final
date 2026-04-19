import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from '../src/App';

// Mock DB because it uses WASM which isn't easy in JSDOM
vi.mock('../src/db', () => ({
  initDB: vi.fn(),
  saveVitals: vi.fn(),
  loadVitals: vi.fn(() => null)
}));

describe('Tiny Tamagotchi Core Logic', () => {
  it('renders initial vitals at 50%', () => {
    render(<App />);
    const elements = screen.getAllByText('50%');
    expect(elements.length).toBeGreaterThan(0);
  });

  it('increments hunger when Feed button is clicked', async () => {
    render(<App />);
    const feedButton = screen.getByText(/Feed/i);
    
    await act(async () => {
      fireEvent.click(feedButton);
    });

    // 50 + 10 = 60
    expect(screen.getAllByText('60%')).toBeTruthy();
  });

  it('decrements hunger over time', async () => {
    vi.useFakeTimers();
    render(<App />);
    
    // Advance time by 3 seconds (Hunger tick rate)
    await act(async () => {
      vi.advanceTimersByTime(3100);
    });

    // 50 - 1 = 49
    expect(screen.getAllByText('49%')).toBeTruthy();
    
    vi.useRealTimers();
  });
});
