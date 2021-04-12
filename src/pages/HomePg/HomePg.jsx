/* eslint-disable */
import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import GameCard from "../../components/GameCard/GameCard";
import categoriesArr from "../../components/categoriesArr";
import psGamesArr from "../../components/psGamesArr";
import xboxGamesArr from "../../components/xboxGamesArr";
import pcGamesArr from "../../components/pcGamesArr";
import axios from "axios";
import "./styles.scss";

const HomePg = () => {
  const [selectedGames, setSelectedGames] = useState([]);

  const getTopProductsInfo = async() => {
    try {
      const response = await axios.get('http://localhost:4000/getTopProducts');

      const theBestRatings = response.data.map(item => item.metaRating).sort().reverse().slice(0, 3);

      const gamesWithBestRatings = theBestRatings.map(number => response.data.find(item => item.metaRating === number));

      const matchedBestRatedGames = gamesWithBestRatings.map(game => psGamesArr.find(psGame => psGame.name === game.name));

      setSelectedGames(matchedBestRatedGames);
    }
    catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getTopProductsInfo();

    return null;
  },[])

  const callSearchValue = async(value) => {
    try {
      const response = await axios.get('http://localhost:4000/gamesArr');

      return response.data.filter(item => item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
    }
    catch(err) {
      console.error(err);
    }
  }

  return (
    <div className="home">
      <SearchBar message="Enter the game name here..." callSearchValue={callSearchValue}/>

      <div className="home__categories-container">
        {categoriesArr.map((item, id) => {
          return <CategoryCard key={id} path={item.path} altName={item.altName} name={item.name} route={item.routePath}/>
        })}
      </div>

      <h2 className="page-title">- The best games -</h2>
      {selectedGames ? <div className="home__games-container">
        {selectedGames.map(game => <GameCard key={game.id} gameDetails={game}/>)}
      </div> : ""}
    </div>
  )
}

export default HomePg;
