import { ChangeDetectionStrategy, Component, output } from "@angular/core";

@Component({
  selector: 'app-inc-dec-buttons',
  templateUrl: './inc-dec-buttons.component.html',
  styleUrls: ['./inc-dec-buttons.component.scss'],
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncDecButtonsComponent {
  scoreIncreased = output();
  scoreDecreased = output();

  increaseScore(): void {
    this.scoreIncreased.emit();
  }

  decreaseScore(): void {
    this.scoreDecreased.emit();
  }
}