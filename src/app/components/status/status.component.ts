import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { ScoreBoardService } from '../../core/state/score-board.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { map, startWith, switchMap } from 'rxjs';
import { ScoreBoardStore } from 'src/app/core/state/score-board.store';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusComponent implements OnInit {
  store = inject(ScoreBoardStore);

  isReady = computed(() => this.store.isReady());

  ngOnInit(): void {
    this.store.checkStatus();
  }
}
