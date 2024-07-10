import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { UiService } from "./ui.service";
import { Observable, catchError, finalize, throwError } from "rxjs";

export function loaderInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const uiService = inject(UiService);
  uiService.loading(true);
  return next(req).pipe(
    finalize(() => uiService.loading(false)),
    catchError((error: HttpErrorResponse) => {
      uiService.loading(false);
      return throwError(() => error);
    })
  );
}