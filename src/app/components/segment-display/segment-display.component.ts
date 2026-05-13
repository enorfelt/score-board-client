import { ChangeDetectionStrategy, Component, computed, model } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-segment-display',
    templateUrl: './segment-display.component.html',
    styleUrls: ['./segment-display.component.scss'],
    imports: [FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SegmentDisplayComponent {
  value = model<number>(0);

  protected ghost = computed(() => '8'.repeat(String(this.value()).length));
  protected displayValue = computed(() => String(this.value()));
}