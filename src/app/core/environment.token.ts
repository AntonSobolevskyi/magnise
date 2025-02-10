import { InjectionToken } from '@angular/core';
import { Environment } from '@env';

export const ENV = new InjectionToken<Environment>('ENV');
