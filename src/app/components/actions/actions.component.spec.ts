import { render, screen } from "@testing-library/angular";
import { ActionsComponent } from "./actions.component";
import userEvent from "@testing-library/user-event";
import { ScoreBoardStore } from "../../core/state/score-board.store";

describe('ActionsComponent', () => {
  it('should render', async () => {
    const { fixture } = await renderComponent();

    expect(fixture).toBeTruthy();
  });

  it('should not show menu by default', async () => {
    const { menu } = await renderComponent();

    expect(menu()).not.toBeInTheDocument();
  });

  it('should toggle menu', async () => {
    const { menu, toggleMenu } = await renderComponent();

    await toggleMenu();
    expect(menu()).toBeInTheDocument();

    await toggleMenu();
    expect(menu()).not.toBeInTheDocument();
  });

  it('should close menu when clicking outside', async () => {
    const { menu, toggleMenu, clickBody, debug } = await renderComponent();

    await toggleMenu();
    expect(menu()).toBeInTheDocument();

    await clickBody();
    expect(menu()).not.toBeInTheDocument();
  });

  it('should call reset when clicked', async () => {
    const { clickReset, store, toggleMenu } = await renderComponent();

    await toggleMenu();
    await clickReset();

    expect(store.reset).toHaveBeenCalledTimes(1);
  });

  it('should call forceUpdate when clicked', async () => {
    const { clickForceUpdate, store, toggleMenu } = await renderComponent();

    await toggleMenu();
    await clickForceUpdate();

    expect(store.forceUpdate).toHaveBeenCalledTimes(1);
  });

  const renderComponent = async () => {
    const user = userEvent.setup();

    const scoreBoardStoreMock = {
      reset: jest.fn(),
      forceUpdate: jest.fn()
    };

    const { fixture, debug } = await render(ActionsComponent, {
      providers: [
        { 
          provide: ScoreBoardStore, 
          useValue: scoreBoardStoreMock }
      ]
    });

    return {
      fixture,
      debug,
      store: scoreBoardStoreMock,
      menu: () => screen.queryByRole('menu'),
      toggleMenu: () => user.click(screen.getByRole('button', { name: /actions/i })),
      clickBody: () => user.click(document.body),
      clickReset: () => user.click(screen.getByRole('menuitem', { name: /reset/i })),
      clickForceUpdate: () => user.click(screen.getByRole('menuitem', { name: /force update/i })),
    }
  }
}); 