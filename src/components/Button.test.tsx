import { shallow } from "enzyme";
import Button from "./Button";

describe("Button", () => {
  describe("Props", () => {
    it("children are correct", () => {
      expect(
        shallow(<Button>Hello</Button>).find('button').text()
      ).toBe(
        "Hello"
      );
    });
  });
});
