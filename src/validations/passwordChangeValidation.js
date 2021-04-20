import {object, string, ref} from "yup";

const passwordChangeSchema = object().shape({
  currentPasswordFromStore: string(),
  currentPassword: string()
        .required("*Please fill in a required field")
        .oneOf([ref('currentPasswordFromStore'), null], "*This password does not match your current"),
  newPassword: string()
        .required("*Please fill in a required field")
        .min(4, "*Your password must be at least 4 characters"),
  confirmNewPassword: string()
        .required("*Please fill in a required field")
        .oneOf([ref('newPassword'), null], "*Your password does not match the new one")
})

export default passwordChangeSchema;
