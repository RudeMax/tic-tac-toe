import { playerOneWin } from "./Actions";

import {
  SWITCH_PLAYER,
  SET_PLAYERTWO_RESULT,
  SET_PLAYERONE_RESULT,
  REFRESH_BOARD,
  PLAYER_ONE_WIN,
  PLAYER_TWO_WIN,
  TOGGLE_AI,
  START_GAME,
} from "./Types";

const initState = {
  playerOne: true,
  playerOneResult: [],
  playerTwoResult: [],
  refreshed: true,
  playerOneWin: false,
  playerTwoWin: false,
  winCombo: null,
  gameWithAI: false,
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
        gameWithAI:false,
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

    case TOGGLE_AI:{
      return{
        ...state,
        gameWithAI: !state.gameWithAI,
      }
    }
    case START_GAME:{
      return{
        ...state,
        refreshed: false,
      }
    }
    default:
      return state;
  }
};

export default gameReducer;
