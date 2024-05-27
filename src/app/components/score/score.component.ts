import { ChangeDetectionStrategy, Component, Input, importProvidersFrom, input, model, output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreComponent {
  title = input<string>('');
  score = model<number>(0);
  scoreIncreased = output();
  scoreDecreased = output();

  increaseScore(): void {
    this.scoreIncreased.emit();
  }

  decreaseScore(): void {
    this.scoreDecreased.emit();
  }
}