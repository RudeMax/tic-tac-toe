import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { refreshBoard } from "./Actions";
import Block from "./Block";

const progArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function Board() {
  const dispatch = useDispatch();
  const playerOneWinner = useSelector((state) => state.game.playerOneWin);
  const playerTwoWinner = useSelector((state) => state.game.playerTwoWin);
  const playerOneResult = useSelector((state) => state.game.playerOneResult);
  const playerOne = useSelector((state) => state.game.playerOne);
  const [draw, setDraw] = useState(false);

  useEffect(() => {
    if (playerOneResult.length === 5 && !playerOneWinner && !playerTwoWinner) {
      setDraw(true);
    } else setDraw(false);
  }, [playerOneResult.length]);

  const handleReset = () => {
    dispatch(refreshBoard());
  };
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

      <div className="board">
        {progArr.map((id) => (
          <Block id={id} key={id} />
        ))}
      </div>
      <button onClick={handleReset} className="resetBtn">
        Reset
      </button>
    </div>
  );
}

export default Board;
