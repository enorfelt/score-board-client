import { SegmentDisplayComponent } from './segment-display.component';
import { render, screen } from '@testing-library/angular';

describe('SegmentDisplayComponent', () => {
    it('should show provided value', async () => {
        const { value } = await renderComponent();
        expect(value()).toHaveValue('1');
    });

    const renderComponent = async (value: number = 1) => {
        const { } = await render(SegmentDisplayComponent, {
            componentInputs: {
                value,
            },
        });

        return {
            value: () => screen.queryByRole('textbox'),
        };
    };
});