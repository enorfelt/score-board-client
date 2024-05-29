import { Injectable, inject } from '@angular/core';
import { ScoreBoardService } from '../state/score-board.service';
import { take, tap } from 'rxjs';
import { ScoreBoardState } from '../state/score-board.state';

export const defaultState: ScoreBoardState = {
  home: 0,
  away: 0,
  inning: 1,
  outsInInning: 0
};

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private scoreBoardService = inject(ScoreBoardService);

  initialState = defaultState;

  init() {
    return this.scoreBoardService.load().pipe(take(1), tap(state => this.initialState = state));
  }
}
