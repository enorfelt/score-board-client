import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { ClickOutsideDirective } from "../../directives/click-outside/click-outside.directive";
import { ScoreBoardStore } from "../../core/state/score-board.store";

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ClickOutsideDirective]
})
export class ActionsComponent {
  private store = inject(ScoreBoardStore);
  showMenu = signal(false)

  toggleMenu() {
    this.showMenu.update(value => !value)
  }

  closeMenu() {
    this.showMenu.set(false);
  }

  reset() {
    this.store.reset();
  }

  forceUpdate() {
    this.store.forceUpdate();
  }
}
