import { Injectable, signal, inject, DestroyRef } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ScoreBoardState } from "./score-board.types";
import { ScoreBoardService } from "./score-board.service";
import { AppConfigService, defaultState } from "../config/app-config.service";

@Injectable({
  providedIn: 'root'
})
export class ScoreBoardStore {
  private service = inject(ScoreBoardService);
  private config = inject(AppConfigService);
  private destroyRef = inject(DestroyRef);

  private readonly writableState = signal<ScoreBoardState>(this.config.initialState);
  readonly state = this.writableState.asReadonly();

  isReady = signal(false);

  homeScores() {
    this.update(s => ({ home: Math.min(99, s.home + 1) }));
  }

  awayScores() {
    this.update(s => ({ away: Math.min(99, s.away + 1) }));
  }

  homeLosesScore() {
    this.update(s => ({ home: Math.max(0, s.home - 1) }));
  }

  awayLosesScore() {
    this.update(s => ({ away: Math.max(0, s.away - 1) }));
  }

  addOut() {
    this.update(s => ({
      outsInInning: s.outsInInning < 5 ? s.outsInInning + 1 : 0,
      inning: s.outsInInning === 5 ? Math.min(99, s.inning + 1) : s.inning
    }));
  }

  removeOut() {
    this.update(s => ({
      outsInInning: s.outsInInning > 0 ? s.outsInInning - 1 : 0,
      inning: s.outsInInning === 0 ? Math.max(1, s.inning - 1) : s.inning
    }));
  }

  addInning() {
    this.update(s => ({
      inning: Math.min(99, s.inning + 1),
      outsInInning: s.inning < 99 ? 0 : s.outsInInning,
    }));
  }

  removeInning() {
    this.update(s => ({
      inning: Math.max(1, s.inning - 1),
      outsInInning: s.inning > 1 ? 0 : s.outsInInning,
    }));
  }

  reset() {
    this.update(() => defaultState);
  }

  forceUpdate() {
    this.update(() => this.state());
  }

  checkStatus() {
    this.service.status().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(s => this.isReady.set(s.isReady));
  }

  start() {
    this.service.start().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(s => this.isReady.set(s.isReady));
  }

  private update(newState: (state: ScoreBoardState) => Partial<ScoreBoardState>) {
    const currentState = this.state();
    this.service
      .update({ ...currentState, ...newState(currentState) })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(s => this.writableState.set(s));
  }

}
