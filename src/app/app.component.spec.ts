import { AppComponent } from './app.component';
import { render, screen } from '@testing-library/angular';

describe('AppComponent', () => {
    it('should contain home', async () => {
        const component = await render(AppComponent);
        expect(screen.queryByText('Home')).toBeInTheDocument();
    });
    it('should contain away', async () => {
        const component = await render(AppComponent);
        expect(screen.queryByText('Away')).toBeInTheDocument();
    });
    it('should contain innings', async () => {
        const component = await render(AppComponent);
        expect(screen.queryByText('Innings')).toBeInTheDocument();
    });
    it('should contain outs', async () => {
        const component = await render(AppComponent);
        expect(screen.queryByText('Outs')).toBeInTheDocument();
    });
});