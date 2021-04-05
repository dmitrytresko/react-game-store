import { useParams } from "react-router-dom";
import GameCard from "../../components/GameCard/GameCard";
import playStationLogo from "../../assets/img/playstation.png";
import xboxLogo from "../../assets/img/xbox.png";
import windowsLogo from "../../assets/img/windows.png";
import psGamesArr from "../../components/psGamesArr";
import xboxGamesArr from "../../components/xboxGamesArr";
import pcGamesArr from "../../components/pcGamesArr";
import "./styles.scss";

const CategoryPg = () => {
  let { categoryId } = useParams();

  const selectGamesArr = (category) => {
    switch (category) {
      case "ps": return psGamesArr;
      case "xbox": return xboxGamesArr;
      case "pc": return pcGamesArr;
      default: return;
    }
  }

  return (
    <div className="categories">
      <div className="categories__title-block">
        <img className="categories__logo" src={categoryId === "ps" ? playStationLogo : categoryId === "xbox" ? xboxLogo : windowsLogo}/>
        <p className="page-title">-</p>
        <h2 className="page-title">Best games for {categoryId}</h2>
        <p className="page-title">-</p>
        <img className="categories__logo" src={categoryId === "ps" ? playStationLogo : categoryId === "xbox" ? xboxLogo : windowsLogo}/>
      </div>
      <div className="categories__games-container">
        {selectGamesArr(categoryId).map(game => <GameCard key={game.id} gameDetails={game}/>)}
      </div>
    </div>
  )
}

export default CategoryPg;
