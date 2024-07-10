import { subscribeSpyTo } from "@hirez_io/observer-spy";
import { UiService } from "./ui.service";

describe('UiService', () => {
  it('should set loading', () => {
    const service = new UiService();
    const spye = subscribeSpyTo(service.loading$);

    service.loading(true);

    expect(spye.getLastValue()).toBeTruthy();
  }); 

  it('should use delayed loading', () => {
    jest.useFakeTimers();
    const service = new UiService();
    const spye = subscribeSpyTo(service.delayedLoading$);

    service.loading(true);

    expect(spye.getValues()).toEqual([false]);

    jest.advanceTimersByTime(100);

    expect(spye.getValues()).toEqual([false, true]);  

    jest.useRealTimers();
  });

  it('should set error', () => {
    const service = new UiService();
    const spy = subscribeSpyTo(service.error$);

    service.error('error message');

    expect(spy.getValues()).toEqual(['error message']) 
  });
});