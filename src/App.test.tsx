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
      
      // Can see login box when loaded in
      expect(component.find('fieldset > legend').text()).toBe(
        "Login"
      );

      // Cannot see decrypt or encrypt boxes (because not logged in)
      expect(component.find('fieldset > legend').text()).not.toBe(
        "Encrypt"
      );
      expect(component.find('fieldset > legend').text()).not.toBe(
        "Decrypt"
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
