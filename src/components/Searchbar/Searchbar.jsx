/* eslint-disable */
import { useState, useEffect } from 'react';
import _ from "lodash";
import playStationLogo from "../../assets/img/playstation.png";
import xboxLogo from "../../assets/img/xbox.png";
import windowsLogo from "../../assets/img/windows.png";
import "./styles.scss";

const SearchBar = ({ message, callSearchValue }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const getRequiredGames = async(query) => {
    const receivedArr = await callSearchValue(query);

    setResults(receivedArr);
    setIsLoading(false);
  }

  const [debouncedQuery] = useState(() => _.debounce(getRequiredGames, 3000));

  useEffect(() => {
    if (query) {
      setResults([]);
      setIsLoading(true);
      debouncedQuery(query);
    }
  }, [query])

  const onChangeHandler = event => {
    setQuery(event.target.value);
    setIsSelected(false);
  }

  const onButtonClickHandler = value => {
    setQuery(value);
    setIsSelected(true);
  }

  return (
    <>
      <div className="search-container">
        <form className="searchbar">
          <input type="text" value={query} placeholder={message} onChange={onChangeHandler}/>
          <div className={isLoading ? "searchbar-submit--active" : "searchbar-submit"}>
            {isLoading && <div className="loader"></div>}
          </div>
        </form>

        <div className={`found-info ${!!results.length ? 'found-info--visible' : ''}`.trim()}>
        {query && !!results.length && !isSelected && (
              results.map((item, index) => {
                return (
                  <button className="found-info__text" key={index} type="button" onClick={(event) => onButtonClickHandler(event.target.textContent)}>
                    {item.name}
                    {(item.id >= 100 && item.id < 200) ? <img className="found-info__mini-img" src={playStationLogo} /> :
                    (item.id >= 200 && item.id < 300) ? <img className="found-info__mini-img" src={xboxLogo} /> :
                    <img className="found-info__mini-img" src={windowsLogo} />}
                  </button>
                );
              })
        )}
        </div>
      </div>
    </>
  )
}

export default SearchBar;
