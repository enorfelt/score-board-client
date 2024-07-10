import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UiService } from "./ui.service";
import { Observable, catchError, finalize, throwError } from "rxjs";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private uiService: UiService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.uiService.loading(true);
    return next.handle(req).pipe(
      finalize(() => this.uiService.loading(false)),
      catchError((error: HttpErrorResponse) => {
        this.uiService.loading(false);
        return throwError(() => error);
      })
    );
  }
}