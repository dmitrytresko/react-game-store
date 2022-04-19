import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../elements/Modal/Modal";
import InputText from "../../elements/InputText/InputText";
import userIcon from "../../assets/img/user.jpg";
import editIcon from "../../assets/img/edit.jpg";
import confirmIcon from "../../assets/img/confirm.jpg";
import cancelIcon from "../../assets/img/cancel.jpg";
import additionalUserInfoSchema from "../../validations/additionalUserInfoValidation";
import {
  setNewPassword,
  setNewLogin,
  setAdditionalInfo,
} from "../../redux/actions";
import "./styles.scss";

const ProfilePg = () => {
  const userLogin = useSelector((state) => state.user?.userName);
  const userPassword = useSelector((state) => state.user?.password);
  const userEmail = useSelector((state) => state.user?.email);
  const userAddress = useSelector((state) => state.user?.address);
  const userPhone = useSelector((state) => state.user?.phone);
  const hashedPassword = userPassword.split("").map(() => "*");

  const [loginChangeClicked, setLoginChangeClicked] = useState(false);
  const [modalState, setModalState] = useState({
    isOpened: false,
    passwordChangeClicked: false,
  });

  const [loginInputState, setLoginInputState] = useState(userLogin);

  const loginInputRef = useRef();

  const history = useHistory();

  const dispatch = useDispatch();

  const onLoginChangeClickHandler = () => {
    setLoginChangeClicked(true);
  };

  useEffect(() => {
    loginInputRef?.current?.focus();
  }, [loginChangeClicked]);

  const handleLoginInputChange = (event) => {
    setLoginInputState(event.target.value);
  };

  const onConfirmLoginChangeHandler = () => {
    const isConfirmed = confirm(
      "Are you sure that you want to change your login?"
    );

    if (isConfirmed) {
      dispatch(
        setNewLogin({
          newLogin: loginInputState,
        })
      );
      setLoginChangeClicked(false);
    }
  };

  const onCancelLoginChangeHandler = () => {
    setLoginInputState(userLogin);
    setLoginChangeClicked(false);
  };

  const onPasswordChangeClickHandler = () => {
    setModalState({ isOpened: true, passwordChangeClicked: true });
  };

  const confirmPasswordChange = (password) => {
    const isConfirmed = confirm(
      "Are you sure that you want to change your password?"
    );

    if (isConfirmed) {
      dispatch(
        setNewPassword({
          newPassword: password,
        })
      );
      setModalState({ isOpened: false, passwordChangeClicked: false });
    }
  };

  const onSubmitHandler = (values) => {
    const isConfirmed = confirm(
      "Are you sure that you want to save this info about you?"
    );

    if (isConfirmed) {
      dispatch(
        setAdditionalInfo({
          email: values.email,
          address: values.address,
          phone: values.phone,
        })
      );
      history.push("/");
    }
  };

  return (
    <>
      <div className="profile flex-column">
        <div className="profile__personal-info-container flex-center">
          <img className="profile__user-img" src={userIcon} />

          <div className="profile__personal-info-container--inner flex-column">
            <div
              className="profile__personal-info-container--individual"
              style={loginChangeClicked ? { marginBottom: "8px" } : {}}
            >
              {loginChangeClicked ? (
                <>
                  <input
                    ref={loginInputRef}
                    className="profile__login-input"
                    value={loginInputState}
                    onChange={handleLoginInputChange}
                  />
                  <div className="profile-login-btn-container">
                    <button
                      className="profile__edit-login-btn"
                      onClick={onConfirmLoginChangeHandler}
                    >
                      <img src={confirmIcon} />
                    </button>
                    <button
                      className="profile__edit-login-btn"
                      onClick={onCancelLoginChangeHandler}
                    >
                      <img src={cancelIcon} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="profile__user-name">{userLogin}</h3>
                  <button
                    className="profile__edit-btn"
                    onClick={onLoginChangeClickHandler}
                  >
                    <img className="profile__edit-btn--img" src={editIcon} />
                  </button>
                </>
              )}
            </div>

            <div className="profile__personal-info-container--individual">
              <p className="profile__user-password">
                Password: {hashedPassword}
              </p>
              <button
                className="profile__edit-btn"
                onClick={onPasswordChangeClickHandler}
              >
                <img className="profile__edit-btn--img" src={editIcon} />
              </button>
            </div>
          </div>
        </div>

        <div className="profile__form-wrapper">
          <Formik
            initialValues={{
              email: userEmail || "",
              address: userAddress || "",
              phone: userPhone || "",
            }}
            validationSchema={additionalUserInfoSchema}
            onSubmit={(values) => onSubmitHandler(values)}
          >
            <Form className="profile__form flex-column">
              <h2 className="profile__form-title">Profile info</h2>
              <hr className="profile__form-divider" />

              <div className="profile__form-inputs flex-column">
                <InputText
                  fieldLabel="Email:"
                  fieldName="email"
                  fieldType="email"
                  message="Enter your email here..."
                  customStyles={{
                    margin: 0,
                    marginBottom: "15px",
                    width: "100%",
                  }}
                />
                <InputText
                  fieldLabel="Phone number:"
                  fieldName="phone"
                  fieldType="tel"
                  message="Enter your phone number here..."
                  customStyles={{
                    margin: 0,
                    marginBottom: "15px",
                    width: "100%",
                  }}
                />
                <InputText
                  fieldLabel="Delivery address:"
                  fieldName="address"
                  fieldType="text"
                  message="Enter your delivery address here..."
                  customStyles={{
                    margin: 0,
                    marginBottom: "15px",
                    width: "100%",
                  }}
                />
              </div>

              <button
                className="btn submit-btn"
                style={{ width: "100%" }}
                type="submit"
              >
                Save info
              </button>
            </Form>
          </Formik>
        </div>
      </div>

      {modalState.isOpened && (
        <Modal
          type="passwordChange"
          confirmPasswordChange={confirmPasswordChange}
          onCloseClick={() =>
            setModalState({ isOpened: false, passwordChangeClicked: false })
          }
        >
          {modalState.passwordChangeClicked && (
            <>
              <InputText
                fieldLabel=""
                fieldName="currentPasswordFromStore"
                fieldType="password"
                message=""
                customStyles={{ display: "none" }}
              />
              <InputText
                fieldLabel="Current password:"
                fieldName="currentPassword"
                fieldType="password"
                message="Enter your current password here..."
              />
              <InputText
                fieldLabel="New password:"
                fieldName="newPassword"
                fieldType="password"
                message="Enter your new password here..."
              />
              <InputText
                fieldLabel="Confirm new password:"
                fieldName="confirmNewPassword"
                fieldType="password"
                message="Repeat your new password here..."
              />
            </>
          )}
        </Modal>
      )}
    </>
  );
};

export default ProfilePg;
