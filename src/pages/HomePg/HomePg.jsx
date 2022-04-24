/* eslint-disable */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../elements/Modal/Modal";
import InputText from "../../elements/InputText/InputText";
import SearchBar from "../../components/SearchBar/SearchBar";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import GameCard from "../../components/GameCard/GameCard";
import categoriesArr from "../../components/categoriesArr";
import axios from "axios";
import { setCurrentGame } from "../../redux/actions";
import "./styles.scss";

const HomePg = () => {
  const [selectedGames, setSelectedGames] = useState([]);

  const [modalState, setModalState] = useState({
    isOpened: false,
    editGameClicked: false,
  });

  const dispatch = useDispatch();

  const currentGameImage = useSelector(
    (state) => state.user?.currentGame?.gameImage
  );
  const allGamesArr = useSelector((state) => state.games.allGamesArr);

  const getTopProductsInfo = () => {
    try {
      // const response = await axios.get('http://localhost:4000/getTopProducts');
      // const theBestRatings = response.data.map(item => item.metaRating).sort().reverse().slice(0, 3);
      // const gamesWithBestRatings = theBestRatings.map(number => response.data.find(item => item.metaRating === number));
      // const matchedBestRatedGames = gamesWithBestRatings.map(game => allGamesArr.find(psGame => psGame.name === game.name));

      const copyArr = [...allGamesArr];
      const gamesWithBestRatings = copyArr
        .sort((a, b) => b.metaRating - a.metaRating)
        .slice(0, 3);

      setSelectedGames(gamesWithBestRatings);
    } catch (err) {
      console.error(err);
    }
  };

  const callSearchValue = async (queryData) => {
    try {
      const response = await axios.get("http://localhost:4000/gamesArr");

      const { value } = queryData;

      return response.data.filter((item) =>
        item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
    } catch (err) {
      console.error(err);
    }
  };

  const openEditGameModalState = () => {
    setModalState({ isOpened: true, editGameClicked: true });
  };

  const onEditModalCloseClick = () => {
    setModalState({ isOpened: false, editGameClicked: false });

    dispatch(
      setCurrentGame({
        currentGame: null,
      })
    );
  };

  useEffect(() => {
    getTopProductsInfo();

    return null;
  }, [allGamesArr]);

  return (
    <>
      <div className="home">
        <div className="home__banner"></div>

        <div className="home__categories-container">
          {categoriesArr.map((item, id) => (
            <CategoryCard
              key={id}
              path={item.path}
              pathLight={item.pathLight}
              altName={item.altName}
              altNameLight={item.altNameLight}
              name={item.name}
              route={item.routePath}
            />
          ))}
        </div>

        <SearchBar
          message="Enter the game name here..."
          callSearchValue={callSearchValue}
        />

        <h2 className="home__title">- Highest rated games -</h2>
        <hr className="home__divider" />

        {selectedGames ? (
          <div className="home__games-container">
            {selectedGames.map((game) => (
              <GameCard
                key={game.id}
                gameDetails={game}
                openEditGameModalState={openEditGameModalState}
              />
            ))}
          </div>
        ) : (
          ""
        )}
      </div>

      {modalState.isOpened && (
        <Modal
          type={`${modalState.editGameClicked ? "editGame" : "addGame"}`}
          onCloseClick={onEditModalCloseClick}
        >
          <InputText
            fieldLabel="Name:"
            fieldName="name"
            fieldType="text"
            message="Enter game name here..."
          ></InputText>
          <InputText
            fieldLabel="Genre:"
            fieldName="genre"
            fieldType="text"
            message="Enter game genre here..."
          ></InputText>
          <InputText
            fieldLabel="Price:"
            fieldName="price"
            fieldType="number"
            message="Enter game price here..."
          ></InputText>
          <InputText
            fieldLabel="Company:"
            fieldName="company"
            fieldType="text"
            message="Enter company name here..."
          ></InputText>
          <InputText
            fieldLabel="Age:"
            fieldName="age"
            fieldType="number"
            message="Enter game age here..."
          ></InputText>
          <InputText
            fieldLabel="Rating (uut of 100 points):"
            fieldName="metaRating"
            fieldType="number"
            message="Enter game rating here..."
          ></InputText>
          <InputText
            fieldLabel="Image:"
            fieldName="image"
            fieldType="file"
            message="Select game image here..."
            prefix={currentGameImage}
          ></InputText>
        </Modal>
      )}
    </>
  );
};

export default HomePg;
