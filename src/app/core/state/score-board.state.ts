export type ScoreBoardState = {
  home: number;
  away: number;
  inning: number;
  outsInInning: number;
};

export const initialState: ScoreBoardState = {
  home: 0,
  away: 0,
  inning: 1,
  outsInInning: 0
};