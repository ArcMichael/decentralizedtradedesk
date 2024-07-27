// src/contexts/LanguageContext.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';

const TestComponent: React.FC = () => {
  const { locale, setLocale } = useLanguage();

  return (
    <div>
      <div data-testid='locale'>{locale}</div>
      <button onClick={() => setLocale('en')}>Set English</button>
      <button onClick={() => setLocale('zh')}>Set Chinese</button>
    </div>
  );
};

describe('LanguageContext', () => {
  afterEach(() => {
    sessionStorage.clear();
  });

  it('should have default locale as zh', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    expect(screen.getByTestId('locale').textContent).toBe('zh');
  });

  it('should change locale to en', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByText('Set English'));

    expect(screen.getByTestId('locale').textContent).toBe('en');
    expect(sessionStorage.getItem('locale')).toBe('en');
  });

  it('should change locale to zh', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByText('Set Chinese'));

    expect(screen.getByTestId('locale').textContent).toBe('zh');
    expect(sessionStorage.getItem('locale')).toBe('zh');
  });

  it('should load locale from sessionStorage on init', () => {
    sessionStorage.setItem('locale', 'en');

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('locale').textContent).toBe('en');
  });
});
