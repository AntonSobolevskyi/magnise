import {
  signalStore,
  withMethods,
  withState,
  patchState,
  withComputed,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { AuthState } from '@models';
import { computed, inject } from '@angular/core';
import { AuthService } from '@api';
import { pipe, switchMap } from 'rxjs';
import { AppStore } from './app.store';

const initialState: AuthState = {
  access_token: '',
  expires_in: 0,
  refresh_expires_in: 0,
  refresh_token: '',
  token_type: '',
  session_state: '',
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((state) => ({
    isAuthenticated: computed(() => !!state.access_token),
  })),
  withMethods((store) => {
    const authService = inject(AuthService);
    const appStore = inject(AppStore);

    const updateAccessToken = rxMethod<void>(
      pipe(
        switchMap(() =>
          authService.fetchToken().pipe(
            tapResponse({
              next: (response) => {
                patchState(store, response);
                appStore.initialized();
              },
              error: (error) => console.error(error),
            })
          )
        )
      )
    );

    return {
      updateAccessToken,
    };
  })
);
