import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ENV } from '@core';

export class BaseService {
  protected http = inject(HttpClient);
  protected env = inject(ENV);

  protected injectApiUrl(url: string): string {
    return `${this.env.apiUrl}${url}`;
  }
}
