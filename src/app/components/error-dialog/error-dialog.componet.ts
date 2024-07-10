
import { ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from "@angular/core";
import { UiService } from "../../core/ui/ui.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { tap } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-error-dialog",
  templateUrl: "./error-dialog.component.html",
  styleUrls: ["./error-dialog.component.scss"],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class ErrorDialogComponent {
  private uiService = inject(UiService);

  dialog = viewChild<ElementRef>('dialog');

  error = toSignal(this.uiService.error$.pipe(tap(() => this.open())));

  open() {
    this.dialog()?.nativeElement.showModal();
  }

  close() {
    this.dialog()?.nativeElement.close();
  }

}