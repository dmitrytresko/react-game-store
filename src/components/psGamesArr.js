import fifa21Img from "../assets/img/games/ps/fifa21.png";
import rdr2Img from "../assets/img/games/ps/rdr2.png";
import theWitcher3Img from "../assets/img/games/ps/the-witcher3.png";
import theLastOfUs2Img from "../assets/img/games/ps/the-last-of-us2.png";
import gta5Img from "../assets/img/games/ps/gta5.png";
import fallout4Img from "../assets/img/games/ps/fallout4.png";
import horizonZeroDawnImg from "../assets/img/games/ps/horizon-zero-dawn.png";
import ufc4Img from "../assets/img/games/ps/ufc4.png";
import fiveStars from "../assets/img/card-items/five-stars.jpg";
import fourStars from "../assets/img/card-items/four-stars.jpg";
import threeStars from "../assets/img/card-items/three-stars.jpg";

const psGamesArr = [
  {
    id: 100,
    name: "FIFA 21: Standard Edition",
    company: "EA Sports",
    path: fifa21Img,
    rating: threeStars,
    price: 59.99,
    age: 0,
    genre: "Sports",
    metaRating: 72
  },
  {
    id: 101,
    name: "Red Dead Redemption 2",
    company: "Rockstar Games",
    path: rdr2Img,
    rating: fiveStars,
    price: 51.99,
    age: 18,
    genre: "Shooter",
    metaRating: 97
  },
  {
    id: 102,
    name: "The Witcher 3: Wild Hunt",
    company: "CD Projekt",
    path: theWitcher3Img,
    rating: fiveStars,
    price: 24.99,
    age: 18,
    genre: "Action-RPG",
    metaRating: 93
  },
  {
    id: 103,
    name: "The Last of Us Part II",
    company: "Sony Interactive",
    path: theLastOfUs2Img,
    rating: fiveStars,
    price: 54.99,
    age: 18,
    genre: "Survival horror",
    metaRating: 93
  },
  {
    id: 104,
    name: "Fallout 4",
    company: "Bethesda",
    path: fallout4Img,
    rating: fiveStars,
    price: 14.99,
    age: 18,
    genre: "Action-RPG",
    metaRating: 87
  },
  {
    id: 105,
    name: "Grand Theft Auto V",
    company: "Rockstar Games",
    path: gta5Img,
    rating: fiveStars,
    price: 24.99,
    age: 18,
    genre: "Action-Adventure",
    metaRating: 97
  },
  {
    id: 106,
    name: "Horizon Zero Dawn",
    company: "Sony Interactive",
    path: horizonZeroDawnImg,
    rating: fiveStars,
    price: 16.99,
    age: 16,
    genre: "Action-RPG",
    metaRating: 89
  },
  {
    id: 107,
    name: "UFC 4",
    company: "EA Sports",
    path: ufc4Img,
    rating: fourStars,
    price: 109.99,
    age: 18,
    genre: "Fighting",
    metaRating: 78
  }
]

export default psGamesArr;
