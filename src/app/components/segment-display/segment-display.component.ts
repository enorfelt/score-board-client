import { ChangeDetectionStrategy, Component, model, output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-segment-display',
  templateUrl: './segment-display.component.html',
  styleUrls: ['./segment-display.component.scss'],
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SegmentDisplayComponent {
  value = model<number>(0);
  scoreIncreased = output();
  scoreDecreased = output();

  increaseScore(): void {
    this.scoreIncreased.emit();
  }

  decreaseScore(): void {
    this.scoreDecreased.emit();
  }
}