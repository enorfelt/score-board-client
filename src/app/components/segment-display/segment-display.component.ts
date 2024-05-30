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
}