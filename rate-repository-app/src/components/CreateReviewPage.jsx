import { useFormik } from "formik";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import * as yup from "yup";
import Text from "./Text";
import theme from "../theme";
import { useMutation } from "@apollo/client/react";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useNavigate } from "react-router-native";
import { useState } from "react";

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
  ownerName: "",
  rating: "",
  repositoryName: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  text: yup.string().optional(),
  rating: yup
    .number()
    .required("Rating is required")
    .min(0, "Rating must be at least 0")
    .max(100, "Rating must be at most 100"),
});

const CreateReviewPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [createReview] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    },
  });
  const navigate = useNavigate();

  async function onSubmit(values) {
    const { ownerName, rating, repositoryName, text } = values;

    const newReview = await createReview({
      variables: {
        review: {
          ownerName,
          rating: Number(rating),
          repositoryName,
          text,
        },
      },
    });

    navigate(`/repository/${newReview.data?.createReview.repositoryId}`);
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.parentContainer}>
      <View style={styles.inputsContainer}>
        <TextInput
          value={formik.values.ownerName}
          onChangeText={formik.handleChange("ownerName")}
          placeholder="Repository owner name"
          style={[
            styles.inputs,
            formik.touched.ownerName &&
              formik.errors.ownerName && {
                borderColor: "red",
                borderWidth: 1,
              },
          ]}
        />
        {formik.touched.ownerName && formik.errors.ownerName && (
          <Text style={{ color: "red" }}>{formik.errors.ownerName}</Text>
        )}

        <TextInput
          value={formik.values.repositoryName}
          onChangeText={formik.handleChange("repositoryName")}
          placeholder="Repository name"
          style={[
            styles.inputs,
            formik.touched.repositoryName &&
              formik.errors.repositoryName && {
                borderColor: "red",
                borderWidth: 1,
              },
          ]}
        />
        {formik.touched.repositoryName && formik.errors.repositoryName && (
          <Text style={{ color: "red" }}>{formik.errors.repositoryName}</Text>
        )}

        <TextInput
          value={formik.values.rating}
          onChangeText={formik.handleChange("rating")}
          placeholder="Rating between 0 and 100"
          style={[
            styles.inputs,
            formik.touched.rating &&
              formik.errors.rating && {
                borderColor: "red",
                borderWidth: 1,
              },
          ]}
        />
        {formik.touched.rating && formik.errors.rating && (
          <Text style={{ color: "red" }}>{formik.errors.rating}</Text>
        )}

        <TextInput
          value={formik.values.text}
          onChangeText={formik.handleChange("text")}
          placeholder="Review"
          style={[
            styles.inputs,
            formik.touched.text &&
              formik.errors.text && {
                borderColor: "red",
                borderWidth: 1,
              },
          ]}
          multiline
        />
        {formik.touched.text && formik.errors.text && (
          <Text style={{ color: "red" }}>{formik.errors.text}</Text>
        )}

        {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}

        <Pressable onPress={formik.handleSubmit} style={styles.button}>
          <Text fontWeight={"bold"} style={{ color: "white" }}>
            Create a review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CreateReviewPage;
