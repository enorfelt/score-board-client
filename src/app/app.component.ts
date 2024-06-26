import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AddRemoveButtonsComponent, SectionComponent, SegmentDisplayComponent } from './components';
import { ScoreBoardStore } from './core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SectionComponent, SegmentDisplayComponent, AddRemoveButtonsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private store = inject(ScoreBoardStore);

  homeScoreSig = computed(() => this.store.state().home);
  awayScoreSig = computed(() => this.store.state().away);
  inningsSig = computed(() => this.store.state().inning);

  firstOutSig = computed(() => {
    const state = this.store.state();
    return (state.outsInInning > 0 && state.outsInInning < 3) || (state.outsInInning > 3);
  });

  secondOutSig = computed(() => {
    const state = this.store.state();
    return (state.outsInInning > 1 && state.outsInInning < 3) || (state.outsInInning > 4);
  });

  homeScoreIncreased() {
    this.store.homeScores();
  }

  homeScoreDecreased() {
    this.store.homeLosesScore();
  }

  awayScoreIncreased() {
    this.store.awayScores();
  }

  awayScoreDecreased() {
    this.store.awayLosesScore();
  }

  inningIncreased() {
    this.store.addInning();
  }

  inningDecreased() {
    this.store.removeInning();
  }

  outIncreased() {
    this.store.addOut();
  }

  outDecreased() {
    this.store.removeOut();
  }
}
