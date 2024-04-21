import { HttpErrorResponse, HttpHandler, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MOCK_API_DEFAULT_DELAY } from './mock-api.constants';
import { MockApiService } from './mock-api.service';
import { delay, of, switchMap, throwError } from 'rxjs';

export const mockApiInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next) => {
  const defaultDelay = inject(MOCK_API_DEFAULT_DELAY);
  const mockApiService = inject(MockApiService);

  // Try to get the request handler
  const {
    handler,
    urlParams
  } = mockApiService.findHandler(req.method.toUpperCase(), req.url);

  // Pass through if the request handler does not exist
  if (!handler) {
    return next(req);
  }

  // Set the intercepted request on the handler
  handler.request = req;

  // Set the url params on the handler
  handler.urlParams = urlParams;

  // Subscribe to the response function observable
  return handler.response.pipe(
      delay(handler.delay ?? defaultDelay ?? 0),
      switchMap((response) => {

          // If there is no response data,
          // throw an error response
          if ( !response )
          {
              response = new HttpErrorResponse({
                  error     : 'NOT FOUND',
                  status    : 404,
                  statusText: 'NOT FOUND'
              });

              return throwError(() => new Error(response));
          }

          // Parse the response data
          const data = {
              status: response[0],
              body  : response[1]
          };

          // If the status code is in between 200 and 300,
          // return a success response
          if ( data.status >= 200 && data.status < 300 )
          {
              response = new HttpResponse({
                  body      : data.body,
                  status    : data.status,
                  statusText: 'OK'
              });

              return of(response);
          }

          // For other status codes,
          // throw an error response
          response = new HttpErrorResponse({
              error     : data.body.error,
              status    : data.status,
              statusText: 'ERROR'
          });

          return throwError(() => new Error(response));
      }));
};
