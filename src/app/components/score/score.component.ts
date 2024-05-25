import { ChangeDetectionStrategy, Component, Input, importProvidersFrom, input, model } from "@angular/core";
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

}