import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Endpoint } from '@constants';
import {
  ApiResponse,
  Bar,
  getIntervalInMinutes,
  getStartDate,
  Instrument,
  ProviderName,
  Range,
} from '@models';

@Injectable({
  providedIn: 'root',
})
export class BarsService extends BaseService {
  private params = (instrument: Instrument, provider: ProviderName) => ({
    periodicity: 'minute',
    instrumentId: instrument.id,
    provider: provider,
  });

  public dateRange(config: {
    instrument: Instrument;
    provider: ProviderName;
    range: Range;
  }) {
    const startDate = getStartDate(config.range);

    return this.http.get<ApiResponse<Bar[]>>(
      this.injectApiUrl(Endpoint.DateRange),
      {
        params: {
          ...this.params(config.instrument, config.provider),
          startDate,
          interval: getIntervalInMinutes(config.range),
        },
      },
    );
  }

  public countBack(config: {
    instrument: Instrument;
    provider: ProviderName;
    count: number;
  }) {
    return this.http.get<ApiResponse<Bar[]>>(
      this.injectApiUrl(Endpoint.CountBack),
      {
        params: {
          ...this.params(config.instrument, config.provider),
          barsCount: config.count,
        },
      },
    );
  }

  public timeBack(config: { instrument: Instrument; provider: ProviderName }) {
    return this.http.get(this.injectApiUrl(Endpoint.TimeBack), {
      responseType: 'text',
      params: {
        ...this.params(config.instrument, config.provider),
        timeBack: '1.00:00:00',
      },
    });
  }
}
