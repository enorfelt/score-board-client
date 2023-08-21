import { AppComponent } from './app.component';
import { render } from '@testing-library/angular';

describe('AppComponent', () => {
    it('should contain welcome message', async () => {
        const component = await render(AppComponent);
        expect(component.getByText('Welcome to score-board-client!')).toBeTruthy();
    });
});