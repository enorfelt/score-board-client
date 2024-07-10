
import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { UiService } from "./ui.service";
import { Observable, catchError, throwError } from "rxjs";

export function httpErrorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const uiService = inject(UiService);
  return next(req).pipe(
    catchError((e: HttpErrorResponse) => {
      uiService.error(e.error);
      return throwError(() => e);
    })
  );
}