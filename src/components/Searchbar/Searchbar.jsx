/* eslint-disable */
import { useState, useEffect } from 'react';
import debounce from "lodash.debounce";
import "./styles.scss";

const SearchBar = ({ message, callSearchValue }) => {
  const [query, setQuery] = useState('');

  const debouncedQuery = debounce(() => callSearchValue(query), 3000);

  useEffect(() => {
    if (query) {
      debouncedQuery();
    }

    return debouncedQuery.cancel;
  }, [query])

  const onChangeHandler = event => {
    setQuery(event.target.value);
  }

  return (
    <>
      <form className="searchbar">
        <input type="text" value={query} placeholder={message} onChange={onChangeHandler}/>
        <button className="searchbar-btn" type="submit"></button>
      </form>
    </>
  )
}

export default SearchBar;
