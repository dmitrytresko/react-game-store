import playStationLogo from "../assets/img/playstation.png";
import xboxLogo from "../assets/img/xbox.png";
import windowsLogo from "../assets/img/windows.png";

const categoriesArr = [
  {
    id: 1,
    path: playStationLogo,
    altName: "PS logo",
    name: "PlayStation",
    routePath: "/products/ps"
  },
  {
    id: 2,
    path: xboxLogo,
    altName: "Xbox logo",
    name: "Xbox ",
    routePath: "/products/xbox"
  },
  {
    id: 3,
    path: windowsLogo,
    altName: "Windows logo",
    name: "PC",
    routePath: "/products/pc"
  },
];

export default categoriesArr;
