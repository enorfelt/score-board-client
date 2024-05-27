import { TestBed } from "@angular/core/testing";
import { ScoreBoardState, initialState } from "./score-board.state";
import { SCORE_BOARD_INITIAL_STATE, ScoreBoardStore } from "./score-board.store";

describe('ScoreBoardStore', () => {
  it('should have initial state', () => {
    expect(createStore().state()).toEqual(initialState);
  });

  describe.each([
    {
      name: 'home',
      scoreFn: (store: ScoreBoardStore) => store.homeScores(),
      loseScoreFn: (store: ScoreBoardStore) => store.homeLosesScore(),
      currentScoreFn: (store: ScoreBoardStore) => store.state().home
    },
    {
      name: 'away',
      scoreFn: (store: ScoreBoardStore) => store.awayScores(),
      loseScoreFn: (store: ScoreBoardStore) => store.awayLosesScore(),
      currentScoreFn: (store: ScoreBoardStore) => store.state().away
    }
  ])('when $name score updates', ({ name, scoreFn, loseScoreFn, currentScoreFn }) => {
    it('should able to score', () => {
      const store = createStore();
      scoreFn(store);
      expect(currentScoreFn(store)).toEqual(1);
    });

    it('should able to lose score', () => {
      const store = createStore({ home: 2, away: 2 });
      loseScoreFn(store);
      expect(currentScoreFn(store)).toEqual(1);
    });

    it('should not have negative score', () => {
      const store = createStore();
      loseScoreFn(store);
      expect(currentScoreFn(store)).toEqual(0);
    });
  
    it('should max out at 99', () => {
      const store = createStore({ home: 99, away: 99});
      scoreFn(store);
      expect(currentScoreFn(store)).toEqual(99);
    });
  });

  const createStore = (state?: Partial<ScoreBoardState>) => {
    TestBed.configureTestingModule({
      providers: [
        ScoreBoardStore,
        {
          provide: SCORE_BOARD_INITIAL_STATE,
          useValue: { ...initialState, ...state }
        }
      ]
    });
    return TestBed.inject(ScoreBoardStore);
  };
});