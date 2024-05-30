import { ChangeDetectionStrategy, Component, output } from "@angular/core";

@Component({
  selector: 'app-add-remove-buttons',
  templateUrl: './inc-dec-buttons.component.html',
  styleUrls: ['./inc-dec-buttons.component.scss'],
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddRemoveButtonsComponent {
  valueAdded = output();
  valueRemoved = output();

  addValue(): void {
    this.valueAdded.emit();
  }

  removeValue(): void {
    this.valueRemoved.emit();
  }
}