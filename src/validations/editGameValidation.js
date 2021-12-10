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
        .min(0, "*Game price must be a positive value")
        .typeError("*Please provide a numeric value for game price"),
  company: string()
        .required("*Please fill in a required field")
        .min(2, "*Company name must be at least 2 characters"),
  age: number()
        .required("*Please fill in a required field")
        .min(0, "*Game age must be a positive value")
        .max(18, "*Maximum age restriction must be 18")
        .typeError("*Please provide a numeric value for minimal game age"),
  metaRating: number()
        .min(0, "*Game rating can't be a negative value")
        .max(100, "*The maximim rating value must be 100")
        .typeError("*Please provide a numeric value for game rating"),
})

export default editGameSchema;
