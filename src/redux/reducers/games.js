import initialPsGamesArr from "../../components/psGamesArr";
import initialXboxGamesArr from "../../components/xboxGamesArr";
import initialPcGamesArr from "../../components/pcGamesArr";

const allGamesArr = [
  ...initialPsGamesArr,
  ...initialXboxGamesArr,
  ...initialPcGamesArr
];

const initialState = {
  allGamesArr: allGamesArr
};

const gamesReducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case "SET_GAMES_DATA":
      return {
        ...state,
        gamesArr: payload.allgamesArr
      };
    default:
      return state;
  }
}

export default gamesReducer;
