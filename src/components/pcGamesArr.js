import hitman3Img from "../assets/img/games/pc/hitman3.png";
import assassinValhallaImg from "../assets/img/games/pc/assassin-valhalla.png";
import fifa21Img from "../assets/img/games/pc/fifa21.png";
import warzoneImg from "../assets/img/games/pc/warzone.png";
import rainbowSixImg from "../assets/img/games/pc/rainbow-six.png";
import f12020Img from "../assets/img/games/pc/f12020.png";
import skyrimImg from "../assets/img/games/pc/skyrim.png";
import rdr2Img from "../assets/img/games/pc/rdr2.png";
import fiveStars from "../assets/img/card-items/five-stars.png";
import fourStars from "../assets/img/card-items/four-stars.png";

const pcGamesArr = [
  {
    id: 300,
    name: "Hitman 3",
    company: "IO Interactive",
    path: hitman3Img,
    rating: fiveStars,
    price: "$34.99"
  },
  {
    id: 301,
    name: "Assassin's Creed Valhalla",
    company: "Ubisoft",
    path: assassinValhallaImg,
    rating: fourStars,
    price: "$69.99"
  },
  {
    id: 302,
    name: "FIFA 21: Champions Edition",
    company: "EA Sports",
    path: fifa21Img,
    rating: fourStars,
    price: "$49.99"
  },
  {
    id: 303,
    name: "Call of Duty: Warzone",
    company: "Infinity Ward",
    path: warzoneImg,
    rating: fourStars,
    price: "FREE"
  },
  {
    id: 304,
    name: "Tom Clancy's Rainbow Six Siege",
    company: "Ubisoft",
    path: rainbowSixImg,
    rating: fiveStars,
    price: "$19.99"
  },
  {
    id: 305,
    name: "F1 2020",
    company: "Codemasters",
    path: f12020Img,
    rating: fourStars,
    price: "$54.99"
  },
  {
    id: 306,
    name: "The Elder Scrolls V: Skyrim",
    company: "Bethesda Game Studios",
    path: skyrimImg,
    rating: fiveStars,
    price: "$19.99"
  },
  {
    id: 307,
    name: "Red Dead Redemption 2",
    company: "Rockstar Games",
    path: rdr2Img,
    rating: fiveStars,
    price: "$34.99"
  }
]

export default pcGamesArr;
