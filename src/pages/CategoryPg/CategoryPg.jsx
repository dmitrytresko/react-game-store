/* eslint-disable */
import { useState, useEffect, useReducer, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import GameCard from "../../components/GameCard/GameCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import playStationLogo from "../../assets/img/playstation.png";
import xboxLogo from "../../assets/img/xbox.png";
import windowsLogo from "../../assets/img/windows.png";
import psGamesArr from "../../components/psGamesArr";
import xboxGamesArr from "../../components/xboxGamesArr";
import pcGamesArr from "../../components/pcGamesArr";
import { callSearchValueWithPsCategory, callSearchValueWithXboxCategory, callSearchValueWithPcCategory, callSearchValue } from "../../api";
import "./styles.scss";

const ACTIONS = {
  SET_INITIAL_CARDS_ARR: 'setInitialCardsArr',
  RESET_SORT_TYPE: 'resetSortType',
  RESET_FILTERS: 'resetFilters',
  RESET_FILTERED_ARR_BY_GENRE: 'resetFilteredArrByGenre',
  RESET_FILTERED_ARR_BY_AGE: 'resetFilteredArrByAge',
  SET_SORT_TYPE: 'setSortType',
  SET_IS_GENRE_RADIO_CHECKED: 'setIsGenreRadioChecked',
  SET_IS_AGE_RADIO_CHECKED: 'setIsAgeRadioChecked',
  SET_OUTPUT_ARR: 'setOutputArr'
}

const initialState = {
  genresArr: [],
  outputArr: [],
  selectedSortType: 'Default',
  isGenreRadioChecked: null,
  isAgeRadioChecked: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_INITIAL_CARDS_ARR:
      return {
        ...state,
        outputArr: action.payload.selectGamesArr()
      };
    case ACTIONS.RESET_SORT_TYPE:
      return {
        ...state,
        selectedSortType: 'Default'
      };
    case ACTIONS.RESET_FILTERS:
      return {
        ...state,
        isGenreRadioChecked: null,
        genresArr: action.payload.generateGenres(),
        isAgeRadioChecked: null
      };
    case ACTIONS.RESET_FILTERED_ARR_BY_GENRE:
      return {
        ...state,
        isGenreRadioChecked: null,
        genresArr: action.payload.selectGamesArr(),
        isAgeRadioChecked: null
      };
    case ACTIONS.RESET_FILTERED_ARR_BY_GENRE:
      return {
        ...state,
        genresArr: action.payload.selectGamesArr(),
        isAgeRadioChecked: null
      };
    case ACTIONS.SET_SORT_TYPE:
      return {
        ...state,
        selectedSortType: action.payload.value
      };
    case ACTIONS.SET_IS_GENRE_RADIO_CHECKED:
      return {
        ...state,
        isGenreRadioChecked: action.payload.value
      };
    case ACTIONS.SET_IS_AGE_RADIO_CHECKED:
      return {
        ...state,
        isAgeRadioChecked: action.payload.value
      };
    case ACTIONS.SET_OUTPUT_ARR:
      return {
        ...state,
        outputArr: action.payload.value
      };
    default: return state;
  }
}

