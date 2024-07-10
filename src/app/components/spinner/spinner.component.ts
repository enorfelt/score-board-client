import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { UiService } from "../../core";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-spinner",
  templateUrl: "./spinner.component.html",
  styleUrls: ["./spinner.component.scss"],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  private uiService = inject(UiService);

  isLoading = toSignal(this.uiService.delayedLoading$)
}