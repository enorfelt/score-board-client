import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SegmentDisplayComponent } from './components/segment-display/segment-display.component';
import { SectionComponent } from './components/section/section.component';
import { IncDecButtonsComponent } from './components/inc-dec-buttons/inc-dec-buttons.component';
import { ScoreBoardStore, initializeScoreBoardStore } from './core/state/score-board.store';
import { initialState } from './core/state/score-board.state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SectionComponent, SegmentDisplayComponent, IncDecButtonsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [...initializeScoreBoardStore(initialState)]
})
export class AppComponent {
  private store = inject(ScoreBoardStore);

  homeScoreSig = computed(() => this.store.state().home);

  homeScoreIncreased() {
    this.store.homeScores();
  }
}
