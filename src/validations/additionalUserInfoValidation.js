import {object, string } from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const additionalUserInfoSchema = object().shape({
  address: string()
        .required("*Please fill in a required field")
        .min(8, "*Your address must be at least 8 characters"),
  phone: string()
        .required("*Please fill in a required field")
        .matches(phoneRegExp, "*Phone number is not valid"),
})

export default additionalUserInfoSchema;
