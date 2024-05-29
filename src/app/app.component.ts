import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IncDecButtonsComponent, SectionComponent, SegmentDisplayComponent } from './components';
import { ScoreBoardStore } from './core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SectionComponent, SegmentDisplayComponent, IncDecButtonsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private store = inject(ScoreBoardStore);

  homeScoreSig = computed(() => this.store.state().home);

  homeScoreIncreased() {
    this.store.homeScores();
  }
}
