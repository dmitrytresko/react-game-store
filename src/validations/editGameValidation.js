import {object, string, number } from "yup";

const editGameSchema = object().shape({
  name: string()
        .required("*Please fill in a required field")
        .min(4, "*Game name must be at least 4 characters"),
  genre: string()
        .required("*Please fill in a required field")
        .min(2, "*Game genre must be at least 2 characters"),
  price: number()
        .required("*Please fill in a required field")
        .typeError("*Please provide a numeric value for game price"),
  company: string()
        .required("*Please fill in a required field")
        .min(2, "*Company name must be at least 2 characters"),
  age: number()
        .required("*Please fill in a required field")
        .typeError("*Please provide a numeric value for minimal game age"),
})

export default editGameSchema;
