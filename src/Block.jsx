import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setPlayerOneResult,
  setPlayerTwoResult,
  startGame,
  switchPlayer,
} from "./Actions";





function Block({ id }) {
  const dispatch = useDispatch();
  const [icon, setIcon] = useState("");
  const playerOne = useSelector((state) => state.game.playerOne);
  const playerOneResult = useSelector((state) => state.game.playerOneResult);
  const playerTwoResult = useSelector((state) => state.game.playerTwoResult);
  const isRefreshed = useSelector((state) => state.game.refreshed);
  const winCombo = useSelector((state) => state.game.winCombo);
  const [winBlock, setWinBlock] = useState(false);

  const gameWithAI = useSelector((state) => state.game.gameWithAI)

  useEffect(() => {
    isRefreshed && setIcon("");
  }, [isRefreshed]);

  useEffect(() => {

    // console.log('id >>> ', id+'' );
    
    if( playerOneResult.includes(  id+'' ) ){
      setIcon(<div className="tic">&#215;</div>);
    }
    if( playerTwoResult.includes(  id+'' ) ){
      setIcon(<div className="tac">⚪</div>);
    }
  }, [playerOneResult, playerTwoResult])

  useEffect(() => {
    if (winCombo?.includes(id)) {
      setWinBlock(true);
    } else {
      setWinBlock(false);
    }
  }, [winCombo]);

  const handleClick = () => {
    if(isRefreshed) {
      dispatch(startGame())
    }
    
    if (playerOne) {
      setIcon(<div className="tic">&#215;</div>);
      dispatch(setPlayerOneResult(id+''));
    } else {
      setIcon(<div className="tac">⚪</div>);
      dispatch(setPlayerTwoResult(id+''));
    }

    if(!gameWithAI){
      dispatch(switchPlayer());
    }
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
