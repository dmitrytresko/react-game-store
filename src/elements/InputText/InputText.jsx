import { Field, ErrorMessage } from "formik";
import warningIcon from "../../assets/img/warning.png";
import "./styles.scss";

const InputText = ({
  fieldLabel,
  fieldName,
  fieldType,
  message,
  prefix,
  customStyles,
}) => {
  return (
    <label
      className="input-text"
      style={customStyles}
      onClick={(event) => fieldType !== "file" && event.preventDefault()}
    >
      <span>{fieldLabel}</span>
      <div className="input-text__container--inner">
        {prefix && (
          <img src={prefix} style={{ width: "100px", marginBottom: "8px" }} />
        )}
        <Field
          className="input-text__input"
          name={fieldName}
          type={fieldType}
          placeholder={message}
          autoComplete="off"
        />
        <ErrorMessage name={fieldName}>
          {(msg) => (
            <div className="input-text__error">
              <img className="input-text__error--icon" src={warningIcon} />
              {msg}
            </div>
          )}
        </ErrorMessage>
      </div>
    </label>
  );
};

export default InputText;
