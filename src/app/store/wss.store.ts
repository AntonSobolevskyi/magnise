import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { WssService } from '@api';
import {
  Instrument,
  ProviderName,
  ValueState,
  WssMessage,
  WssState,
  Range,
} from '@models';

const initialState: WssState = {
  isConnected: false,
  history: [],
  error: null,
  activeInstrument: null,
  activeProvider: null,
  range: '1D',
};

export const WssStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => {
    const defaultValue: ValueState = {
      timestamp: '',
      price: 0,
      volume: 0,
    };

    return {
      currentValue: computed(() => {
        const history = store.history();
        const lastValue = history.find((item) => !!item.last);

        return lastValue?.last || defaultValue;
      }),
    };
  }),
  withMethods((store) => {
    const wssService = inject(WssService);

    const updateHistory = (data: WssMessage) => {
      patchState(store, {
        history: [data, ...store.history()],
      });
    };

    const disconnect = () => {
      wssService.disconnect();

      patchState(store, initialState);
    };

    const connect = () => {
      wssService.connect();
    };

    const listen = (config: {
      instrument: Instrument;
      provider: ProviderName;
    }) => {
      disconnect();
      connect();

      patchState(store, {
        isConnected: true,
        activeInstrument: config.instrument,
        activeProvider: config.provider,
      });

      wssService.listen(config)?.subscribe({
        next: (data) => {
          if (data.type === 'l1-update') {
            updateHistory(data);
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
    };

    const changeRange = (range: Range) => patchState(store, { range });

    return {
      listen,
      disconnect,
      changeRange,
    };
  })
);
