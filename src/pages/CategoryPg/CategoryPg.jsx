/* eslint-disable */
import { useState, useEffect, useReducer, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Modal from "../../elements/Modal/Modal";
import InputText from "../../elements/InputText/InputText";
import GameCard from "../../components/GameCard/GameCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import playStationLogo from "../../assets/img/playstation.jpg";
import xboxLogo from "../../assets/img/xbox.jpg";
import windowsLogo from "../../assets/img/windows.jpg";
import { callSearchValueWithPsCategory, callSearchValueWithXboxCategory, callSearchValueWithPcCategory, callSearchValue } from "../../api";
import { SET_CURRENT_GAME } from "../../redux/actions";
import "./styles.scss";

const initialState = {
  outputArr: [],
  genresArr: [],
  selectedSortType: 'Default',
  isGenreRadioChecked: null,
  isAgeRadioChecked: '0'
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'setFields': {
      return {
        ...state,
        ...payload
      }
    };
    case 'resetSortAndFilters': {
      return {
        ...state,
        selectedSortType: 'Default',
        isGenreRadioChecked: null,
        isAgeRadioChecked: '0'
      }
    };
    case 'resetGenreFilter': {
      return {
        ...state,
        isGenreRadioChecked: null
      }
    };
    case 'resetAgeFilter': {
      return {
        ...state,
        isAgeRadioChecked: '0'
      }
    };
    case 'resetSortType': {
      return {
        ...state,
        selectedSortType: 'Default'
      }
    };
    default: return state;
  }
}

