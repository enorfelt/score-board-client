import { AppComponent } from './app.component';
import { render } from '@testing-library/angular';

describe('AppComponent', () => {
    it('should contain innings', async () => {
        const component = await render(AppComponent);
        expect(component.getByText('Inning')).toBeTruthy();
    });
});