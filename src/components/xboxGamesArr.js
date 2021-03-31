import forzaHorizon4Img from "../assets/img/games/xbox/forza-horizon4.png";
import fifa21Img from "../assets/img/games/xbox/fifa21.png";
import mc11Img from "../assets/img/games/xbox/mc11.png";
import assassinOdysseyImg from "../assets/img/games/xbox/assassin-odyssey.png";
import residentEvil7Img from "../assets/img/games/xbox/resident-evil7.png";
import theWitcher3Img from "../assets/img/games/xbox/the-witcher3.png";
import rocketLeagueImg from "../assets/img/games/xbox/rocket-league.png";
import tombRaiderImg from "../assets/img/games/xbox/tomb-raider.png";
import fiveStars from "../assets/img/card-items/five-stars.png";
import fourStars from "../assets/img/card-items/four-stars.png";

const xboxGamesArr = [
  {
    id: 200,
    name: "Forza Horizon 4: Standard Edition",
    company: "Playground Games",
    path: forzaHorizon4Img,
    rating: fiveStars,
    price: "$54.99"
  },
  {
    id: 201,
    name: "The Witcher 3: Wild Hunt",
    company: "CD Projekt",
    path: theWitcher3Img,
    rating: fiveStars,
    price: "$39.99"
  },
  {
    id: 202,
    name: "Mortal Kombat 11: Standard Edition",
    company: "NetherRealm Studios",
    path: mc11Img,
    rating: fiveStars,
    price: "$44.99"
  },
  {
    id: 203,
    name: "FIFA 21: Ultimate Edition",
    company: "EA Sports",
    path: fifa21Img,
    rating: fourStars,
    price: "$99.99"
  },
  {
    id: 204,
    name: "Resident Evil 7: Biohazard",
    company: "Capcom",
    path: residentEvil7Img,
    rating: fourStars,
    price: "$19.99"
  },
  {
    id: 205,
    name: "Assassin's Creed Odyssey: Standard Edition",
    company: "Ubisoft",
    path: assassinOdysseyImg,
    rating: fourStars,
    price: "$54.99"
  },
  {
    id: 206,
    name: "Rise of the Tomb Raider",
    company: "Crystal Dynamics",
    path: tombRaiderImg,
    rating: fourStars,
    price: "$24.99"
  },
  {
    id: 207,
    name: "Rocket League",
    company: "‪Psyonix LLC",
    path: rocketLeagueImg,
    rating: fiveStars,
    price: "FREE"
  }
]

export default xboxGamesArr;
