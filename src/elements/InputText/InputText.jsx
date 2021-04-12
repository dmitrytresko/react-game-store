import { Field, ErrorMessage } from "formik";
import "./styles.scss";

const InputText = ({ fieldLabel, fieldName, message }) => {
  return (
    <label className="input-text">
      {fieldLabel}
      <div className="input-text__container--inner">
        <Field className="input-text__input" name={fieldName} placeholder={message} autoComplete="off"/>
        <ErrorMessage className="input-text__error" name={fieldName} component="p"></ErrorMessage>
      </div>
    </label>
  )
}

export default InputText;
