/* eslint-disable */
import { useState, useEffect, useRef } from "react";
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

const CategoryPg = () => {
  const { categoryId } = useParams();

  const [genresArr, setGenresArr] = useState([]);
  const [outputArr, setOutputArr] = useState([]);
  const [selectedSortType, setSelectedSortType] = useState('');
  // const [sortedArr, setSortedArr] = useState([]);
  const [isGenreRadioChecked, setIsGenreRadioChecked] = useState(null);
  const [isAgeRadioChecked, setIsAgeRadioChecked] = useState(null);

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
      case "ps": return psGamesArr;
      case "xbox": return xboxGamesArr;
      case "pc": return pcGamesArr;
      default: return allGamesArr;
    }
  }

  useEffect(() => {
    setOutputArr(selectGamesArr());
  }, [categoryId])

  useEffect(() => {
    criteriaSelectRef.current.value = "-";
    setSelectedSortType('');
    // setSortedArr([]);
  }, [categoryId])

  useEffect(() => {
    setIsGenreRadioChecked(null);
    setGenresArr(generateGenres());
    setIsAgeRadioChecked(null);
  }, [categoryId])

  useEffect(() => {
    console.log('Output changed');
  }, [outputArr])

  useEffect(() => {
    switch (selectedSortType) {
      case "price":
        setOutputArr(selectGamesArr().sort((a, b) => a.price - b.price));
        break;
      case "rating":
        setOutputArr(selectGamesArr().sort((a, b) => a.metaRating - b.metaRating));
        break;
      default: setOutputArr(selectGamesArr());
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
    setSelectedSortType(event.target.value);
  }

  const onGenreRadioChange = async (genre) => {
    if (genre !== isGenreRadioChecked) {
      setIsGenreRadioChecked(genre);

      const gamesFilteredByGenre = await filterGamesByGenre(genre);

      const idsOfFilteredGames = gamesFilteredByGenre.map(game => game.id);

      const matchedGamesFilteredByGenre = idsOfFilteredGames.map(gameId => selectGamesArr().find(outputGame => outputGame.id === gameId));

      console.log(matchedGamesFilteredByGenre);

      setOutputArr(matchedGamesFilteredByGenre);
    }
    else {
      setIsGenreRadioChecked(null);
      setIsAgeRadioChecked(null);
      setOutputArr(selectGamesArr());
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
      setIsAgeRadioChecked(age);

      const gamesFilteredByAge = await filterGamesByAge(age);

      const idsOfFilteredGames = gamesFilteredByAge.map(game => game.id);

      const matchedGamesFilteredByAge = idsOfFilteredGames.map(gameId => selectGamesArr().find(outputGame => outputGame.id === gameId));

      console.log(matchedGamesFilteredByAge);

      setOutputArr(matchedGamesFilteredByAge);
    } else {
      setIsAgeRadioChecked(null);
      setOutputArr(selectGamesArr());
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
              <option></option>
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
          {outputArr.map(game => <GameCard key={game.id} gameDetails={game}/>)}
        </div>
      </div>
    </div>
  )
}

export default CategoryPg;
