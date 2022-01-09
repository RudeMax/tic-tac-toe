import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  refreshBoard, 
  toggleAI,  
  playerOneWin,
  playerTwoWin,
  setPlayerTwoResult, 
} from "./Actions";
import Block from "./Block";
import { getMove } from "./logic/tictactoelogic";

const progArr = [
  0, 1, 2, 
  3, 4, 5, 
  6, 7, 8
];

const winCombos = [
  ["0", "3", "6"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["0", "1", "2"],
  ["3", "4", "5"],
  ["6", "7", "8"],
  ["0", "4", "8"],
  ["2", "4", "6"],
];

function Board() {
  const checker = (arr, target) => target.every((v) => arr.includes(v));

  const dispatch = useDispatch();
  const playerOneWinner = useSelector((state) => state.game.playerOneWin);
  const playerTwoWinner = useSelector((state) => state.game.playerTwoWin);
  const playerOneResult = useSelector((state) => state.game.playerOneResult);
  const playerTwoResult = useSelector((state) => state.game.playerTwoResult);
  const playerOne = useSelector((state) => state.game.playerOne);
  const [draw, setDraw] = useState(false);

  const gameWithAI = useSelector((state) => state.game.gameWithAI)

  useEffect(() => {
    if (playerOneResult.length === 5 && !playerOneWinner && !playerTwoWinner) {
      setDraw(true);
    } else setDraw(false);
  }, [playerOneResult.length]);

  const handleReset = () => {
    dispatch(refreshBoard());
  };

  const handleAI = () => {
    dispatch(toggleAI());
  };

  useEffect(() => {

    let isGameEnd = false;

    winCombos.forEach((combo) => {
      // console.log('playerOneResult >>> ', playerOneResult);
      // console.log('combo >>> ', combo);

      if (checker(playerOneResult, combo)) {
        isGameEnd = true;
        dispatch(playerOneWin(combo));
      }
    });
    
    if(gameWithAI && !isGameEnd && !playerOneWinner && !playerTwoWinner){
      // console.log('AI move');
      let pAImove = getMove(playerOneResult, playerTwoResult);
      // console.log('pAImove >>> ', pAImove);
      dispatch(setPlayerTwoResult(pAImove));
    }
    

  }, [playerOneResult.length]);

  useEffect(() => {
    winCombos.forEach((combo) => {
      // console.log('playerTwoResult >>> ', playerTwoResult);
      // console.log('combo >>> ', combo);

      if (checker(playerTwoResult, combo)) {
        dispatch(playerTwoWin(combo));
      }
    });
  }, [playerTwoResult.length]);

  return (
    <div>
      {draw ? (
        <p className="finale">DRAW!</p>
      ) : playerOneWinner ? (
        <p className="finale">Player 1 Wins!!!</p>
      ) : playerTwoWinner ? (
        <p className="finale">Player 2 Wins!!!</p>
      ) : playerOne ? (
        <p className="players">Player 1:</p>
      ) : (
        <p className="players">Player 2:</p>
      )}

      <p>AI: {gameWithAI ? "On" : "Off"}</p>

      <div className="board">
        {progArr.map((id) => (
          <Block id={id} key={id} />
        ))}
      </div>
      <button onClick={handleReset} className="resetBtn">
        Reset
      </button>
      <button onClick={handleAI} className="resetBtn">
        {!gameWithAI ? "Turn On AI" : "Turn Off AI"}
      </button>
    </div>
  );
}

export default Board;
