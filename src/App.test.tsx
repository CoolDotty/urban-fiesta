import { shallow } from "enzyme";
import App from "./App";
import { render } from "@testing-library/react";

describe("App", () => {
  describe("using enzyme", () => {
    it("returns the text", () => {
      const component = shallow(<App />);

      expect(component.find('[data-testid="greetings-container"]').text()).toBe(
        "Greetings! Welcome to the XQ take-home assessment"
      );
    });
  });

  describe("using testing library", () => {
    it("returns the text", () => {
      const component = render(<App />);

      expect(component.getByTestId("greetings-container").innerHTML).toBe(
        "Greetings! Welcome to the XQ take-home assessment"
      );
    });
  });
});
