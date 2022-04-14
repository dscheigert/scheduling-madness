import DayBlock from "./DayBlock";
import { Level } from "../data/interfaces";
import { begin, restart, selectIsGameComplete, selectIsGameStarted, selectRecordedPoints } from '../features/game/gameSlice';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Timer from "./Timer";

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
    dispatch(begin());
  }

  const handleRestart =() => {
    dispatch(restart());
  }

  return (
    <div className="CalendarWrapper" style={{width:'70%', margin:'auto', position: 'relative'}}>
      {(!gameCompleted && !gameStarted ) && <button onClick={handleBegin}>Begin</button>}
      {gameCompleted && <button onClick={handleRestart}>Restart</button>}
      {gameCompleted && <div>You win with {totalPoints} points!</div>}
      {gameStarted &&  <Timer display={!gameCompleted} startingPoints={STARTING_POINTS}></Timer>}
      {(gameStarted && !gameCompleted) && <div className="Calendar" style={{border: '1px solid black', width: '70vw', height: '40vw', textAlign:'center'}}>
        {levels.map((level : Level, i: number) => 
        {
          const dayBlock = level.active ? <DayBlock 
          level = {i}
          winningHours={level.winningHours}
          userBlockSize={level.userBlockSize} 
          initialHour={level.initialHour} 
          blockedHours={level.blockedHours} 
          workingHours={level.workingHours}
          isActive={level.active}
          isCompleted={level.completed}
          /> :  <></>
          return dayBlock;
        }
        )}
      </div>}             
    </div>
  );
}

export default Calendar;
