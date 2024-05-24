import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreComponent {
  @Input({ required: true }) title: string = '';
}