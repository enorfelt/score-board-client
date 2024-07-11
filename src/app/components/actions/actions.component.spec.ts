import { render } from "@testing-library/angular";
import { ActionsComponent } from "./actions.component";

describe('ActionsComponent', () => {
  it('should render', async () => {
    const { fixture } = await render(ActionsComponent);

    expect(fixture).toBeTruthy(); 
  });
  
  const renderComponent = async () => {
    const { fixture } = await render(ActionsComponent);

    return { fixture}    
  }
});