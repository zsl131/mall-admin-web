import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

/**
 * admin 全局Http拦截器
 * @author silent
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the service.
    const authToken = "";

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('auth-token', authToken),
      responseType: 'blob',
      params: new HttpParams({
        fromObject: {
          params: btoa(encodeURI(req.params.get('params')))
        }
      })
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq).pipe(
      mergeMap(res => {
        return this.handleData(res);
      }),
      map(res => {
        if(res) {
          if(res.errCode == "0") {
            return new HttpResponse({
              body: res.result
            });
          }
        }
      }),
      catchError(this.handleError),
    );
  }

  // 异常处理
  private handleError(error: HttpErrorResponse) {
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  private handleData(res: any): Observable<any> {
    const responseBlob =
            res instanceof HttpResponse ? res.body :
            (<any>res).error instanceof Blob ? (<any>res).error : undefined;
    return this.blobToText(responseBlob).pipe(mergeMap(_responseText => {
      let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
      let result200 = resultData200 !== undefined ? resultData200 : <any>null;
      return of(result200);
    }));
  }

  private blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
      if (!blob) {
        observer.next("");
        observer.complete();
      } else {
        let reader = new FileReader();
        reader.onload = event => {
          observer.next((<any>event.target).result);
          observer.complete();
        };
        reader.readAsText(blob);
      }
    });
  }
}
