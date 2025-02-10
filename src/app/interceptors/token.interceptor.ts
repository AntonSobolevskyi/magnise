import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from '@store';
import { catchError, Observable } from 'rxjs';

export function tokenInterceptor(
  request: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  const authStore = inject(AuthStore);
  const accessToken = authStore.access_token();
  const tokenType = authStore.token_type();

  if (accessToken) {
    request = request.clone({
      setHeaders: { Authorization: `${tokenType} ${accessToken}` },
    });
  }

  return next(request).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // Refresh token
        }
      }
      throw err;
    })
  );
}
