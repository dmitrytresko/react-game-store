import { object, string, ref } from "yup";

const registrationSchema = object().shape({
  login: string()
    .required("Please fill in a required field")
    .min(4, "Your login must be at least 4 characters"),
  password: string()
    .required("Please fill in a required field")
    .min(4, "Your password must be at least 4 characters"),
  confirmPassword: string()
    .required("Please fill in a required field")
    .oneOf(
      [ref("password"), null],
      "Your password does not match the first one"
    ),
});

export default registrationSchema;
