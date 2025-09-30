import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { SignInForm } from "../../components/SignIn";
import { Formik } from "formik";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();

      const { getByPlaceholderText, getByText } = render(
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={onSubmit}
        >
          {(formik) => <SignInForm {...formik} />}
        </Formik>
      );

      fireEvent.changeText(getByPlaceholderText("username"), "kalle");
      fireEvent.changeText(getByPlaceholderText("password"), "password");
      fireEvent.press(getByText("Sign in"));

      console.log(onSubmit.mock.calls);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);

        expect(onSubmit).toHaveBeenCalledWith(
          { username: "kalle", password: "password" },
          expect.anything()
        );
      });
    });
  });
});
