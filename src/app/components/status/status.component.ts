import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ScoreBoardService } from '../../core/state/score-board.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { map, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusComponent {
  scoreBoardService = inject(ScoreBoardService);

  isReady = toSignal(this.scoreBoardService.status().pipe(map((status) => status.isReady)));
}
