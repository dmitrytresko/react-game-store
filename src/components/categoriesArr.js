import playStationColorfulLogo from "../assets/img/playstation-colorful.png";
import playStationLightLogo from "../assets/img/playstation-light.png";
import xboxColorfulLogo from "../assets/img/xbox-colorful.png";
import xboxLightLogo from "../assets/img/xbox-light.png";
import windowsColorfulLogo from "../assets/img/windows-colorful.png";
import windowsLightLogo from "../assets/img/windows-light.png";

const categoriesArr = [
  {
    id: 1,
    path: playStationColorfulLogo,
    pathLight: playStationLightLogo,
    altName: "PS Colorful Logo",
    altNameLight: "PS Light Logo",
    name: "PlayStation",
    routePath: "/products/ps"
  },
  {
    id: 2,
    path: xboxColorfulLogo,
    pathLight: xboxLightLogo,
    altName: "Xbox Colorful Logo",
    altNameLight: "Xbox Light Logo",
    name: "Xbox ",
    routePath: "/products/xbox"
  },
  {
    id: 3,
    path: windowsColorfulLogo,
    pathLight: windowsLightLogo,
    altName: "Windows Colorful Logo",
    altNameLight: "Windows Light Logo",
    name: "PC",
    routePath: "/products/pc"
  },
];

export default categoriesArr;
