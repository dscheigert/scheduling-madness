import DayBlock from "../DayBlock/DayBlock";
import { Level } from "../../data/interfaces";
import { begin, restart, selectIsGameComplete, selectIsGameStarted, selectRecordedPoints, goHome, shuffleLevels } from '../../features/game/gameSlice';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Timer from "../Timer/Timer";
import {Button, Typography} from '@mui/material';
import './Calendar.css'; 


function Calendar(props : any) {
  const {levels} = props;
  const STARTING_POINTS = 5000;
  //redux
  const dispatch = useAppDispatch();
  const gameStarted = useAppSelector(selectIsGameStarted);
  const gameCompleted = useAppSelector(selectIsGameComplete);
  const totalPoints = useAppSelector(selectRecordedPoints);

  //handlers
  const handleBegin =() => {
    dispatch(shuffleLevels());
    dispatch(begin());
  }

  const handleLaunchHowTo =() => {
    window.alert("pending")
  }

  const handleRestart =() => {
    dispatch(shuffleLevels());
    dispatch(restart());
  }

  const handleGoHome = () => {
    dispatch(goHome());
  }

  //TODO: move some of the functionality here into 'home' component
  return (
    <div className="CalendarWrapper">
      {(!gameCompleted && !gameStarted ) && 
      <>
      <div className="ButtonWrapper"><Button variant="outlined" className="StandardButton" onClick={handleBegin}>Begin</Button></div>
      <div className="ButtonWrapper"><Button variant="outlined" className="StandardButton" onClick={handleLaunchHowTo}>How to Play</Button></div>
      </>
      }
      {gameCompleted && 
        <>
        <div className="ButtonWrapper"><Button variant="outlined" className="StandardButton" onClick={handleGoHome}>Home</Button></div>
        <div className="ButtonWrapper"><Button variant="outlined" className="StandardButton" onClick={handleRestart}>Restart</Button></div>      
        {totalPoints <= 0 ? <Typography className="WinMessage" variant="h6">Better Luck Next Time</Typography> : <Typography className="WinMessage" variant="h6">You win with {totalPoints} points!</Typography>}
        </> 
        }
      {gameStarted &&  <Timer display={!gameCompleted} startingPoints={STARTING_POINTS}></Timer>}
      {(gameStarted && !gameCompleted) && <div className="Calendar">
        {levels.map((level : Level, i: number) => 
        {
          const dayBlock = level.active ? <DayBlock 
          level = {i}
          key = {i}
          winningHours={level.winningHours}
          userBlockSize={level.userBlockSize} 
          initialHour={level.initialHour} 
          blockedHours={level.blockedHours} 
          workingHours={level.workingHours}
          isActive={level.active}
          gapSize={level.gapSize}
          isCompleted={level.completed}
          /> :  <></>
          return dayBlock;
        }
        )}
      </div>
      }             
    </div>
  );
}

export default Calendar;