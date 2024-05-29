import { TestBed } from "@angular/core/testing";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { ScoreBoardService } from "./score-board.service";
import { provideHttpClient } from "@angular/common/http";
import { subscribeSpyTo } from "@hirez_io/observer-spy";
import { initialState } from "./score-board.state";

describe('ScoreBoardService', () => {
  it('should be created', () => {
    const { service } = createService();
    expect(service).toBeTruthy();
  });

  it('should call update endpoint', () => {
    const { service, http } = createService();

    const spy = subscribeSpyTo(service.update(initialState));

    const req = http.expectOne('/api/score-board/update');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ payload: initialState });

    req.flush(initialState);

    expect(spy.getValues()).toEqual([initialState]);
  });

  it('should call load endpoint', () => {
    const { service, http } = createService();

    const spy = subscribeSpyTo(service.load());

    const req = http.expectOne('/api/score-board/load');
    expect(req.request.method).toBe('GET');

    req.flush(initialState);

    expect(spy.getValues()).toEqual([initialState]);
  });

  const createService = () => {
    TestBed.configureTestingModule({
      providers: [
        ScoreBoardService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    const service = TestBed.inject(ScoreBoardService);
    const http = TestBed.inject(HttpTestingController);

    return { service, http };
  };
});