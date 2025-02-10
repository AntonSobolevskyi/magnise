import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environments/environment';
import { ENV } from '@core';
import { AuthStore } from '@store';
import { tokenInterceptor } from '@interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    {
      provide: ENV,
      useValue: environment,
    },
    provideAppInitializer(() => {
      const authStore = inject(AuthStore);

      authStore.updateAccessToken();
    }),
  ],
};
