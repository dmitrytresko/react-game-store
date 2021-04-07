// import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import closeImg from "../../assets/img/close.png";
import { Formik, Form } from "formik";
import registrationSchema from "../../validations/registrationValidation";
import signInSchema from "../../validations/signInValidation";
import "./styles.scss";

const Modal = ({ opened, type, children, onCloseClick, confirmLogin }) => {
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

    console.log(formData)

    const isDataValid = await requiredSchema.isValid(formData);
    if(isDataValid) {
      confirmLogin(values.login);
    }
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
