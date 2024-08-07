import { TestBed } from "@angular/core/testing";
import { ScoreBoardState } from "./score-board.types";
import { ScoreBoardStore } from "./score-board.store";
import { ScoreBoardService } from "./score-board.service";
import { of, throwError } from "rxjs";
import { AppConfigService, defaultState } from "../config/app-config.service";

describe('ScoreBoardStore', () => {
  const initialState = defaultState;
  it('should have initial state', () => {
    expect(createStore().store.state()).toEqual(initialState);
  });

  describe('when adding an out', () => {
    it('should increase outs', () => {
      const { store } = createStore();
      store.addOut();
      expect(store.state().outsInInning).toEqual(1);
    });

    it('should start new inning on sixth out', () => {
      const { store } = createStore({ outsInInning: 5 });
      store.addOut();
      expect(store.state().outsInInning).toEqual(0);
      expect(store.state().inning).toEqual(2);
    });

    it('should max out on 99 innings', () => {
      const { store } = createStore({ outsInInning: 5, inning: 9 });
      store.addOut();
      expect(store.state().inning).toEqual(9);
    });
  });

  describe('when removing an out', () => {
    it('should decrease outs', () => {
      const { store } = createStore({ outsInInning: 1 });
      store.removeOut();
      expect(store.state().outsInInning).toEqual(0);
    });

    it('should remove inning on negative out', () => {
      const { store } = createStore({ inning: 2 });
      store.removeOut();
      expect(store.state().outsInInning).toEqual(0);
      expect(store.state().inning).toEqual(1);
    });

    it('should not have negative outs', () => {
      const { store } = createStore();
      store.removeOut();
      expect(store.state().outsInInning).toEqual(0);
    });

    it('should not have less then one inning', () => {
      const { store } = createStore();
      store.removeOut();
      expect(store.state().inning).toEqual(1);
    });
  });

  describe('when adding an inning', () => {
    it('should increase inning', () => {
      const { store } = createStore();
      store.addInning();
      expect(store.state().inning).toEqual(2);
    });

    it('should max out on 9 innings', () => {
      const { store } = createStore({ inning: 9 });
      store.addInning();
      expect(store.state().inning).toEqual(9);
    });

    it('should zero outs on new inning', () => {
      const { store } = createStore({ outsInInning: 5 });
      store.addInning();
      expect(store.state().outsInInning).toEqual(0);
    });
  });

  describe('when removing an inning', () => {
    it('should decrease inning', () => {
      const { store } = createStore({ inning: 2 });
      store.removeInning();
      expect(store.state().inning).toEqual(1);
    });

    it('should not have less then one inning', () => {
      const { store } = createStore();
      store.removeInning();
      expect(store.state().inning).toEqual(1);
    });

    it('should zero outs on removed inning', () => {
      const { store } = createStore({ inning: 2, outsInInning: 5 });
      store.removeInning();
      expect(store.state().outsInInning).toEqual(0);
    });

    it('should not clear out on first inning', () => {
      const { store } = createStore({ outsInInning: 2 });
      store.removeInning();
      expect(store.state().outsInInning).toEqual(2);
    });
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
      const { store } = createStore();
      scoreFn(store);
      expect(currentScoreFn(store)).toEqual(1);
    });

    it('should able to lose score', () => {
      const { store } = createStore({ home: 2, away: 2 });
      loseScoreFn(store);
      expect(currentScoreFn(store)).toEqual(1);
    });

    it('should not have negative score', () => {
      const { store } = createStore();
      loseScoreFn(store);
      expect(currentScoreFn(store)).toEqual(0);
    });

    it('should max out at 99', () => {
      const { store } = createStore({ home: 99, away: 99 });
      scoreFn(store);
      expect(currentScoreFn(store)).toEqual(99);
    });
  });

  it('should reset state', () => {
    const { store } = createStore();
    store.reset();
    expect(store.state()).toEqual(initialState);
  });

  it('should force update', async () => {
    const { store, service } = createStore();
    store.forceUpdate();
    expect(service.update).toHaveBeenCalledWith(store.state());
  });

  it('should check status', async () => {
    const { store, service } = createStore();
    store.checkStatus();
    expect(store.isReady()).toBeTruthy();
    expect(service.status).toHaveBeenCalledTimes(1);
  });

  it('should check status', async () => {
    const { store, service } = createStore();
    store.start();
    expect(store.isReady()).toBeTruthy();
    expect(service.start).toHaveBeenCalledTimes(1);
  });

  it('should debounce updates with 250ms', async () => {
    jest.useFakeTimers();
    const { store, service } = createStore();
    store.addOut();
    store.addOut();
    store.addOut();
    store.addOut();
    store.addOut();


    jest.advanceTimersByTime(250);

    const expectedState = { ...store.state(), outsInInning: 5 };

    store.addOut();

    expect(service.update).toHaveBeenNthCalledWith(1, expectedState);
  });

  it('should restore previous state if update error', async () => {
    jest.useFakeTimers();
    const { store, service } = createStore();

    service.update = jest.fn().mockImplementation(() => throwError(() => new Error('Some error')));

    store.addOut();

    jest.advanceTimersByTime(250);

    expect(store.state().outsInInning).toEqual(0);
  });

  const createStore = (partialState?: Partial<ScoreBoardState>) => {
    const state = { ...initialState, ...partialState };
    const scoreBoardServiceMock = {
      load: jest.fn().mockImplementation(() => of(state)),
      update: jest.fn().mockImplementation(state => of(state)),
      status: jest.fn().mockImplementation(() => of({ isReady: true })),
      start: jest.fn().mockImplementation(() => of({ isReady: true }))
    };

    const appConfigServiceMock = {
      initialState: state
    };

    TestBed.configureTestingModule({
      providers: [
        ScoreBoardStore,
        {
          provide: AppConfigService,
          useValue: appConfigServiceMock
        },
        {
          provide: ScoreBoardService,
          useValue: scoreBoardServiceMock
        }
      ]
    });
    return { store: TestBed.inject(ScoreBoardStore), service: scoreBoardServiceMock };
  };
}); 