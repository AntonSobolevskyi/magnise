import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Endpoint } from '@constants';
import {
  ApiResponseWithPages,
  Instrument,
  ApiResponse,
  Exchange,
  ProviderName,
} from '@models';

@Injectable({
  providedIn: 'root',
})
export class InstrumentsService extends BaseService {
  public getInstruments(provider: ProviderName) {
    return this.http.get<ApiResponseWithPages<Instrument>>(
      this.injectApiUrl(Endpoint.Instruments),
      { params: { provider } }
    );
  }

  public getProviders() {
    return this.http.get<ApiResponse<ProviderName[]>>(
      this.injectApiUrl(Endpoint.Providers)
    );
  }

  public getExchanges(provider: ProviderName) {
    return this.http.get<ApiResponse<Exchange>>(
      this.injectApiUrl(Endpoint.Exchanges),
      { params: { provider } }
    );
  }
}
