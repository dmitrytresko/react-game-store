/* eslint-disable */
import { useEffect, useReducer, useRef } from "react";
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

const initialState = {
  outputArr: [],
  genresArr: [],
  selectedSortType: 'Default',
  isGenreRadioChecked: null,
  isAgeRadioChecked: null
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
        isAgeRadioChecked: null
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
        isAgeRadioChecked: null
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
      const response = await axios.get('http://localhost:4000/gamesArr');

      const allGamesFilteredByAge = response.data.filter(item => item.age >= gameAge);

      const idsOfFilteredGames = allGamesFilteredByAge.map(game => game.id);

      let matchedGamesFilteredByAge = idsOfFilteredGames.map(gameId => selectGamesArr().find(outputGame => (outputGame.id === gameId)));

      if (gameGenre) {
        matchedGamesFilteredByAge = matchedGamesFilteredByAge.filter(item => item.genre.toLocaleLowerCase().includes(gameGenre.toLocaleLowerCase()));
      }

      switch (categoryId) {
        case "ps": return matchedGamesFilteredByAge.filter(item => item.id >= 100 && item.id < 200);
        case "xbox": return matchedGamesFilteredByAge.filter(item => item.id >= 200 && item.id < 300);
        case "pc": return matchedGamesFilteredByAge.filter(item => item.id >= 300);
        default: return matchedGamesFilteredByAge;
      }
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
           {showSelectedGames()?.map(game => <GameCard key={game.id} gameDetails={game}/>)}
        </div>
      </div>
    </div>
  )
}

export default CategoryPg;
