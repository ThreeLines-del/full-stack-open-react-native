import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useFormik } from "formik";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    gap: 10,
  },
  inputs: {
    borderWidth: 1,
    padding: 12,
    borderColor: "gray",
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
};

const validationSchema = yup.object().shape({
  username: yup.string().required("username is required"),
  password: yup.string().required("password is required"),
});

export const SignInForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleSubmit,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={values.username}
        onChangeText={handleChange("username")}
        placeholder="username"
        style={[
          styles.inputs,
          touched.username &&
            errors.username && {
              borderColor: "red",
              borderWidth: 1,
            },
        ]}
      />
      {touched.username && errors.username && (
        <Text style={{ color: "red" }}>{errors.username}</Text>
      )}
      <TextInput
        value={values.password}
        onChangeText={handleChange("password")}
        placeholder="password"
        secureTextEntry
        style={[
          styles.inputs,
          touched.username &&
            errors.username && {
              borderColor: "red",
              borderWidth: 1,
            },
        ]}
      />
      {touched.password && errors.password && (
        <Text style={{ color: "red" }}>{errors.password}</Text>
      )}
      <Pressable onPress={handleSubmit} style={styles.button}>
        <Text fontWeight={"bold"} style={{ color: "white" }}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  async function onSubmit({ username, password }) {
    try {
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <SignInForm
      errors={formik.errors}
      handleChange={formik.handleChange}
      handleSubmit={formik.handleSubmit}
      touched={formik.touched}
      values={formik.values}
    />
  );
};

export default SignIn;
