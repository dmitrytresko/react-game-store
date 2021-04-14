// import { useEffect } from "react";
import { Formik, Form } from "formik";
import { useSelector } from "react-redux";
import userIcon from "../../assets/img/user.png";
import InputText from "../../elements/InputText/InputText";
import "./styles.scss";

const ProfilePg = () => {
  const userLogin = useSelector(state => state.user?.userName);
  const userPassword = useSelector(state => state.user?.password);

  // useEffect(() => {
  //   userPassword.forEach(item => item = "*");

  //   return userPassword;
  // }, [userPassword])

  return (
      <div className="profile">
        <div className="profile__personal-info-container">
          <img className="profile__user-img" src={userIcon} />

          <div className="profile__personal-info-container--inner">
            <h3 className="profile__user-name">{userLogin}</h3>
            <p className="profile__user-password">Password: {userPassword}</p>
          </div>
        </div>

        <Formik initialValues={{
            address: '',
            phone: ''
          }}
          >
            <Form className="profile__form">
              <InputText fieldLabel="Delivery address:" fieldName="address" message="Enter your delivery address here..."></InputText>
              <InputText fieldLabel="Phone number:" fieldName="phone" message="Enter your phone number here..."></InputText>
            </Form>
          </Formik>
      </div>
  )
}

export default ProfilePg;
