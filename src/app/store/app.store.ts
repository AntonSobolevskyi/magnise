import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { AppState } from '../models/app.model';

const initialState: AppState = {
  isInitialized: false,
};

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const initialized = () => {
      patchState(store, { isInitialized: true });
    };

    return {
      initialized,
    };
  })
);
