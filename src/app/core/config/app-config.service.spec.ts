import { TestBed } from "@angular/core/testing";
import { AppConfigService, defaultState } from "./app-config.service";
import { ScoreBoardService } from "../state/score-board.service";
import { subscribeSpyTo } from "@hirez_io/observer-spy";
import { of } from "rxjs";
import { ScoreBoardState } from "../state/score-board.types";

describe('AppConfigService', () => {
  it('should be created', () => {
    expect(createService().service).toBeTruthy();
  });

  it('should initialize initial state', () => {
    const { service, state } = createService({ home: 10, away: 9 });

    const spy = subscribeSpyTo(service.init());

    expect(spy.getValues()).toEqual([state]);
    expect(service.initialState).toEqual(state);
  });

  const createService = (partialState: Partial<ScoreBoardState> = {}) => {
    const state = { ...defaultState, ...partialState };
    TestBed.configureTestingModule({
      providers: [
        AppConfigService,
        {
          provide: ScoreBoardService,
          useValue: {
            load: jest.fn().mockImplementation(() => of(state)),
          },
        }
      ]
    });

    const service = TestBed.inject(AppConfigService);

    return { service, state };
  };
});