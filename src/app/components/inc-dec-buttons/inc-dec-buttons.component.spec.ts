import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event'
import { IncDecButtonsComponent } from './inc-dec-buttons.component';

describe('IncDecButtonsComponent', () => {
    it('should emit increased score', async () => {
        const { increaseScore, scoreIncreased, user } = await renderComponent();
        await increaseScore();
        expect(scoreIncreased).toHaveBeenCalled();
    });

    it('should emit decreased score', async () => {
        const { decreaseScore, scoreDecreased } = await renderComponent();
        await decreaseScore();
        expect(scoreDecreased).toHaveBeenCalled();
    });

    const renderComponent = async () => {
        const user = userEvent.setup();
        const scoreIncreasedSpy = jest.fn();
        const scoreDecreasedSpy = jest.fn();

        const { } = await render(IncDecButtonsComponent, {
            componentOutputs: {
                scoreIncreased: { emit: scoreIncreasedSpy } as any,
                scoreDecreased: { emit: scoreDecreasedSpy } as any,
            },
        });

        return {
            user,
            value: () => screen.queryByRole('textbox'),
            increaseScore: () => user.click(screen.getByRole('button', { name: '+' })),
            scoreIncreased: scoreIncreasedSpy,
            decreaseScore: () => user.click(screen.getByRole('button', { name: '-' })),
            scoreDecreased: scoreDecreasedSpy,
        };
    };
});