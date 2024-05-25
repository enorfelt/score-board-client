import { ScoreComponent } from './score.component';
import { render } from '@testing-library/angular';

describe('ScoreComponent', () => {
    it('should set section title', async () => {
        const component = await renderComponent();
        expect(component.getByText('title', { exact: false })).toBeTruthy();
    });

    it('should show provided score', async () => {
        const component = await renderComponent();
        expect(component.getByRole('textbox')).toHaveValue('1');
    });

    const renderComponent = async (title: string = 'title', score: number = 1) => {
        return await render(`<app-score title="${title}" score="${score}"></app-score>`, { imports: [ScoreComponent] });
    };
});