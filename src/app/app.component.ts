import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SectionComponent } from './components/section/section.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.componet';
import { AddRemoveButtonsComponent } from './components/inc-dec-buttons/inc-dec-buttons.component';
import { SegmentDisplayComponent } from './components/segment-display/segment-display.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ScoreBoardStore } from './core/state/score-board.store';
import { StatusComponent } from './components/status/status.component';
import { ActionsComponent } from './components/actions/actions.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    SectionComponent, 
    SegmentDisplayComponent, 
    AddRemoveButtonsComponent, 
    SpinnerComponent, 
    ErrorDialogComponent, 
    StatusComponent,
    ActionsComponent
  ],
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
