import { ExchangeName, Kind } from './exchange.model';
import { ProviderName } from './provider.model';

export type Currency = string;

type TradingHour = string; // '00:00:00';

export interface Instrument {
  id: string;
  symbol: string;
  kind: Kind;
  exchange: ExchangeName;
  description: string;
  tickSize: number;
  currency: Currency;
  baseCurrency: Currency;
  mapping: Record<
    ProviderName,
    {
      symbol: string;
      exchange: ExchangeName;
      tradingHours: {
        regularStart: TradingHour;
        regularEnd: TradingHour;
        electronicStart: TradingHour;
        electronicEnd: TradingHour;
      };
    }
  >;
  profile: {
    name: string;
    gics: unknown;
  };
}

export interface InstrumentsState {
  activeProvider: ProviderName | null;
  providers: ProviderName[];
  exchanges: ExchangeName[];
  instruments: Instrument[];
}
