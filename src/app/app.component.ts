import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SegmentDisplayComponent } from './components/segment-display/segment-display.component';
import { SectionComponent } from './components/section/section.component';
import { IncDecButtonsComponent } from './components/inc-dec-buttons/inc-dec-buttons.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SectionComponent, SegmentDisplayComponent, IncDecButtonsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
}
