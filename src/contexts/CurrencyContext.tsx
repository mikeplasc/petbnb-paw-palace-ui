
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Currency = 'MXN' | 'USD' | 'EUR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const exchangeRates: Record<Currency, number> = {
  MXN: 1,
  USD: 0.056,
  EUR: 0.052
};

const currencySymbols: Record<Currency, string> = {
  MXN: '$',
  USD: '$',
  EUR: '€'
};

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('MXN');

  const formatPrice = (amount: number) => {
    const convertedAmount = amount * exchangeRates[currency];
    const symbol = currencySymbols[currency];
    
    return `${symbol}${Math.round(convertedAmount).toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
