import { useFormik } from "formik";
import * as yup from "yup";
import Text from "./Text";
import { Pressable, TextInput, View } from "react-native";
import theme from "../theme";

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    padding: 10,
  },
  input: {
    height: 40,
    marginVertical: 7,
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
    color: theme.colors.textSecondary,
    error: {
      borderColor: theme.colors.error,
    },
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    padding: 10,
    textAlign: "center",
    marginVertical: 7,
    color: "white",
  },
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <View style={styles.form}>
      <TextInput
        style={[
          styles.input,
          formik.touched.username &&
            formik.errors.username &&
            styles.input.error,
        ]}
        placeholder="Username"
        onChangeText={formik.handleChange("username")}
        value={formik.values.username}
        valida
      />
      {formik.touched.username && formik.errors.username && (
        <Text color="error">{formik.errors.username}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.touched.password &&
            formik.errors.password &&
            styles.input.error,
        ]}
        placeholder="Password"
        secureTextEntry
        onChangeText={formik.handleChange("password")}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password && (
        <Text color="error">{formik.errors.password}</Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.button}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
