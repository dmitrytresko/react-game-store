import "./styles.scss";

const SubmitBtn = ({ children }) => {
  return (
    <button className="submit-btn" type="submit">{children}</button>
  )
}

export default SubmitBtn;
