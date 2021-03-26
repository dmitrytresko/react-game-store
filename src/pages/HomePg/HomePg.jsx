import Searchbar from "../../components/Searchbar/Searchbar";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import categoriesArr from "../../components/categoriesArr";
import "./styles.scss";

const HomePg = () => {
  return (
    <div className="home">
      <Searchbar message="Enter the game name here..."/>

      <div className="home__categories-container">
        {categoriesArr.map((item, id) => <CategoryCard key={id} path={item.path} altName={item.altName} name={item.name} />)}
      </div>
    </div>
  )
}

export default HomePg;
