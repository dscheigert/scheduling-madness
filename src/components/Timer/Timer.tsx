// @ts-nocheck
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectTimerStatus, end, recordPoints } from "../../features/game/gameSlice";
import { Typography } from "@mui/material";
import './Timer.css';

export enum timerActions {
    START,
    STOP,
    RESET
}

function DayBlock(props :any) {
  const {startingPoints, display} = props;
  const dispatch = useAppDispatch();

  const TIMER_INTERVAL = 25;

  const [totalPoints, setTotalPoints] = useState(startingPoints);
  const [timer, setTimer] = useState<NodeJS.Timeout | number>(0);

  const timerStatus = useAppSelector(selectTimerStatus);

  useEffect(() => {
    switch (timerStatus) {
        case timerActions.START:
            let interval = setInterval(countDown, TIMER_INTERVAL);
            setTimer(interval);
            break;
        case timerActions.STOP:
            clearInterval(timer);
            dispatch(recordPoints(totalPoints));
            setTimer(0);
            break;
        case timerActions.RESET:
            setTotalPoints(startingPoints)
            let intrvl = setInterval(countDown, TIMER_INTERVAL);
            setTimer(intrvl);
            break;
      }
  }, [timerStatus]);

  useEffect(() => {
    if(totalPoints === 0){
      clearInterval(timer);
      dispatch(recordPoints(totalPoints));
      dispatch(end());
      setTimer(0);
    }
}, [totalPoints]);

const countDown = () => {
    setTotalPoints(totalPoints => totalPoints - 1);
  }

  return (
      <>
    {display && <div className="Timer">
          <Typography className="Points" variant="h6">{totalPoints}</Typography>
        </div>}
    </>
  );
}

export default DayBlock;
