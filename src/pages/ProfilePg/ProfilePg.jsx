import { useState, useRef, useEffect } from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import userIcon from "../../assets/img/user.png";
import Modal from "../../elements/Modal/Modal";
import InputText from "../../elements/InputText/InputText";
import editIcon from "../../assets/img/edit.png";
import confirmIcon from "../../assets/img/checked.png";
import cancelIcon from "../../assets/img/cancel.png";
import { SET_NEW_PASSWORD } from "../../redux/actions";
import { SET_NEW_LOGIN } from "../../redux/actions";
import "./styles.scss";

const ProfilePg = () => {
  const userLogin = useSelector(state => state.user?.userName);
  const userPassword = useSelector(state => state.user?.password);
  const hashedPassword = userPassword.split('').map(() => "*");

  const [loginChangeClicked, setLoginChangeClicked] = useState(false);
  const [loginInputState, setLoginInputState] = useState(userLogin);
  const [modalState, setModalState] = useState({ isOpened: false, passwordChangeClicked: false });

  const dispatch = useDispatch();

  const onLoginChangeClickHandler = () => {
    setLoginChangeClicked(true);
  }

  useEffect(() => {
    myRef?.current?.focus();
  },[loginChangeClicked])

  const handleLoginInputChange = event => {
    setLoginInputState(event.target.value);
  }

  const onConfirmLoginChangeHandler = () => {
    const isComfirmed = confirm('Are you sure that you want to change your login?');

    if (isComfirmed) {
      dispatch({type: SET_NEW_LOGIN, payload: {newLogin: loginInputState}});
      setLoginChangeClicked(false);
    }
  }

  const onCancelLoginChangeHandler = () => {
    setLoginInputState(userLogin);
    setLoginChangeClicked(false);
  }

  const onPasswordChangeClickHandler = () => {
    setModalState({ isOpened: true, passwordChangeClicked: true });
  }

  const confirmPasswordChange = (password) => {
    dispatch({type: SET_NEW_PASSWORD, payload: {newPassword: password}});
    setModalState({ isOpened: false, passwordChangeClicked: false });
  }

  const myRef = useRef();

  return (
    <>
      <div className="profile">
        <div className="profile__personal-info-container">
          <img className="profile__user-img" src={userIcon} />

          <div className="profile__personal-info-container--inner">
            <div className="profile__personal-info-container--individual">
              {loginChangeClicked ? (
                <>
                  <input ref={myRef} className="profile__login-input" value={loginInputState} onChange={handleLoginInputChange} />
                  <button className="profile__edit-login-btn" onClick={onConfirmLoginChangeHandler}>
                    <img src={confirmIcon} />
                  </button>
                  <button className="profile__edit-login-btn" onClick={onCancelLoginChangeHandler}>
                    <img src={cancelIcon} />
                  </button>
                </>
              ) : (
                <>
                  <h3 className="profile__user-name">{userLogin}</h3>
                  <button className="profile__edit-btn" onClick={onLoginChangeClickHandler}>
                    <img className="profile__edit-btn--img" src={editIcon} />
                  </button>
                </>
              )}
            </div>

            <div className="profile__personal-info-container--individual">
              <p className="profile__user-password">Password: {hashedPassword}</p>
              <button className="profile__edit-btn" onClick={onPasswordChangeClickHandler}>
                <img className="profile__edit-btn--img" src={editIcon} />
              </button>
            </div>
          </div>
        </div>

        <Formik initialValues={{
            address: '',
            phone: ''
          }}
          >
            <Form className="profile__form">
              <h2 className="profile__form-title">Profile info</h2>
              <hr className="profile__form-divider"/>

              <InputText fieldLabel="Delivery address:" fieldName="address" message="Enter your delivery address here..."></InputText>
              <InputText fieldLabel="Phone number:" fieldName="phone" message="Enter your phone number here..."></InputText>
            </Form>
          </Formik>

          <button className="profile__btn-info">Change info</button>
      </div>

      <Modal
        opened={modalState.isOpened}
        type="Password change"
        confirmPasswordChange={confirmPasswordChange}
        onCloseClick={() => setModalState({ isOpened: false, passwordChangeClicked: false })}>
          {modalState.passwordChangeClicked && (
            <>
              <InputText fieldLabel="" fieldName="currentPasswordFromStore" message="" customStyles={{display: "none"}} />
              <InputText fieldLabel="Current password:" fieldName="currentPassword" message="Enter your current password here..." />
              <InputText fieldLabel="New password:" fieldName="newPassword" message="Enter your new password here..." />
              <InputText fieldLabel="Confirm new password:" fieldName="confirmNewPassword" message="Repeat your new password here..." />
            </>
          )}
      </Modal>
    </>
  )
}

export default ProfilePg;
