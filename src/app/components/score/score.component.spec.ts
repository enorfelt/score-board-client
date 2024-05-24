import { ScoreComponent } from './score.component';
import { render } from '@testing-library/angular';

describe('AppComponent', () => {
    it('should set section title', async () => {
        const component = await render(ScoreComponent, { componentProperties: { title: 'title' } });
        expect(component.getByText('title', { exact: false })).toBeTruthy();

    });
});