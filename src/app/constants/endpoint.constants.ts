export enum Endpoint {
  GetToken = '/token',
  Wss = '/streaming/ws',
  Instruments = '/instruments',
  Providers = '/instruments/providers',
  Exchanges = '/instruments/exchanges',
  CountBack = '/bars/count-back',
  DateRange = '/bars/date-range',
  TimeBack = '/data-consolidators/time-back',
}
