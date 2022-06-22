/* eslint-disable */
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import crossImg from "../../assets/img/cross.jpg";
import fiveStars from "../../assets/img/card-items/five-stars.jpg";
import fourStars from "../../assets/img/card-items/four-stars.jpg";
import threeStars from "../../assets/img/card-items/three-stars.jpg";
import twoStars from "../../assets/img/card-items/two-stars.jpg";
import oneStar from "../../assets/img/card-items/one-star.jpg";
import warningIcon from "../../assets/img/warning.png";
import { Formik, Form } from "formik";
import axios from "axios";
import registrationSchema from "../../validations/registrationValidation";
import signInSchema from "../../validations/signInValidation";
import passwordChangeSchema from "../../validations/passwordChangeValidation";
import editGameSchema from "../../validations/editGameValidation";
import { setGamesData } from "../../redux/actions";
import "./styles.scss";

const Modal = ({
  type,
  children,
  onCloseClick,
  confirmUserAuthentication,
  confirmPasswordChange,
  modalClass,
}) => {
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);
  const { isLogged, password, currentGame } = userState;
  const allGames = useSelector((state) => state.games.allGames);

  const [openConfirmDialog, setOpenConfirmDialog] = useState({
    confirmDeleteGame: false,
    confirmEditGame: false,
    confirmPasswordChange: false,
  });
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [editFormData, setEditFormData] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  const defineInitialValues = () => {
    switch (type) {
      case "registration":
      case "signIn":
        return {
          login: "",
          password: "",
          confirmPassword: "",
        };
      case "passwordChange":
        return {
          currentPasswordFromStore: password,
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        };
      case "editGame":
        return {
          name: currentGame.gameName,
          genre: currentGame.gameGenre,
          price: currentGame.gamePrice,
          company: currentGame.gameCompany,
          age: currentGame.gameAge,
          metaRating: currentGame.gameRating,
          image: "",
        };
      default:
        return;
    }
  };

  const defineValidationSchema = () => {
    switch (type) {
      case "registration":
        return registrationSchema;
      case "signIn":
        return signInSchema;
      case "passwordChange":
        return passwordChangeSchema;
      case "editGame":
        return editGameSchema;
      default:
        return;
    }
  };

  const defineModalTitle = () => {
    switch (type) {
      case "registration":
        return "Sign Up";
      case "signIn":
        return "Sign In";
      case "passwordChange":
        return "Change Password";
      case "editGame":
        return "Edit Game";
      default:
        return;
    }
  };

  const closeConfirmDialog = () => {
    setOpenConfirmDialog({
      confirmDeleteGame: false,
      confirmEditGame: false,
      confirmPasswordChange: false,
    });
  };

  const deleteGameHandler = () => {
    const newGamesArr = allGames.filter(
      (game) => game.id !== currentGame.gameId
    );

    dispatch(
      setGamesData({
        gamesArr: newGamesArr,
      })
    );

    closeConfirmDialog();
    onCloseClick();

    alert("The game is successfully deleted");
  };

  const confirmGameModification = (formData) => {
    const newGamesArr = [...allGames];

    const gameToEditIdx = newGamesArr.findIndex(
      (item) => item.id === currentGame.gameId
    );

    if (gameToEditIdx !== -1) {
      newGamesArr[gameToEditIdx] = {
        id: currentGame.gameId,
        name: formData.name,
        company: formData.company,
        path: formData.image,
        rating:
          formData.metaRating >= 85
            ? fiveStars
            : formData.metaRating >= 75
            ? fourStars
            : formData.metaRating >= 60
            ? threeStars
            : formData.metaRating >= 40
            ? twoStars
            : oneStar,
        price: formData.price,
        age: formData.age,
        genre: formData.genre,
        metaRating: formData.metaRating,
      };

      dispatch(
        setGamesData({
          gamesArr: newGamesArr,
        })
      );

      closeConfirmDialog();
      onCloseClick();

      alert("The game is successfully edited");
    }
  };

  const doesUserExist = (formData) => {
    const existingUser = users?.find(
      (item) =>
        item.login === formData.login && item.password === formData.password
    );

    return existingUser ? true : false;
  };

  const isLoginAvailable = (formData) => {
    const existingLogin = users
      ?.map((item) => ({ login: item.login }))
      .find((item) => item.login === formData.login);

    return existingLogin ? false : true;
  };

  const registerUser = async (formData) => {
    try {
      await axios.post("http://localhost:4000/auth", {
        login: formData.login,
        password: formData.password,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitHandler = async (values) => {
    let formData;
    let requiredSchema;

    if (type === "registration") {
      requiredSchema = registrationSchema;

      formData = {
        login: values.login,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };
    }

    if (type === "signIn") {
      requiredSchema = signInSchema;

      formData = {
        login: values.login,
        password: values.password,
      };
    }

    if (type === "passwordChange") {
      requiredSchema = passwordChangeSchema;

      formData = {
        currentPasswordFromStore: values.currentPasswordFromStore,
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword,
      };

      setNewPassword(formData.newPassword);
    }

    if (type === "editGame") {
      requiredSchema = editGameSchema;

      formData = {
        name: values.name,
        genre: values.genre,
        price: values.price,
        company: values.company,
        age: values.age,
        metaRating: values.metaRating,
        image: values.image,
      };

      setEditFormData({ ...formData });
    }

    const isDataValid = await requiredSchema.isValid(formData);

    if (isDataValid) {
      if (isLogged) {
        switch (type) {
          case "passwordChange":
            setOpenConfirmDialog({
              confirmDeleteGame: false,
              confirmEditGame: false,
              confirmPasswordChange: true,
            });
            break;
          case "editGame":
            setOpenConfirmDialog({
              confirmDeleteGame: false,
              confirmEditGame: true,
              confirmPasswordChange: false,
            });
            break;
          default:
            return;
        }

        return;
      }

      if (type === "signIn") {
        doesUserExist(formData)
          ? confirmUserAuthentication({
              ...formData,
              cartCount: 0,
              selectedItems: [],
            })
          : setErrorMessage(
              "There is no account with such credentials. Try again"
            );
      }

      if (type === "registration") {
        if (isLoginAvailable(formData)) {
          registerUser(formData);
          confirmUserAuthentication({
            ...formData,
            cartCount: 0,
            selectedItems: [],
          });

          return;
        }

        setErrorMessage(
          "This login is already taken by someone else. Try another one"
        );
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => (document.body.style.overflow = "overlay");
  });

  useEffect(async () => {
    const response = await axios.get("http://localhost:4000/auth");

    setUsers(response.data);
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className="content-overlay" />

      <Formik
        initialValues={defineInitialValues()}
        validationSchema={defineValidationSchema}
        onSubmit={(values) => onSubmitHandler(values)}
        enablenInitialize={true}
      >
        <Form
          className={`modal ${modalClass}`}
          style={{
            opacity:
              openConfirmDialog.confirmDeleteGame ||
              openConfirmDialog.confirmEditGame ||
              openConfirmDialog.confirmPasswordChange
                ? 0
                : 1,
          }}
        >
          <button
            className="modal__close-btn"
            type="button"
            onClick={onCloseClick}
          >
            <img src={crossImg} className="modal__close-btn--img"></img>
          </button>

          <p className="modal__title">{defineModalTitle()}</p>
          <div className="modal__children-block">{children}</div>

          {errorMessage && (
            <div className="modal__error">
              <img className="modal__error--icon" src={warningIcon} />
              {errorMessage}
            </div>
          )}

          <div className="modal__footer flex-center">
            {type === "editGame" && (
              <>
                <button
                  className="btn delete-btn"
                  type="button"
                  onClick={() => {
                    setOpenConfirmDialog({
                      confirmDeleteGame: true,
                      confirmEditGame: false,
                      confirmPasswordChange: false,
                    });
                  }}
                >
                  Delete Game
                </button>
                {openConfirmDialog.confirmDeleteGame && (
                  <ConfirmDialog
                    title="Confirm Delete Game"
                    warnLayout
                    secondStep
                    confirmHandler={deleteGameHandler}
                    onCloseClick={closeConfirmDialog}
                  >
                    {
                      <p>
                        Are you sure that you want to delete this game? Please
                        note that selected item will be permanently removed from
                        database.
                      </p>
                    }
                  </ConfirmDialog>
                )}
              </>
            )}
            <button className="btn submit-btn" type="submit">
              Submit
            </button>
            {openConfirmDialog.confirmEditGame && (
              <ConfirmDialog
                title="Confirm Edit Game"
                secondStep
                confirmHandler={() => confirmGameModification(editFormData)}
                onCloseClick={closeConfirmDialog}
              >
                {
                  <p>
                    Are you sure that you want to edit this game? Please note
                    that information of selected game will be changed after
                    submitting.
                  </p>
                }
              </ConfirmDialog>
            )}
            {openConfirmDialog.confirmPasswordChange && (
              <ConfirmDialog
                title="Confirm Password Change"
                secondStep
                confirmHandler={() => confirmPasswordChange(newPassword)}
                onCloseClick={closeConfirmDialog}
              >
                {
                  <p>
                    Are you sure that you want to change your password? Please
                    note that it will be permanently replaced with the new one
                    after confirming this action.
                  </p>
                }
              </ConfirmDialog>
            )}
          </div>
        </Form>
      </Formik>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
