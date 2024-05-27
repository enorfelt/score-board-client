
import { SectionComponent } from './section.component';
import { render, screen } from '@testing-library/angular';

describe('SectionComponent', () => {
  it('should set section title', async () => {
    const { title } = await renderComponent();
    expect(title()).toBeTruthy();
  });

  const renderComponent = async (title: string = 'title', score: number = 1) => {
    const { } = await render(SectionComponent, {
      componentInputs: {
        title,
      },
    });

    return {
      title: () => screen.queryByText(title, { exact: false }),
    };
  };
});