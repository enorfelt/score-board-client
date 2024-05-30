import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event'
import { AddRemoveButtonsComponent } from './inc-dec-buttons.component';

describe('IncDecButtonsComponent', () => {
    it('should emit value added', async () => {
        const { addValue, valueAdded } = await renderComponent();
        await addValue();
        expect(valueAdded).toHaveBeenCalled();
    });

    it('should emit value removed', async () => {
        const { removeValue, valueRemoved } = await renderComponent();
        await removeValue();
        expect(valueRemoved).toHaveBeenCalled();
    });

    const renderComponent = async () => {
        const user = userEvent.setup();
        const valueAddedSpy = jest.fn();
        const valueRemovedSpy = jest.fn();

        const { } = await render(AddRemoveButtonsComponent, {
            componentOutputs: {
                valueAdded: { emit: valueAddedSpy } as any,
                valueRemoved: { emit: valueRemovedSpy } as any,
            },
        });

        return {
            user,
            value: () => screen.queryByRole('textbox'),
            addValue: () => user.click(screen.getByRole('button', { name: '+' })),
            valueAdded: valueAddedSpy,
            removeValue: () => user.click(screen.getByRole('button', { name: '-' })),
            valueRemoved: valueRemovedSpy,
        };
    };
});