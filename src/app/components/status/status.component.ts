import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreBoardStore } from '../../core/state/score-board.store';

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
