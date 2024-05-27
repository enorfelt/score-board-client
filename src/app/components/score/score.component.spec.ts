import { ScoreComponent } from './score.component';
import { render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event'

describe('ScoreComponent', () => {
    it('should set section title', async () => {
        const { title } = await renderComponent();
        expect(title()).toBeTruthy();
    });

    it('should show provided score', async () => {
        const { score } = await renderComponent();
        expect(score()).toHaveValue('1');
    });

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

    const renderComponent = async (title: string = 'title', score: number = 1) => {
        const user = userEvent.setup();
        const scoreIncreasedSpy = jest.fn();
        const scoreDecreasedSpy = jest.fn();

        const { } = await render(ScoreComponent, {
            componentInputs: {
                title,
                score,
            },
            componentOutputs: {
                scoreIncreased: { emit: scoreIncreasedSpy } as any,
                scoreDecreased: { emit: scoreDecreasedSpy } as any,
            },
        });

        return {
            user,
            title: () => screen.queryByText(title, { exact: false }),
            score: () => screen.queryByRole('textbox'),
            increaseScore: () => user.click(screen.getByRole('button', { name: '+' })),
            scoreIncreased: scoreIncreasedSpy,
            decreaseScore: () => user.click(screen.getByRole('button', { name: '-' })),
            scoreDecreased: scoreDecreasedSpy,
        };
    };
});