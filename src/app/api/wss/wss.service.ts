import { inject, Injectable } from '@angular/core';
import { AuthStore } from '@store';
import { BaseService } from '../base/base.service';
import { Endpoint } from '@constants';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { map } from 'rxjs';
import {
  Instrument,
  ProviderName,
  WssMessage,
  WssSubscribeRequest,
} from '@models';

@Injectable({
  providedIn: 'root',
})
export class WssService extends BaseService {
  private authStore = inject(AuthStore);
  private wssSubject?: WebSocketSubject<WssMessage | WssSubscribeRequest>;

  public get isCompleted(): boolean {
    return !this.wssSubject || this.wssSubject.closed;
  }

  public connect(): void {
    const token = this.authStore.access_token();

    if (this.isCompleted && token.length > 0) {
      const url = `${this.env.wssUrl}${Endpoint.Wss}`;

      this.wssSubject = webSocket(url + `?token=${token}`);
    }
  }

  public disconnect(): void {
    this.wssSubject?.complete();
  }

  public listen(config: { instrument: Instrument; provider: ProviderName }) {
    const message: WssSubscribeRequest = {
      type: 'l1-subscription',
      id: '1',
      instrumentId: config.instrument.id,
      provider: config.provider,
      subscribe: true,
      kinds: ['ask', 'bid', 'last'],
    };

    this.wssSubject?.next(message);

    return this.wssSubject?.asObservable().pipe(map((data) => data));
  }
}