const CategoryPg = () => {
  const { categoryId } = useParams();

  const [state, dispatch] = useReducer(reducer, initialState);
  const { genresArr, outputArr, selectedSortType, isGenreRadioChecked, isAgeRadioChecked } = state;

  const criteriaSelectRef = useRef();
  const genreRadioInput = useRef();
  const ageRadioInput = useRef();

  const agesArr = ['0', '16', '18'];

  const allGamesArr = [
    ...psGamesArr,
    ...xboxGamesArr,
    ...pcGamesArr
  ];

  const selectGamesArr = () => {
    switch (categoryId) {
      case "ps": return [...psGamesArr];
      case "xbox": return [...xboxGamesArr];
      case "pc": return [...pcGamesArr];
      default: return allGamesArr;
    }
  }

  useEffect(() => {
    dispatch({ type: ACTIONS.SET_INITIAL_CARDS_ARR, payload: { selectGamesArr: selectGamesArr }});
  }, [categoryId])

  useEffect(() => {
    criteriaSelectRef.current.value = "Default";
    dispatch({ type: ACTIONS.RESET_SORT_TYPE });
  }, [categoryId])

  useEffect(() => {
    dispatch({ type: ACTIONS.RESET_FILTERS, payload: { generateGenres: generateGenres }});
  }, [categoryId])

  useEffect(() => {
    if (selectedSortType === 'Default') {
      dispatch({ type: ACTIONS.SET_INITIAL_CARDS_ARR });
    }
  }, [selectedSortType])

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

  const onSortSelectChange = (event) => {
    dispatch({ type: ACTIONS.SET_SORT_TYPE, payload: { value: event.target.value }});
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
      dispatch({ type: ACTIONS.SET_IS_GENRE_RADIO_CHECKED, payload: { value: genre }});

      const gamesFilteredByGenre = await filterGamesByGenre(genre);

      const idsOfFilteredGames = gamesFilteredByGenre.map(game => game.id);

      const matchedGamesFilteredByGenre = idsOfFilteredGames.map(gameId => selectGamesArr().find(outputGame => outputGame.id === gameId));

      dispatch({ type: ACTIONS.SET_OUTPUT_ARR, payload: { value: matchedGamesFilteredByGenre }});
    }
    else {
      dispatch({ type: ACTIONS.RESET_FILTERED_ARR_BY_GENRE, payload: { selectGamesArr: selectGamesArr }});
    }
  }

  const filterGamesByGenre = async (genreName) => {
    try {
      const response = await axios.get('http://localhost:4000/gamesArr');

      const allGamesFilteredByGenre = response.data.filter(item => item.genre.toLocaleLowerCase().includes(genreName.toLocaleLowerCase()));

      switch (categoryId) {
        case "ps": return allGamesFilteredByGenre.filter(item => item.id >= 100 && item.id < 200);
        case "xbox": return allGamesFilteredByGenre.filter(item => item.id >= 200 && item.id < 300);
        case "pc": return allGamesFilteredByGenre.filter(item => item.id >= 300);
        default: return allGamesFilteredByGenre;
      }
    }
    catch(err) {
      console.error(err);
    }
  }

  const onAgeRadioChange = async (age) => {
    if (age !== isAgeRadioChecked) {
      dispatch({ type: ACTIONS.SET_IS_AGE_RADIO_CHECKED, payload: { value: age }});

      const gamesFilteredByAge = await filterGamesByAge(age);

      const idsOfFilteredGames = gamesFilteredByAge.map(game => game.id);

      const matchedGamesFilteredByAge = idsOfFilteredGames.map(gameId => selectGamesArr().find(outputGame => outputGame.id === gameId));

      dispatch({ type: ACTIONS.SET_OUTPUT_ARR, payload: { value: matchedGamesFilteredByAge }});
    } else {
      dispatch({ type: ACTIONS.RESET_FILTERED_ARR_BY_AGE, payload: { selectGamesArr: selectGamesArr }});
    }
  }

  const filterGamesByAge = async (gameAge) => {
    try {
      const response = await axios.get('http://localhost:4000/gamesArr');

      const allGamesFilteredByAge = response.data.filter(item => item.age >= gameAge);

      switch (categoryId) {
        case "ps": return allGamesFilteredByAge.filter(item => item.id >= 100 && item.id < 200);
        case "xbox": return allGamesFilteredByAge.filter(item => item.id >= 200 && item.id < 300);
        case "pc": return allGamesFilteredByAge.filter(item => item.id >= 300);
        default: return allGamesFilteredByAge;
      }
    }
    catch(err) {
      console.error(err);
    }
  }

  return (
    <div className="categories">
      <aside className="sidebar">
        <h2 className="sidebar__title">{categoryId ? `- Best games for ${categoryId} -` : "- All available games -"}</h2>
        {categoryId && <img className="sidebar__mini-logo" src={categoryId === "ps" ? playStationLogo : categoryId === "xbox" ? xboxLogo : windowsLogo}/>}

        <div className="sidebar__options-container">
          <p className="sidebar__option-name">Sort</p>
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
          {genresArr.map((genre, index) => (
            <label className="sidebar__option-label" key={index} >
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
          {showSelectedGames().map(game => <GameCard key={game.id} gameDetails={game}/>)}
        </div>
      </div>
    </div>
  )
}

export default CategoryPg;
