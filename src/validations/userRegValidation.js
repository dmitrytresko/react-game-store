import {object, string, ref} from "yup";

const registrationSchema = object().shape({
  login: string().required(),
  password: string().required().min(4).max(20),
  confirmPassword: string().required().oneOf([ref('password'), null], "Your password does not the first one!")
})

export default registrationSchema;
