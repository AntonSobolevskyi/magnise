import { inject, Injectable } from '@angular/core';
import { TokenResponse } from '@models';
import { BaseService } from '../base/base.service';
import { Endpoint } from '@constants';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  public fetchToken() {
    let body = new URLSearchParams();
    body.set('client_id', 'app-cli');
    body.set('grant_type', 'password');
    body.set('username', this.env.username);
    body.set('password', this.env.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<TokenResponse>(
      this.injectApiUrl(Endpoint.GetToken),
      body,
      {
        headers: headers,
      },
    );
  }
}
