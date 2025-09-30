import { Pressable, StyleSheet, TextInput, View } from "react-native";
import theme from "../theme";
import Text from "./Text";
import * as yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client/react";
import { CREATE_USER } from "../graphql/mutations";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: "#d7d3d35e",
    flexGrow: 1,
  },
  inputsContainer: {
    padding: 10,
    gap: 10,
    backgroundColor: "white",
  },
  inputs: {
    borderWidth: 1,
    padding: 12,
    borderColor: "#706b6b5e",
    borderRadius: 2,
    fontSize: 16,
  },
  button: {
    padding: 12,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
  },
});

const initialValues = {
  username: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required").min(5).max(30),
  password: yup.string().required("Password is required").min(5).max(50),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Field is required"),
});

const SignUp = () => {
  const [signIn] = useSignIn();
  const [createUser] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await createUser({
        variables: {
          user: {
            username,
            password,
          },
        },
      });

      await signIn({ username, password });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.parentContainer}>
      <View style={styles.inputsContainer}>
        <TextInput
          value={formik.values.username}
          onChangeText={formik.handleChange("username")}
          placeholder="username"
          style={styles.inputs}
        />
        {formik.touched.username && formik.errors.username && (
          <Text style={{ color: "red" }}>{formik.errors.username}</Text>
        )}

        <TextInput
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          placeholder="password"
          style={styles.inputs}
        />
        {formik.touched.password && formik.errors.password && (
          <Text style={{ color: "red" }}>{formik.errors.password}</Text>
        )}

        <TextInput
          value={formik.values.confirmPassword}
          onChangeText={formik.handleChange("confirmPassword")}
          placeholder="confirm password"
          style={styles.inputs}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <Text style={{ color: "red" }}>{formik.errors.confirmPassword}</Text>
        )}

        <Pressable onPress={formik.handleSubmit} style={styles.button}>
          <Text fontWeight={"bold"} style={{ color: "white" }}>
            Sign up
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUp;
