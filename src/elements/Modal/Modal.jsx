import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import closeImg from "../../assets/img/close.png";
import { Formik, Form } from "formik";
import SubmitBtn from "../SubmitBtn/SubmitBtn";
import axios from "axios";
import registrationSchema from "../../validations/registrationValidation";
import signInSchema from "../../validations/signInValidation";
import passwordChangeSchema from "../../validations/passwordChangeValidation";
import "./styles.scss";

const Modal = ({ opened, type, children, onCloseClick, confirmUserAuthentication, confirmPasswordChange }) => {
  const isLogged = useSelector(state => state.user?.isLogged);
  const userPassword = useSelector(state => state.user?.password);

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

    if (type === "Password change") {
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
            currentPasswordFromStore: userPassword,
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
          } : {
            login: '',
            password: '',
            confirmPassword: ''
          }
        }
        validationSchema={type === "Registration" ? registrationSchema :  type === "Sign In" ? signInSchema : passwordChangeSchema}
        onSubmit={values => onSubmitHandler(values)}
        enableInitialize={true}
      >
        <Form className="modal">
          <div className="modal__head-block">
            <h2 className="modal__title">{type}</h2>
            <button className="modal__close-btn" type="button" onClick={onCloseClick}>
              <img src={closeImg} className="modal__close-btn--img"></img>
            </button>
          </div>

          {children}

          <div className="modal__bottom-block">
            <SubmitBtn>Submit</SubmitBtn>
          </div>
        </Form>
      </Formik>
    </>,
    document.getElementById('portal')
  )
}

export default Modal;
