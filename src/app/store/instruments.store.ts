import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { InstrumentsService } from '@api';
import { InstrumentsState, ProviderName } from '@models';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { of, pipe, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

const initialState: InstrumentsState = {
  providers: [],
  exchanges: [],
  instruments: [],
  activeProvider: null,
};

export const InstrumentsStore = signalStore(
  withState(initialState),
  withMethods((store) => {
    const instrumentsService = inject(InstrumentsService);

    const updateProviders = rxMethod<void>(
      pipe(
        switchMap(() =>
          instrumentsService.getProviders().pipe(
            tapResponse({
              next: (response) =>
                patchState(store, { providers: response.data }),
              error: (error) => console.error(error),
            })
          )
        )
      )
    );

    const updateInstruments = rxMethod<ProviderName | null>(
      pipe(
        switchMap((provider: ProviderName | null) => {
          if (provider === null) {
            patchState(store, { instruments: [] });
            return of(null);
          } else {
            return instrumentsService.getInstruments(provider).pipe(
              tapResponse({
                next: (response) =>
                  patchState(store, { instruments: response.data }),
                error: (error) => console.error(error),
              })
            );
          }
        })
      )
    );

    const updateExchanges = rxMethod<ProviderName | null>(
      pipe(
        switchMap((provider: ProviderName | null) => {
          if (provider === null) {
            patchState(store, { exchanges: [] });
            return of(null);
          } else {
            return instrumentsService.getExchanges(provider).pipe(
              tapResponse({
                next: (response) =>
                  patchState(store, { exchanges: response.data[provider] }),
                error: (error) => console.error(error),
              })
            );
          }
        })
      )
    );

    const setActiveProvider = (provider: ProviderName | null) => {
      patchState(store, { activeProvider: provider });

      updateInstruments(provider);
      updateExchanges(provider);
    };

    return {
      updateProviders,
      setActiveProvider,
      updateInstruments,
    };
  })
);
