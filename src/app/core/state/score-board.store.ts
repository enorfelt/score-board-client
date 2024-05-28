import { Inject, Injectable, InjectionToken, signal, Provider } from "@angular/core";
import { ScoreBoardState } from "./score-board.state";

export const SCORE_BOARD_INITIAL_STATE = new InjectionToken('SCORE_BOARD_INITIAL_STATE');

@Injectable()
export class ScoreBoardStore {
  readonly state = signal<ScoreBoardState>(this.initialState);

  constructor(@Inject(SCORE_BOARD_INITIAL_STATE) private initialState: ScoreBoardState) { }

  homeScores() {
    this.state.update(state => ({ ...state, home: Math.min(99, state.home + 1) }));
  }

  awayScores() {
    this.state.update(state => ({ ...state, away: Math.min(99, state.away + 1) }));
  }

  homeLosesScore() {
    this.state.update(state => ({ ...state, home: Math.max(0, state.home - 1) }));
  }

  awayLosesScore() {
    this.state.update(state => ({ ...state, away: Math.max(0, state.away - 1) }));
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