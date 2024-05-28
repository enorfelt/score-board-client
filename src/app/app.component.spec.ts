import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { render, screen } from '@testing-library/angular';

describe('AppComponent', () => {
    it('should contain home', async () => {
        await createComponent();
        expect(screen.queryByText('Home')).toBeInTheDocument();
    });
    it('should contain away', async () => {
        await createComponent();
        expect(screen.queryByText('Away')).toBeInTheDocument();
    });
    it('should contain innings', async () => {
        await createComponent();
        expect(screen.queryByText('Innings')).toBeInTheDocument();
    });
    it('should contain outs', async () => {
        await createComponent();
        expect(screen.queryByText('Outs')).toBeInTheDocument();
    });

    const createComponent = async () => {
        await render(AppComponent, {
            providers: [
                provideHttpClient(),
            ]
        });
    }
});