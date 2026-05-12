
import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
    selector: 'app-section',
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.scss'],
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionComponent {
  title = input<string>('');
}