import { render, screen, waitFor } from "@testing-library/angular";
import { UiService } from "../../core/ui/ui.service";
import { of } from "rxjs";
import { ErrorDialogComponent } from "./error-dialog.componet";
import userEvent from "@testing-library/user-event";

describe('SpinnerComponent', () => {
  it('should not show dialog by default', async () => {
    await render(ErrorDialogComponent);
    expect(screen.queryByTestId('error-dialog')).not.toBeVisible();
  });

  it('should show dialog on error message', async () => {
    const { detectChanges } = await render(ErrorDialogComponent, {
      providers: [{
        provide: UiService,
        useValue: {
          error$: of({ error: '500', message: 'Error message'})
        } as UiService
      }]
    });

    detectChanges();

    expect(screen.queryByText('Error message')).toBeInTheDocument();
  });

  it('should close dialog', async () => {
    const user = userEvent.setup();
    const { detectChanges } = await render(ErrorDialogComponent, {
      providers: [{
        provide: UiService,
        useValue: {
          error$: of({ error: '500', message: 'Error message'})
        } as UiService
      }]
    });

    await waitFor(() => expect(screen.queryByText('Error message')).toBeInTheDocument());

    user.click(screen.getByTestId('close-button'));

    detectChanges();

    expect(screen.queryByTestId('error-dialog')).not.toBeVisible();
  });
});