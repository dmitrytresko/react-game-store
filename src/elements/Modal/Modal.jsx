// import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import closeImg from "../../assets/img/close.png";
import registrationSchema from "../../validations/userRegValidation";
import "./styles.scss";

const Modal = ({ opened, type, children, onCloseClick }) => {
  const registerUser = async (event) => {
    event.preventDefault();

    let formData = {
      login: event.target[1].value,
      password: event.target[2].value,
      doubledPassword: event.target[3].value
    }

    const isDataValid = await registrationSchema.isValid(formData);
    console.log(isDataValid);
  }

  if (!opened) return null;

  return ReactDOM.createPortal(
    <>
      <div className="content-overlay" />

      <form className="modal" onSubmit={registerUser}>
        <div className="modal__head-block">
          <h2 className="modal__title">{type}</h2>
          <button className="modal__close-btn" type="button" onClick={onCloseClick}>
            <img src={closeImg} className="modal__close-btn--img"></img>
          </button>
        </div>

        {children}

        <div className="modal__bottom-block">
          <button className="modal__submit-btn" type="submit">Submit</button>
        </div>
      </form>
    </>,
    document.getElementById('portal')
  )
}

export default Modal;
