// import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import closeImg from "../../assets/img/close.png";
import { Formik, Form } from "formik";
import axios from "axios";
import registrationSchema from "../../validations/registrationValidation";
import signInSchema from "../../validations/signInValidation";
import "./styles.scss";

const Modal = ({ opened, type, children, onCloseClick, confirmAuthentication }) => {
  const onSubmitHandler = async (values) => {
    let formData;
    let requiredSchema;

    if (type === "Registration") {
      requiredSchema = registrationSchema;

      formData = {
        login: values.login,
        password: values.password,
        confirmPassword: values.confirmPassword
      }
    }

    if (type === "Sign In") {
      requiredSchema = signInSchema;

      formData = {
        login: values.login,
        password: values.password
      }
    }

    const isDataValid = await requiredSchema.isValid(formData);
    if(isDataValid) {
      confirmAuthentication(values.login);
      localStorage.setItem("loggedUser", JSON.stringify(formData));

      performRegistrationRequest(formData);
    }
  }

  const performRegistrationRequest = async(formData) => {
    const response = await axios.post('http://localhost:4000/auth/signUp', {
      login: formData.login,
      password: formData.password
    })

    console.log(response);
  }

  if (!opened) return null;

  return ReactDOM.createPortal(
    <>
      <div className="content-overlay" />

      <Formik initialValues={{
        login: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={type === "Registration" ? registrationSchema : signInSchema}
      onSubmit={(values) => onSubmitHandler(values)}>
        <Form className="modal">
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
        </Form>
      </Formik>
    </>,
    document.getElementById('portal')
  )
}

export default Modal;
