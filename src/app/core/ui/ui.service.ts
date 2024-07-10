import { Injectable } from "@angular/core";
import { BehaviorSubject, delay, filter, iif, of, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<{ error: string; message: string; } | null>(null);
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable()
    .pipe(filter((error) => error !== null));

  delayedLoading$ = this.loading$.pipe(
    switchMap((loading) => 
      iif(() => loading, 
        of(loading)
          .pipe(delay(100)),
        of(loading))));

  loading(isLoading: boolean) {
    this.loadingSubject.next(isLoading);
  }

  error(message: { error: string; message: string; }) {
    this.errorSubject.next(message);
  }
}