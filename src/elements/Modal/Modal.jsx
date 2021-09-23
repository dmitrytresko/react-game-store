/* eslint-disable */
import { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from "react-redux";
import closeImg from "../../assets/img/close.png";
import { Formik, Form } from "formik";
import axios from "axios";
import registrationSchema from "../../validations/registrationValidation";
import signInSchema from "../../validations/signInValidation";
import passwordChangeSchema from "../../validations/passwordChangeValidation";
import editGameSchema from "../../validations/editGameValidation";
import "./styles.scss";

const Modal = ({ type, children, onCloseClick, confirmUserAuthentication, confirmPasswordChange }) => {
  const userState = useSelector(state => state.user);
  const { isLogged, password, currentGame } = userState;

  const title = useMemo(() => {
    switch (type) {
      case "registration": return "Registration";
      case "signIn": return "Sign In";
      case "passwordChange": return "Password change";
      case "editGame": return "Edit game";
      default: return "";
    }
  }, [type]);

  const defineInitialValues = () => {
    switch (type) {
      case "registration":
      case "signIn": return {
        login: '',
        password: '',
        confirmPassword: ''
      }
      case "passwordChange": return {
        currentPasswordFromStore: password,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      };
      case "editGame": return {
        name: currentGame.gameName,
        genre: currentGame.gameGenre,
        price: currentGame.gamePrice,
        company: currentGame.gameCompany,
        age: currentGame.gameAge,
        image: ''
      };
      default: return;
    }
  }

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
    document.body.style.overflow = "hidden";

    return () => document.body.style.overflow = "visible";
  })

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

    if (type === "editGame") {
      requiredSchema = editGameSchema;

      formData = {
        name: values.gameName,
        genre: values.gameGenre,
        price: values.gamePrice,
        company: values.gameCompany,
        age: values.gameAge,
        image: values.gameImage
      }
    }

    const isDataValid = await requiredSchema.isValid(formData);

    if (isDataValid) {
      if (isLogged) {
        switch (type) {
          case "passwordChange": confirmPasswordChange(formData.newPassword);
          case "editGame": confirmGameModification(formData);
        }

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

  return ReactDOM.createPortal(
    <>
      <div className="content-overlay" />

      <Formik
        initialValues={defineInitialValues()}
        validationSchema={defineValidationShema}
        onSubmit={values => onSubmitHandler(values)}
        enablenInitialize={true}
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
