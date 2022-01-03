import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  playerOneWin,
  playerTwoWin,
  setPlayerOneResult,
  setPlayerTwoResult,
  switchPlayer,
} from "./Actions";

const winCombos = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checker = (arr, target) => target.every((v) => arr.includes(v));

function Block({ id }) {
  const dispatch = useDispatch();
  const [icon, setIcon] = useState("");
  const playerOne = useSelector((state) => state.game.playerOne);
  const playerOneResult = useSelector((state) => state.game.playerOneResult);
  const playerTwoResult = useSelector((state) => state.game.playerTwoResult);
  const isRefreshed = useSelector((state) => state.game.refreshed);
  const winCombo = useSelector((state) => state.game.winCombo);
  const [winBlock, setWinBlock] = useState(false);

  useEffect(() => {
    isRefreshed && setIcon("");
  }, [isRefreshed]);

  useEffect(() => {
    winCombos.forEach((combo) => {
      if (checker(playerOneResult, combo)) {
        dispatch(playerOneWin(combo));
      }
    });
  }, [playerOneResult.length]);

  useEffect(() => {
    winCombos.forEach((combo) => {
      if (checker(playerTwoResult, combo)) {
        dispatch(playerTwoWin(combo));
      }
    });
  }, [playerTwoResult.length]);

  useEffect(() => {
    if (winCombo?.includes(id)) {
      setWinBlock(true);
    } else {
      setWinBlock(false);
    }
  }, [winCombo]);

  const handleClick = () => {
    if (playerOne) {
      setIcon(<div className="tic">&#215;</div>);
      dispatch(setPlayerOneResult(id));
    } else {
      setIcon(<div className="tac">⚪</div>);
      dispatch(setPlayerTwoResult(id));
    }
    dispatch(switchPlayer());
  };

  const buttonStyle = () => {
    if (winBlock) {
      return { background: "rgb(214, 211, 41)" };
    } else {
      return { background: "c01f9e" };
    }
  };

  return (
    <button
      id={id}
      className={`block  ${winBlock ? "winBlock" : ""}`}
      onClick={handleClick}
      disabled={icon || winCombo}
    >
      {icon}
    </button>
  );
}

export default Block;
