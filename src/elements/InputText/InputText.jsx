import { Field, ErrorMessage } from "formik";
import "./styles.scss";

const InputText = ({ fieldLabel, fieldName, fieldType, message, prefix, customStyles}) => {
  return (
    <label className="input-text" style={customStyles} onClick={(event) => event.preventDefault()}>
      {fieldLabel}
      <div className="input-text__container--inner">
        {prefix && <img src={prefix} style={{ width: '100px', marginBottom: '10px' }} />}
        <Field className="input-text__input" name={fieldName} type={fieldType} placeholder={message} autoComplete="off" />
        <ErrorMessage className="input-text__error" name={fieldName} component="p"></ErrorMessage>
      </div>
    </label>
  )
}

export default InputText;
