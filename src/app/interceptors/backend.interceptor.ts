import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import {
  API_URL,
  ENDPOINTS_CONTROLLER_METHODS,
  HTTP_METHOD,
} from '../backend/backend.config';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const method = req.method as HTTP_METHOD;
    const url = req.url.replace(`${API_URL}/`, '');
    const httpType = ENDPOINTS_CONTROLLER_METHODS[method];
    const controllerMethod = (httpType as any)[url];

    if (controllerMethod) {
      try {
        return of(
          new HttpResponse({ status: 200, body: req.body ? controllerMethod(req.body.data) : controllerMethod()})
        ).pipe(delay(500));
      } catch (error: any) {
        return of(
          new HttpResponse({ status: error.status, statusText: error.message })
        ).pipe(delay(500));
      }
    } else
      return of(
        new HttpResponse({ status: 400, statusText: 'No route found' })
      ).pipe(delay(500));
  }
}
