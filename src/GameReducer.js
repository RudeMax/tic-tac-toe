import { playerOneWin } from "./Actions";
import {
  SWITCH_PLAYER,
  SET_PLAYERTWO_RESULT,
  SET_PLAYERONE_RESULT,
  REFRESH_BOARD,
  PLAYER_ONE_WIN,
  PLAYER_TWO_WIN,
} from "./Types";
const initState = {
  playerOne: true,
  playerOneResult: [],
  playerTwoResult: [],
  refreshed: true,
  playerOneWin: false,
  playerTwoWin: false,
  winCombo: null,
};

const gameReducer = (state = initState, action) => {
  switch (action.type) {
    case SWITCH_PLAYER:
      return {
        ...state,
        refreshed: false,
        playerOne: !state.playerOne,
      };

    case SET_PLAYERONE_RESULT:
      return {
        ...state,
        playerOneResult: [...state.playerOneResult, action.payload].sort(),
      };

    case SET_PLAYERTWO_RESULT:
      return {
        ...state,
        playerTwoResult: [...state.playerTwoResult, action.payload].sort(),
      };

    case REFRESH_BOARD:
      return {
        ...state,
        refreshed: true,
        playerOne: true,
        playerOneResult: [],
        playerTwoResult: [],
        playerOneWin: false,
        playerTwoWin: false,
        winCombo: null,
      };

    case PLAYER_ONE_WIN:
      return {
        ...state,
        playerOneWin: !state.playerOneWin,
        winCombo: action.payload,
      };

    case PLAYER_TWO_WIN:
      return {
        ...state,
        playerTwoWin: !state.playerTwoWin,
        winCombo: action.payload,
      };
    default:
      return state;
  }
};

export default gameReducer;