const CategoryPg = () => {
  const { categoryId } = useParams();

  const [state, dispatch] = useReducer(reducer, initialState);
  const { outputArr, genresArr, selectedSortType, isGenreRadioChecked, isAgeRadioChecked } = state;

  const [modalState, setModalState] = useState({ isOpened: false, editGameClicked: false });

  const dispatchFunc = useDispatch();
  const currentGameImage = useSelector(state => state.user?.currentGame?.gameImage);

  const criteriaSelectRef = useRef();
  const genreRadioInput = useRef();
  const ageRadioInput = useRef();

  const agesArr = ['0', '16', '18'];

  const allGamesArr = useSelector(state => state.games.allGamesArr);
  const psGamesArr = useMemo(() => allGamesArr.filter(game => game.id >= 100 && game.id < 200), [allGamesArr]);
  const xboxGamesArr = useMemo(() => allGamesArr.filter(game => game.id >= 200 && game.id < 300), [allGamesArr]);
  const pcGamesArr = useMemo(() => allGamesArr.filter(game => game.id >= 300 && game.id < 400), [allGamesArr]);

  const selectGamesArr = () => {
    switch (categoryId) {
      case "ps": return [...psGamesArr];
      case "xbox": return [...xboxGamesArr];
      case "pc": return [...pcGamesArr];
      default: return allGamesArr;
    }
  }

  const generateGenres = () => {
    const allGenres = selectGamesArr().map(game => game.genre);

    const arrWithUniqueGenres = [...new Set(allGenres)].sort();

    return arrWithUniqueGenres;
  }

  const callSearch = ({ category, value }) => {
    switch (category) {
      case "ps": return callSearchValueWithPsCategory(value);
      case "xbox": return callSearchValueWithXboxCategory(value);
      case "pc": return callSearchValueWithPcCategory(value);
      default: return callSearchValue(value);
    }
  }

  const onSortSelectChange = event => {
    dispatch({
      type: 'setFields',
      payload: {
        selectedSortType: event.target.value
      }
    });
  }

  const showSelectedGames = () => {
    switch (selectedSortType) {
      case 'price': return outputArr.sort((a, b) => b.price - a.price);
      case 'rating': return outputArr.sort((a, b) => b.metaRating - a.metaRating);
      default : return outputArr;
    }
  }

  const onGenreRadioChange = async (genre) => {
    if (genre !== isGenreRadioChecked) {

      dispatch({
        type: 'setFields',
        payload: {
          isGenreRadioChecked: genre,
        }
      });
    }
    else {
      dispatch({ type: 'resetGenreFilter' });
    }
  }

  const onAgeRadioChange = async (age) => {
    if (age !== isAgeRadioChecked) {
      dispatch({
        type: 'setFields',
        payload: {
          isAgeRadioChecked: age
        }
      });
    }
    else {
      dispatch({ type: 'resetAgeFilter' });
    }
  }

  const getFilteredGames = async (gameAge = 0, gameGenre = '') => {
    try {
      let requiredGamesToFilter;
      let resultArr;

      const response = await axios.get('http://localhost:4000/gamesArr');

      switch (categoryId) {
        case "ps":
          requiredGamesToFilter = response.data.filter(item => item.id >= 100 && item.id < 200);
          break;
        case "xbox":
          requiredGamesToFilter = response.data.filter(item => item.id >= 200 && item.id < 300);
          break;
        case "pc":
          requiredGamesToFilter = response.data.filter(item => item.id >= 300);
          break;
        default:
          requiredGamesToFilter = response.data;
          break;
      }

      const requiredGamesFilteredByAge = requiredGamesToFilter.filter(item => item.age >= gameAge);

      const idsOfFilteredGames = requiredGamesFilteredByAge.map(game => game.id);

      const selectedGames = selectGamesArr();

      const matchedGamesFilteredByAge = idsOfFilteredGames.map(gameId => selectedGames.find(outputGame => (outputGame.id === gameId && outputGame)));

      resultArr = matchedGamesFilteredByAge;

      if (gameGenre) {
        const matchedGamesFilteredByBothReqs = matchedGamesFilteredByAge.filter(item => item.genre.toLocaleLowerCase().includes(gameGenre.toLocaleLowerCase()));
        resultArr = matchedGamesFilteredByBothReqs;
      }

      return resultArr;
    }
    catch(err) {
      console.error(err);
    }
  }

  const requestFilterGames = async () => {
    const filteredGames = await getFilteredGames(isAgeRadioChecked, isGenreRadioChecked);

    dispatch({
      type: 'setFields',
      payload: {
        outputArr: filteredGames,
      }
    });
  }

  const openEditGameModalState = () => {
    setModalState({ isOpened: true, editGameClicked: true });
  }

  const onEditModalCloseClick = () => {
    setModalState({ isOpened: false, editGameClicked: false });

    dispatchFunc({
      type: SET_CURRENT_GAME,
      payload: {
        currentGame: null
      }
    });
  }

  useEffect(() => {
    const selectedGames = selectGamesArr();
    const generatedGenres = generateGenres();
    criteriaSelectRef.current.value = "Default";

    dispatch({
      type: 'setFields',
      payload: {
        outputArr: selectedGames,
        genresArr: generatedGenres
      }
    });

    dispatch({ type: 'resetSortAndFilters' });
  }, [categoryId])

  useEffect(() => {
    if (!isGenreRadioChecked && !isAgeRadioChecked) {

      const selectedGames = selectGamesArr();

      dispatch({
        type: 'setFields',
        payload: {
          outputArr: selectedGames,
        }
      });

      return;
    }
    else {
      requestFilterGames();
    }
  }, [isGenreRadioChecked, isAgeRadioChecked])

  useEffect(() => {
    dispatch({
      type: 'setFields',
      payload: {
        outputArr: selectGamesArr(),
      }
    });
  }, [allGamesArr])

  useEffect(() => {
    window.scrollTo({
      top: 0
    });
  }, [])

  return (
    <>
      <div className="categories">
        <aside className="sidebar">
          <h2 className="sidebar__title">{categoryId ? `- Best games for ${categoryId} -` : "- All available games -"}</h2>
          {categoryId && <img className="sidebar__mini-logo" src={categoryId === "ps" ? playStationLogo : categoryId === "xbox" ? xboxLogo : windowsLogo}/>}

          <div className="sidebar__options-container">
            <p className="sidebar__option-name">Sort:</p>
            <label className="sidebar__option-criteria">
              Criteria:
              <select onChange={onSortSelectChange} ref={criteriaSelectRef}>
                <option>Default</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
              </select>
            </label>
          </div>

          <div className="sidebar__options-container">
            <p className="sidebar__option-name">Genres:</p>
            <label className="sidebar__option-label">
              <input type="radio" name="genre" value={null} ref={genreRadioInput} onClick={() => onGenreRadioChange(null)} checked={isGenreRadioChecked === null} />
              All
            </label>
            {genresArr.map((genre, index) => (
              <label className="sidebar__option-label" key={index}>
                <input type="radio" name="genre" value={genre} ref={genreRadioInput} onClick={() => onGenreRadioChange(genre)} checked={isGenreRadioChecked === genre} />
                {genre}
              </label>
            ))}
          </div>

          <div className="sidebar__options-container">
            <p className="sidebar__option-name">Age:</p>
            {agesArr.map((age, index) =>
              <label className="sidebar__option-label" key={index}>
                <input type="radio" name="age" value={age} ref={ageRadioInput} onClick={() => onAgeRadioChange(age)} checked={isAgeRadioChecked === age} />
                {age}+
            </label>
            )}
          </div>
        </aside>

        <div className="categories-content">
          <SearchBar message="Enter the game name here..." callSearchValue={callSearch} />

          <div className="categories-content__games-container">
            {showSelectedGames()?.map(game => <GameCard key={game.id} gameDetails={game} openEditGameModalState={openEditGameModalState} />)}
          </div>
        </div>
      </div>

      {modalState.isOpened &&
        <Modal
          type={`${modalState.editGameClicked ? "editGame" : "addGame"}`}
          onCloseClick={onEditModalCloseClick}
        >
          <InputText fieldLabel="Name:" fieldName="name" fieldType="text" message="Enter game name here..."></InputText>
          <InputText fieldLabel="Genre:" fieldName="genre" fieldType="text" message="Enter game genre here..."></InputText>
          <InputText fieldLabel="Price:" fieldName="price" fieldType="number" message="Enter game price here..."></InputText>
          <InputText fieldLabel="Company:" fieldName="company" fieldType="text" message="Enter company name here..."></InputText>
          <InputText fieldLabel="Age:" fieldName="age" fieldType="number" message="Enter game age here..."></InputText>
          <InputText fieldLabel="Rating (out of 100 points):" fieldName="metaRating" fieldType="number" message="Enter game rating here..."></InputText>
          <InputText fieldLabel="Image:" fieldName="image" fieldType="file" message="Select game image here..." prefix={currentGameImage}></InputText>
        </Modal>
      }
    </>
  )
}

export default CategoryPg;
