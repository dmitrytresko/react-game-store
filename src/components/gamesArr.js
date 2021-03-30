import fifa21Img from "../assets/img/games/fifa21.png";
import rdr2Img from "../assets/img/games/rdr2.png";
import theWitcher3Img from "../assets/img/games/the-witcher3.png";
import theLastOfUs2Img from "../assets/img/games/the-last-of-us2.png";
import fiveStars from "../assets/img/card-items/five-stars.png";
import fourStars from "../assets/img/card-items/four-stars.png";

const gamesArr = [
  {
    id: 100,
    name: "FIFA 21",
    company: "EA Sports",
    path: fifa21Img,
    rating: fiveStars,
    price: "$49.99"
  },
  {
    id: 101,
    name: "Red Dead Redemption 2",
    company: "Rockstar Games",
    path: rdr2Img,
    rating: fiveStars,
    price: "$54.99"
  },
  {
    id: 102,
    name: "The Witcher 3: Wild Hunt",
    company: "CD PROJEKT SA",
    path: theWitcher3Img,
    rating: fiveStars,
    price: "$24.99"
  },
  {
    id: 103,
    name: "The Last of Us Part II",
    company: "Sony Interactive Entertainment",
    path: theLastOfUs2Img,
    rating: fourStars,
    price: "$54.99"
  }
]

export default gamesArr;
