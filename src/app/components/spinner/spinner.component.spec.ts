import { render, screen } from "@testing-library/angular";
import { SpinnerComponent } from "./spinner.component";
import { UiService } from "../../core";
import { BehaviorSubject } from "rxjs";

describe('SpinnerComponent', () => {
  it('should not show spinner by default', async () => {
    await render(SpinnerComponent);
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });

  it('should show spinner when loading', async () => {
    await render(SpinnerComponent, {
      providers: [{
        provide: UiService, 
        useValue: {
          delayedLoading$: new BehaviorSubject(true)
        }
      }]
    });
    expect(screen.queryByTestId('spinner')).toBeInTheDocument();
  });
});