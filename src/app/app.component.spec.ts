import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { render, screen, within } from '@testing-library/angular';
import { Matcher } from "@testing-library/dom";
import userEvent from '@testing-library/user-event';
import { ScoreBoardStore, defaultState } from './core';
import { ScoreBoardState } from './core/state/score-board.state';
import { signal } from '@angular/core';

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

    describe.each([
        {
            title: 'home',
            matcher: /home/i,
        },
        {
            title: 'away',
            matcher: /away/i,
        },
        {
            title: 'inning',
            matcher: /inning/i,
        }
    ])('when updating display value for $title', ({ title, matcher }) => {
        it('should increase value', async () => {
            const { add, display } = await createComponent({ home: 0, away: 0, inning: 0 });
            await add(matcher);
            expect(display(matcher)).toHaveValue('1');
        });

        it('should decrease value', async () => {
            const { remove, display } = await createComponent({ home: 1, away: 1, inning: 1 });
            await remove(matcher);
            expect(display(matcher)).toHaveValue('0');
        });
    });

    describe('outs', () => {
        describe('when adding outs', () => {
            it.each([
                {
                    outs: 0,
                    expectedOuts: 0,
                    expect: (firstOut: () => Element | null, secondOut: () => Element | null) => {
                        expect(firstOut()).not.toBeChecked();
                        expect(secondOut()).not.toBeChecked();
                    }
                },
                {
                    outs: 1,
                    expectedOuts: 1,
                    expect: (firstOut: () => Element | null, secondOut: () => Element | null) => {
                        expect(firstOut()).toBeChecked();
                        expect(secondOut()).not.toBeChecked();
                    }
                },
                {
                    outs: 2,
                    expectedOuts: 2,
                    expect: (firstOut: () => Element | null, secondOut: () => Element | null) => {
                        expect(firstOut()).toBeChecked();
                        expect(secondOut()).toBeChecked();
                    }
                },
                {
                    outs: 3,
                    expectedOuts: 0,
                    expect: (firstOut: () => Element | null, secondOut: () => Element | null) => {
                        expect(firstOut()).not.toBeChecked();
                        expect(secondOut()).not.toBeChecked();
                    }
                },
                {
                    outs: 4,
                    expectedOuts: 1,
                    expect: (firstOut: () => Element | null, secondOut: () => Element | null) => {
                        expect(firstOut()).toBeChecked();
                        expect(secondOut()).not.toBeChecked();
                    }
                },
                {
                    outs: 5,
                    expectedOuts: 2,
                    expect: (firstOut: () => Element | null, secondOut: () => Element | null) => {
                        expect(firstOut()).toBeChecked();
                        expect(secondOut()).toBeChecked();
                    }
                }
            ])('should show $expectedOuts out for $outs out in the inning', async ({ outs, expectedOuts, expect }) => {
                const { add, firstOut, secondOut } = await createComponent();
                for (let i = 0; i < outs; i++) {
                    await add(/outs/i);
                }
                expect(firstOut, secondOut);
            });
        });

        describe('when removing outs', () => {
            it.each([
                {
                    outs: 1,
                    expectedOuts: 0,
                    expect: (firstOut: () => Element | null, secondOut: () => Element | null) => {
                        expect(firstOut()).not.toBeChecked();
                        expect(secondOut()).not.toBeChecked();
                    }
                },
                {
                    outs: 2,
                    expectedOuts: 1,
                    expect: (firstOut: () => Element | null, secondOut: () => Element | null) => {
                        expect(firstOut()).toBeChecked();
                        expect(secondOut()).not.toBeChecked();
                    }
                },
                {
                    outs: 3,
                    expectedOuts: 2,
                    expect: (firstOut: () => Element | null, secondOut: () => Element | null) => {
                        expect(firstOut()).toBeChecked();
                        expect(secondOut()).toBeChecked();
                    }
                },
                {
                    outs: 4,
                    expectedOuts: 0,
                    expect: (firstOut: () => Element | null, secondOut: () => Element | null) => {
                        expect(firstOut()).not.toBeChecked();
                        expect(secondOut()).not.toBeChecked();
                    }
                },
                {
                    outs: 5,
                    expectedOuts: 1,
                    expect: (firstOut: () => Element | null, secondOut: () => Element | null) => {
                        expect(firstOut()).toBeChecked();
                        expect(secondOut()).not.toBeChecked();
                    }
                },
                {
                    outs: 6,
                    expectedOuts: 2,
                    expect: (firstOut: () => Element | null, secondOut: () => Element | null) => {
                        expect(firstOut()).toBeChecked();
                        expect(secondOut()).toBeChecked();
                    }
                }
            ])('should show $expectedOuts outs after removing an out from $outs outs in the inning', async ({ outs, expectedOuts, expect }) => {
                const { remove, firstOut, secondOut } = await createComponent({ outsInInning: outs});
                await remove(/outs/i);
                expect(firstOut, secondOut);
            });
        });
    });
    const createComponent = async (partialState: Partial<ScoreBoardState> = {}) => {
        const user = userEvent.setup();
        const store = new FakeScoreBoardStore({ ...defaultState, ...partialState })

        const { container } = await render(AppComponent, {
            providers: [
                provideHttpClient(),
                {
                    provide: ScoreBoardStore,
                    useValue: store
                }
            ]
        });

        // screen.logTestingPlaygroundURL();

        return {
            add: async (id: Matcher) => {
                const view = screen.getByTitle(id);
                const button = within(view).getByRole('button', {
                    name: /\+/i
                });
                await user.click(button);
            },
            remove: async (id: Matcher) => {
                const view = screen.getByTitle(id);
                const button = within(view).getByRole('button', {
                    name: /-/i
                });
                await user.click(button);
            },
            display: (id: Matcher) => {
                const view = screen.getByTitle(id);
                return within(view).getByRole('textbox');
            },
            firstOut: () => {
                return container.querySelector('#out1')
            },
            secondOut: () => {
                return container.querySelector('#out2')
            }
        }
    }
});

class FakeScoreBoardStore {

    state = signal<ScoreBoardState>(this.initialState);

    constructor(private initialState: ScoreBoardState) {
    }
    homeScores() {
        this.state.update(s => ({ ...s, home: s.home + 1 }));
    }
    homeLosesScore() {
        this.state.update(s => ({ ...s, home: s.home - 1 }));
    }
    awayScores() {
        this.state.update(s => ({ ...s, away: s.away + 1 }));
    }
    awayLosesScore() {
        this.state.update(s => ({ ...s, away: s.away - 1 }));
    }

    addInning() {
        this.state.update(s => ({ ...s, inning: s.inning + 1 }));
    }

    removeInning() {
        this.state.update(s => ({ ...s, inning: s.inning - 1 }));
    }

    addOut() {
        this.state.update(s => ({ ...s, outsInInning: s.outsInInning + 1 }));
    }

    removeOut() {
        this.state.update(s => ({ ...s, outsInInning: s.outsInInning - 1 }));
    }
}