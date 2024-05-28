import { Inject, Injectable, InjectionToken, signal, Provider, inject, DestroyRef } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ScoreBoardState } from "./score-board.state";
import { ScoreBoardService } from "./score-board.service";

export const SCORE_BOARD_INITIAL_STATE = new InjectionToken('SCORE_BOARD_INITIAL_STATE');

@Injectable()
export class ScoreBoardStore {
  private service = inject(ScoreBoardService);
  private destroyRef = inject(DestroyRef);

  readonly state = signal<ScoreBoardState>(this.initialState);

  constructor(@Inject(SCORE_BOARD_INITIAL_STATE) private initialState: ScoreBoardState) { }

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

  private update(newState: (state: ScoreBoardState) => Partial<ScoreBoardState>) {
    const currentState = this.state();
    this.service
      .update({ ...currentState, ...newState(currentState) })
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(s => this.state.set(s));
  }

}

export function initializeScoreBoardStore(
  initialState: ScoreBoardState
): Provider[] {
  return [
    {
      provide: ScoreBoardStore,
      useFactory: () => new ScoreBoardStore(initialState),
    }
  ]
}