import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../elements/Modal/Modal";
import InputText from "../../elements/InputText/InputText";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
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
import { toast } from "react-toastify";
import "./styles.scss";

const ProfilePg = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loginInputRef = useRef();

  const userState = useSelector((state) => state.user);
  const userLogin = useSelector((state) => state.user?.login);
  const userPassword = useSelector((state) => state.user?.password);
  const userEmail = useSelector((state) => state.user?.email);
  const userAddress = useSelector((state) => state.user?.address);
  const userPhone = useSelector((state) => state.user?.phone);
  const hashedPassword = userPassword.split?.("").map(() => "*");

  const [currentUserId, setCurrentUserId] = useState(null);
  const [loginInputState, setLoginInputState] = useState(userLogin);
  const [loginChangeClicked, setLoginChangeClicked] = useState(false);
  const [modalState, setModalState] = useState({
    isOpened: false,
    passwordChangeClicked: false,
  });
  const [openConfirmDialog, setOpenConfirmDialog] = useState({
    confirmLoginChange: false,
  });

  const onLoginChangeClickHandler = () => {
    setLoginChangeClicked(true);
  };

  const handleLoginInputChange = (event) => {
    setLoginInputState(event.target.value);
  };

  const onModalCloseClick = () => {
    setModalState({ isOpened: false, passwordChangeClicked: false });
  };

  const confirmLoginChangeHandler = async () => {
    dispatch(
      setNewLogin({
        newLogin: loginInputState,
      })
    );

    await axios.put(`http://localhost:4000/auth/${currentUserId}`, {
      login: loginInputState,
      password: userPassword,
    });
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...userState,
        login: loginInputState,
      })
    );

    setLoginChangeClicked(false);
    closeConfirmDialog();

    toast.success("Your login was successfully updated");
  };

  const onCancelLoginChangeHandler = () => {
    setLoginInputState(userLogin);
    setLoginChangeClicked(false);
  };

  const onPasswordChangeClickHandler = () => {
    setModalState({ isOpened: true, passwordChangeClicked: true });
  };

  const confirmPasswordChange = (password) => {
    dispatch(
      setNewPassword({
        newPassword: password,
      })
    );

    onModalCloseClick();

    toast.success("Your password was successfully updated");
  };

  const closeConfirmDialog = () => {
    setOpenConfirmDialog({
      confirmLoginChange: false,
    });
  };

  const onSubmitHandler = (values) => {
    dispatch(
      setAdditionalInfo({
        email: values.email,
        address: values.address,
        phone: values.phone,
      })
    );

    history.push("/");
  };

  useEffect(() => {
    loginInputRef?.current?.focus();
  }, [loginChangeClicked]);

  useEffect(async () => {
    const response = await axios.get("http://localhost:4000/auth");
    const usersList = response.data;

    setCurrentUserId(
      usersList?.find?.((item) => item.login === userLogin)?.id ?? null
    );
  }, []);

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
                      onClick={() =>
                        setOpenConfirmDialog({
                          confirmLoginChange: true,
                        })
                      }
                    >
                      <img src={confirmIcon} />
                    </button>
                    {openConfirmDialog.confirmLoginChange && (
                      <ConfirmDialog
                        title="Confirm Login Change"
                        confirmHandler={confirmLoginChangeHandler}
                        onCloseClick={closeConfirmDialog}
                      >
                        {
                          <p>
                            Are you sure that you want to change your login?
                            Please note that your login will be permanently
                            altered after confirming if it is not taken already.
                          </p>
                        }
                      </ConfirmDialog>
                    )}

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
              <h2 className="section-title">Profile info</h2>
              <hr className="divider" />

              <div className="profile__form-inputs flex-column">
                <InputText
                  fieldLabel="Email:"
                  fieldName="email"
                  fieldType="email"
                  message="Enter your email here..."
                  customStyles={{
                    width: "100%",
                  }}
                />
                <InputText
                  fieldLabel="Phone number:"
                  fieldName="phone"
                  fieldType="tel"
                  message="Enter your phone number here..."
                  customStyles={{
                    width: "100%",
                  }}
                />
                <InputText
                  fieldLabel="Delivery address:"
                  fieldName="address"
                  fieldType="text"
                  message="Enter your delivery address here..."
                  customStyles={{
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
          onCloseClick={onModalCloseClick}
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
