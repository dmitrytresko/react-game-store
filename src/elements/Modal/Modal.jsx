import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import closeImg from "../../assets/img/close.png";
import { Formik, Form } from "formik";
import axios from "axios";
import registrationSchema from "../../validations/registrationValidation";
import signInSchema from "../../validations/signInValidation";
import passwordChangeSchema from "../../validations/passwordChangeValidation";
import editGameSchema from "../../validations/editGameValidation";
import "./styles.scss";

const Modal = ({ opened, type, children, onCloseClick, confirmUserAuthentication, confirmPasswordChange }) => {
  const userState = useSelector(state => state.user);
  const { isLogged, password } = userState;

  const [title, setTitle] = useState('');

  const defineValidationShema = () => {
    switch (type) {
      case "registration": return registrationSchema;
      case "signIn": return signInSchema;
      case "passwordChange": return passwordChangeSchema;
      case "editGame": return editGameSchema;
      default: return;
    }
  }

  const deleteGameHandler = () => {
    const isComfirmed = confirm('Are you sure that you want to delete this game?');

    if (isComfirmed) {
      // dispatch({ type: SET_NEW_LOGIN, payload: {newLogin: loginInputState} });
      // setLoginChangeClicked(false);

      console.log('Game is deleted');
    }
  }

  useEffect(() => {
    switch (type) {
      case "registration": return setTitle("Registration");
      case "signIn": return setTitle("Sign In");
      case "passwordChange": return setTitle("Password change");
      case "editGame": return setTitle("Edit game");
      default: return;
    }
  }, [type])

  useEffect(() => {
    opened ? document.body.style.overflow = "hidden" : document.body.style.overflow = "visible";
  }, [opened])

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

    if (isDataValid) {
      if (isLogged) {
        confirmPasswordChange(formData.newPassword);
        return;
      }

      confirmUserAuthentication({
        ...formData,
        cartCount: 0,
        selectedItems: []
      });
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
        validationSchema={defineValidationShema}
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

          <div className="modal__children-block">
            {children}
          </div>

          <div className="modal__bottom-block">
            {type==="editGame" && <button className="btn delete-btn" type="submit" onClick={deleteGameHandler}>Delete Game</button>}
            <button className="btn submit-btn" type="submit">Submit</button>
          </div>
        </Form>
      </Formik>
    </>,
    document.getElementById('portal')
  )
}

export default Modal;
