import { ProviderName } from './provider.model';

export type Kind = string;
export type ExchangeName = string;
export type Exchange = Record<ProviderName, ExchangeName[]>;
