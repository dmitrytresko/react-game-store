import {object, string } from "yup";

const signInSchema = object().shape({
  login: string()
        .required("*Please fill in a required field")
        .min(4, "*Your login must be at least 4 characters"),
  password: string()
        .required("*Please fill in a required field")
        .min(4, "*Your password must be at least 4 characters")
})

export default signInSchema;
