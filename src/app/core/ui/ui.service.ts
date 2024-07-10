import { Injectable } from "@angular/core";
import { BehaviorSubject, delay, iif, of, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  delayedLoading$ = this.loading$.pipe(
    switchMap((loading) => 
      iif(() => loading, 
        of(loading)
          .pipe(delay(100)),
        of(loading))));

  loading(isLoading: boolean) {
    this.loadingSubject.next(isLoading);
  }
}