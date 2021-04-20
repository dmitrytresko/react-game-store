import { useState } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import closeImg from "../../assets/img/close.png";
import { Formik, Form } from "formik";
import axios from "axios";
import registrationSchema from "../../validations/registrationValidation";
import signInSchema from "../../validations/signInValidation";
import passwordChangeSchema from "../../validations/passwordChangeValidation";
import "./styles.scss";
import { useEffect } from 'react';

const Modal = ({ opened, type, children, onCloseClick, confirmUserAuthentication, confirmPasswordChange }) => {
  const userState = useSelector(state => state.user);
  const {isLogged, password} = userState;

  const [title, setTitle] = useState('');

  useEffect(() => {
    switch(type) {
      case "registration": return setTitle("Registration");
      case "signIn": return setTitle("Sign In");
      case "passwordChange": return setTitle("Password change");
    }
  }, [type])

  const onSubmitHandler = async (values) => {
    let formData;
    let requiredSchema;

    if (type === "registration") {
      requiredSchema = registrationSchema;

      formData = {
        login: values.login,
        password: values.password,
        confirmPassword: values.confirmPassword
      }
    }

    if (type === "signIn") {
      requiredSchema = signInSchema;

      formData = {
        login: values.login,
        password: values.password
      }
    }

    if (type === "passwordChange") {
      requiredSchema = passwordChangeSchema;

      formData = {
        currentPasswordFromStore: values.currentPasswordFromStore,
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword
      }
    }

    const isDataValid = await requiredSchema.isValid(formData);

    if(isDataValid) {
      if (isLogged) {
        confirmPasswordChange(formData.newPassword);
        return;
      }

      confirmUserAuthentication(formData);
      performRegistrationRequest(formData);
    }
  }

  const performRegistrationRequest = async (formData) => {
    try {
      const response = await axios.post('http://localhost:4000/auth', {
        login: formData.login,
        password: formData.password
    })

    console.log(response);
    }
    catch (error) {
      console.error(error);
    }
  }

  if (!opened) return null;

  return ReactDOM.createPortal(
    <>
      <div className="content-overlay" />

      <Formik
        initialValues={
          isLogged ? {
            currentPasswordFromStore: password,
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
          } : {
            login: '',
            password: '',
            confirmPassword: ''
          }
        }
        validationSchema={type === "registration" ? registrationSchema :  type === "signIn" ? signInSchema : passwordChangeSchema}
        onSubmit={values => onSubmitHandler(values)}
        enableInitialize={true}
      >
        <Form className="modal">
          <div className="modal__head-block">
            <h2 className="modal__title">{title}</h2>
            <button className="modal__close-btn" type="button" onClick={onCloseClick}>
              <img src={closeImg} className="modal__close-btn--img"></img>
            </button>
          </div>

          {children}

          <div className="modal__bottom-block">
            <button className="submit-btn" type="submit">Submit</button>
          </div>
        </Form>
      </Formik>
    </>,
    document.getElementById('portal')
  )
}

export default Modal;
