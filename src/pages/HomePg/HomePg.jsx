import SearchBar from "../../components/SearchBar/SearchBar";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import categoriesArr from "../../components/categoriesArr";
// import axios from "axios";
import "./styles.scss";
// import { useState } from "react";

const HomePg = () => {
  // const [cards, setCards] = useState([]);

  const callSearchValue = async (value) => {
    console.log(value);

    // setCards([]);
    // console.log(cards);
    // const result = await axios.get(`dsrjnydry/api/search/${value}`);
    // setCards(result);
  }

  return (
    <div className="home">
      <SearchBar message="Enter the game name here..." callSearchValue={callSearchValue}/>

      <div className="home__categories-container">
        {categoriesArr.map((item, id) => {
          return <CategoryCard key={id} path={item.path} altName={item.altName} name={item.name} route={item.routePath}/>
        })}
      </div>


    </div>
  )
}

export default HomePg;
