import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { ScoreBoardState } from "./score-board.state";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScoreBoardService {
  private http = inject(HttpClient);

  load(): Observable<ScoreBoardState> {
    return this.http.get<ScoreBoardState>('/api/score-board/load');
  }

  update(state: ScoreBoardState): Observable<ScoreBoardState> {
    return this.http.post<ScoreBoardState>('/api/score-board/update', { payload: state });
  }
}