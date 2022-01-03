import {
  SWITCH_PLAYER,
  SET_PLAYERONE_RESULT,
  SET_PLAYERTWO_RESULT,
  REFRESH_BOARD,
  PLAYER_ONE_WIN,
  PLAYER_TWO_WIN,
} from "./Types";

export const playerOneWin = (combo) => {
  return {
    type: PLAYER_ONE_WIN,
    payload: combo,
  };
};

export const playerTwoWin = (combo) => {
  return {
    type: PLAYER_TWO_WIN,
    payload: combo,
  };
};

export const switchPlayer = () => {
  return {
    type: SWITCH_PLAYER,
  };
};

export const setPlayerOneResult = (id) => {
  return {
    type: SET_PLAYERONE_RESULT,
    payload: id,
  };
};

export const setPlayerTwoResult = (id) => {
  return {
    type: SET_PLAYERTWO_RESULT,
    payload: id,
  };
};

export const refreshBoard = () => {
  return {
    type: REFRESH_BOARD,
  };
};
