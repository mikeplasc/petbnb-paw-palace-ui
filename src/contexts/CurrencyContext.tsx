import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type Currency = "MXN" | "USD" | "EUR";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

const CURRENCY_STORAGE_KEY = "petbnb_currency";

const exchangeRates: Record<Currency, number> = {
  EUR: 1,
  USD: 1.08,
  MXN: 22.5,
};

const currencySymbols: Record<Currency, string> = {
  EUR: "€",
  USD: "US$",
  MXN: "$",
};

const getInitialCurrency = (): Currency => {
  const storedCurrency = localStorage.getItem(CURRENCY_STORAGE_KEY);
  return (storedCurrency as Currency) || "USD";
};

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currency, setCurrency] = useState<Currency>(getInitialCurrency);

  useEffect(() => {
    localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
  }, [currency]);

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
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
