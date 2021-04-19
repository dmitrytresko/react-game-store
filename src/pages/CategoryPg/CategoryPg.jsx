/* eslint-disable */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

  const selectGamesArr = (category) => {
    switch (category) {
      case "ps": return psGamesArr;
      case "xbox": return xboxGamesArr;
      case "pc": return pcGamesArr;
      default: return [
        ...psGamesArr,
        ...xboxGamesArr,
        ...pcGamesArr
      ];
    }
  }

  const callSearch = ({ pathPath, value }) => {
    switch (pathPath) {
      case "ps": return callSearchValueWithPsCategory(value);
      case "xbox": return callSearchValueWithXboxCategory(value);
      case "pc": return callSearchValueWithPcCategory(value);
      default: return callSearchValue(value);
    }
  }

  return (
    <div className="categories">
      <aside className="sidebar">
        <h2 className="sidebar__title">{categoryId ? `- Best games for ${categoryId} -` : "- All available games -"}</h2>
        <img className="sidebar__mini-logo" src={categoryId === "ps" ? playStationLogo : categoryId === "xbox" ? xboxLogo : windowsLogo}/>
      </aside>

      <div className="categories-content">
        <SearchBar message="Enter the game name here..." callSearchValue={callSearch} />

        <div className="categories-content__games-container">
          {selectGamesArr(categoryId).map(game => <GameCard key={game.id} gameDetails={game}/>)}
        </div>
      </div>
    </div>
  )
}

export default CategoryPg;
