
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCurrency, Currency } from '@/contexts/CurrencyContext';

const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();

  const currencies = [
    { code: 'EUR' as Currency, name: 'Euro (€)' },
    { code: 'USD' as Currency, name: 'Dólar (US$)' },
    { code: 'MXN' as Currency, name: 'Peso Mexicano ($)' },
  ];

  return (
    <Select value={currency} onValueChange={setCurrency}>
      <SelectTrigger className="w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((curr) => (
          <SelectItem key={curr.code} value={curr.code}>
            {curr.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CurrencySelector;
