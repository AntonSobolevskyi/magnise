import { Range } from './chart.model';
import { Instrument } from './instrument.model';
import { ProviderName } from './provider.model';
import { Timestamp } from './time.model';

export type WssMessageType = 'l1-update';

export interface ValueState {
  timestamp: Timestamp;
  price: number;
  volume: number;
}

export interface WssMessage {
  ask: ValueState;
  bid: ValueState;
  instrumentId: string;
  last: ValueState;
  provider: string;
  type: WssMessageType;
}

export interface WssSubscribeRequest {
  type: 'l1-subscription';
  id: '1';
  instrumentId: string;
  provider: ProviderName;
  subscribe: true;
  kinds: ['ask', 'bid', 'last'];
}

export interface WssState {
  isConnected: boolean;
  history: WssMessage[];
  activeInstrument: Instrument | null;
  activeProvider: ProviderName | null;
  error: null | string;
  range: Range;
}
