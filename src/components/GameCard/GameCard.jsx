import { useState, useMemo } from "react";
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
              gameImage: gameDetails.path
            }
          ]
        }
      });
    }
  }

  const editItemHandler = () => {
    console.log(gameDetails);

    setModalState({ isOpened: true, editGameClicked: true });
  }

  const truncateGameName = (name = '', maxLength = 35) => {
    return name.length > maxLength ? `${name.substring(0, maxLength)}…` : name;
  }

  const truncatedName = useMemo(() => truncateGameName(gameDetails.name, 34), [gameDetails.name]);

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
            <h3 className="game-card__title">{truncatedName}</h3>
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
              <InputText fieldLabel="Name:" fieldName="name" fieldType="text" message="Enter game name here..."></InputText>
              <InputText fieldLabel="Genre:" fieldName="genre" fieldType="text" message="Enter game genre here..."></InputText>
              <InputText fieldLabel="Price:" fieldName="price" fieldType="number" message="Enter game price here..."></InputText>
              <InputText fieldLabel="Company:" fieldName="company" fieldType="text" message="Enter company name here..."></InputText>
              <InputText fieldLabel="Age:" fieldName="age" fieldType="number" message="Enter game age here..."></InputText>
              <InputText fieldLabel="Image:" fieldName="image" fieldType="file" message="Select game image here..."></InputText>
      </Modal>
    </>
  )
}

export default GameCard;
