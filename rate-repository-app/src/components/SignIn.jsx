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

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  async function onSubmit(values) {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        placeholder="username"
        style={[
          styles.inputs,
          formik.touched.username &&
            formik.errors.username && {
              borderColor: "red",
              borderWidth: 1,
            },
        ]}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: "red" }}>{formik.errors.username}</Text>
      )}
      <TextInput
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        placeholder="password"
        secureTextEntry
        style={[
          styles.inputs,
          formik.touched.username &&
            formik.errors.username && {
              borderColor: "red",
              borderWidth: 1,
            },
        ]}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: "red" }}>{formik.errors.password}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text fontWeight={"bold"} style={{ color: "white" }}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
