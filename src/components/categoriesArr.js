import playStationColorfulLogo from "../assets/img/playstation-colorful.jpg";
import playStationLightLogo from "../assets/img/playstation-light.jpg";
import xboxColorfulLogo from "../assets/img/xbox-colorful.jpg";
import xboxLightLogo from "../assets/img/xbox-light.jpg";
import windowsColorfulLogo from "../assets/img/windows-colorful.jpg";
import windowsLightLogo from "../assets/img/windows-light.jpg";

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
