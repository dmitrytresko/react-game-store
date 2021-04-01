/* eslint-disable */
import { useState, useEffect } from 'react';
import debounce from "lodash.debounce";
import "./styles.scss";

const SearchBar = ({ message, callSearchValue }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const debouncedQuery = debounce(async() => {
    const receivedArr = await callSearchValue(query);

    setResults(receivedArr);
    setIsLoading(false);
  }, 3000);

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      debouncedQuery();
    }

    return () => {
      debouncedQuery.cancel;
      setResults([]);
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

        {query && !!results.length && !isSelected && (
           results.map((item, index) => {
            return (
              <button className="found-info" key={index} type="button" onClick={(event) => onButtonClickHandler(event.target.textContent)}>
                <p className="found-info--paragraph">{item.name}</p>
              </button>
            );
          })
        )}
      </div>
    </>
  )
}

export default SearchBar;
