import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_CART_DATA } from "../../redux/actions";
import Modal from "../../elements/Modal/Modal";
import InputText from "../../elements/InputText/InputText";
import "./styles.scss";

const GameCard = ({ gameDetails }) => {
  const dispatch = useDispatch();

  const [modalState, setModalState] = useState({ isOpened: false, editGameClicked: false });

  const isUserLoggedIn = useSelector(state => state.user?.isLogged);
  const isUserAdmin = useSelector(state => state.user?.isAdmin);
  const userCartCount = useSelector(state => state.user?.cartCount);
  const userSelectedItems = useSelector(state => state.user?.selectedItems);

  const addItemToCartHandler = () => {
    if (isUserLoggedIn) {
      dispatch({
        type: SET_CART_DATA,
        payload: {
          newCartCount: userCartCount + 1,
          selectedItems: [
            ...userSelectedItems,
            {
              gameId: gameDetails.id,
              gameName: gameDetails.name,
              gamePrice: gameDetails.price,
              gameCompany: gameDetails.company,
            }
          ]
        }
      });
    }
  }

  const editItemHandler = () => {
    setModalState({ isOpened: true, editGameClicked: true });
  }

  return (
    <>
      <div className="game-card">
        <div className="game-card__cover-wrapper">
          <img className="game-card__cover" src={gameDetails.path} alt={gameDetails.name} />
          {isUserLoggedIn &&
            <>
              <button className="game-card__add-btn" onClick={() => addItemToCartHandler(gameDetails)}>Add To Cart</button>
              {isUserAdmin && <button className="game-card__edit-btn" onClick={editItemHandler}>Edit Game</button>}
            </>
          }
        </div>
        <div className="game-card__details-container">
          <div className="game-card__info">
            <h3 className="game-card__title">{gameDetails.name}</h3>
            <img className="game-card__rating" src={gameDetails.rating} alt="Star rating" />
          </div>
          <div className="game-card__info">
            <p className="game-card__company">{gameDetails.company}</p>
            <p className="game-card__price">${gameDetails.price}</p>
          </div>
        </div>
      </div>

      <Modal opened={modalState.isOpened}
            type={`${modalState.editGameClicked ? "editGame" : "addGame"}`}
            onCloseClick={() => setModalState({ isOpened: false, editGameClicked: false })}>
              <InputText fieldLabel="Name:" fieldName="name" message="Enter game name here..."></InputText>
              <InputText fieldLabel="Genre:" fieldName="genre" message="Enter game genre here..."></InputText>
              <InputText fieldLabel="Price:" fieldName="price" message="Enter game price here..."></InputText>
              <InputText fieldLabel="Company:" fieldName="company" message="Enter company name here..."></InputText>
              <InputText fieldLabel="Age:" fieldName="age" message="Enter game age here..."></InputText>
      </Modal>
    </>
  )
}

export default GameCard;
