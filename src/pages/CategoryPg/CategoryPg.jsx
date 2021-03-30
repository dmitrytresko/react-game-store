import { useParams } from "react-router-dom";
import playStationLogo from "../../assets/img/playstation.png";
import xboxLogo from "../../assets/img/xbox.png";
import windowsLogo from "../../assets/img/windows.png";
import "./styles.scss";

const CategoryPg = () => {
  let { categoryId } = useParams();

  console.log(categoryId);

  return (
    <div className="categories">
      <img className="categories__logo" src={categoryId === "ps" ? playStationLogo : categoryId === "xbox" ? xboxLogo : windowsLogo}/>
      <h2 className="page-title">- Best games for {categoryId} -</h2>
    </div>
  )
}

export default CategoryPg;
