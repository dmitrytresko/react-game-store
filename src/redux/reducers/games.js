import initialPsGames from "../../common/psGames";
import initialXboxGames from "../../common/xboxGames";
import initialPcGames from "../../common/pcGames";

const allGames = [...initialPsGames, ...initialXboxGames, ...initialPcGames];

const initialState = {
  allGames: allGames,
};

const gamesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_GAMES_DATA":
      return {
        ...state,
        allGames: payload.gamesArr,
      };
    default:
      return state;
  }
};

export default gamesReducer;
