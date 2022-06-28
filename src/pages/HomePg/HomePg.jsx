/* eslint-disable */
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../elements/Modal/Modal";
import InputText from "../../elements/InputText/InputText";
import SearchBar from "../../components/SearchBar/SearchBar";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import GameCard from "../../components/GameCard/GameCard";
import categories from "../../common/categories";
import { sales } from "../../common/sales";
import axios from "axios";
import { setCurrentGame } from "../../redux/actions";
import timerIcon from "../../assets/img/timer.jpg";
import discountIcon from "../../assets/img/discount.jpg";
import { toast } from "react-toastify";
import "./styles.scss";

const HomePg = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const currentSale = sales[0];

  const [selectedGames, setSelectedGames] = useState([]);
  const [modalState, setModalState] = useState({
    isOpened: false,
    editGameClicked: false,
  });

  const allGames = useSelector((state) => state.games.allGames);
  const currentGameImage = useSelector(
    (state) => state.user?.currentGame?.gameImage
  );

  const getTopProductsInfo = () => {
    try {
      // const response = await axios.get('http://localhost:4000/getTopProducts');
      // const theBestRatings = response.data.map(item => item.metaRating).sort().reverse().slice(0, 3);
      // const gamesWithBestRatings = theBestRatings.map(number => response.data.find(item => item.metaRating === number));
      // const matchedBestRatedGames = gamesWithBestRatings.map(game => allGames.find(psGame => psGame.name === game.name));

      const copyArr = [...allGames];
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
      const response = await axios.get("http://localhost:4000/games");

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
  }, [allGames]);

  useEffect(() => {
    return () => toast.dismiss();
  }, []);

  return (
    <>
      <div className="home">
        <div className="home__sales center-y">
          <div className="home__sales__deal-exp-container">
            <img className="home__sales--img" src={timerIcon} />
            <p className="home__sales--text">Deal ends soon!</p>
          </div>
          <div className="home__sales__promo-container">
            <span className="home__sales--promo sale-name">
              {currentSale.name}
            </span>
            <div className="home__sales--promo discount">
              {currentSale.discount}% off{" "}
              <img src={discountIcon} className="discount-img"></img>
            </div>
            <div className="home__sales--promo">
              Use code:
              <span className="promo"> {currentSale.promo}</span>
            </div>
          </div>
        </div>

        {/* <div className="home__search-header flex-center">
          <SearchBar
            message="Enter the game name here"
            callSearchValue={callSearchValue}
          />
        </div> */}

        <div className="home__banner flex-column flex-center">
          <h2 className="home__banner__title">Find your favorite games</h2>
          <p className="home__banner__text">
            We provide our customers with a full list of best and most popular
            games in wide variety of genres for each modern console.<br></br>
            Join our community to explore a wonderful world of gaming together!
          </p>

          <button
            className="btn home__banner__btn"
            onClick={() => history.push("/products")}
          >
            See All Products
          </button>
          <p className="home__banner__text" style={{ marginBottom: "12px" }}>
            or
          </p>
          <div className="home__categories-container">
            {categories.map((item, id) => (
              <CategoryCard
                key={id}
                path={item.path}
                pathLight={item.pathLight}
                altName={item.altName}
                altNameLight={item.altNameLight}
                name={item.name}
                route={item.routePath}
                style={{ height: "calc(100% - 5px)" }}
              />
            ))}
          </div>
        </div>

        <div className="home__games-wrapper">
          <h2 className="section-title" style={{ textAlign: "center" }}>
            Highest rated games
          </h2>
          <hr className="divider" />

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
