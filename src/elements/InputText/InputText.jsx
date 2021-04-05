import "./styles.scss";

const InputText = ({ fieldName, message }) => {
  return (
    <label className="input-text">
      {fieldName}
      <input className="input-text__input" placeholder={message}/>
    </label>
  )
}

export default InputText;
