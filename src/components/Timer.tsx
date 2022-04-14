// @ts-nocheck
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectTimerStatus,end, recordPoints } from "../features/game/gameSlice";
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
            console.log("stopped");
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

const countDown = () => {
    setTotalPoints(totalPoints => totalPoints - 1);
    if (totalPoints === 0) { 
      setTotalPoints(0);
      dispatch(recordPoints(totalPoints));
      dispatch(end());
      clearInterval(timer);
      setTimer(0);
    }
  }

  return (
      <>
    {display && <div className="Timer">
            {totalPoints}
        </div>}
    </>
  );
}

export default DayBlock;
