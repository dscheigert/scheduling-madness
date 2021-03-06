import { useEffect, useState } from "react";
import { HourBlock } from "../../data/interfaces";
import ScheduleBlock from "../ScheduleBlock/ScheduleBlock";
import './DayBlock.css';

function DayBlock(props :any) {
  const {initialHour, blockedHours, workingHours, userBlockSize, level, winningHours, isCompleted, gapSize} = props;
  const STARTING_HOUR = workingHours[0].hour;
  const [hourBlockWidth, setHourBlockWidth] = useState(0);
  const [workingHoursList, setWorkingHours] = useState(workingHours);
  const [blockedHoursList, setBlockedHoursList] = useState(blockedHours);

  useEffect(() => {
    const listWithRenderedXValues = workingHoursList.map((val: HourBlock) => {        
        const hourBlockElement = document.getElementById(`${level}_${STARTING_HOUR}_block`);
        const hourBlock :HourBlock = {hour: val.hour, size: 1, xValue : hourBlockElement?.offsetLeft ?  hourBlockElement.offsetLeft : 0}
        return hourBlock;
    });

    const hourBlock = document.getElementById(`${level}_${STARTING_HOUR}_block`);
    const width = hourBlock?.getBoundingClientRect().width ? hourBlock.getBoundingClientRect().width : 0;
    setHourBlockWidth(width);
    setWorkingHours(listWithRenderedXValues);
  }, []);

  useEffect(() => {
    const blockedHoursList = blockedHours.map((val: HourBlock) => {        
        const hourBlock :HourBlock = {hour: val.hour, size: 1, xValue : evaluateXPosition(val.hour)}
        return hourBlock;
    });
    setBlockedHoursList(blockedHoursList);
  }, [hourBlockWidth]);

  const evaluateXPosition = (hour: number) => {
      return (hour - STARTING_HOUR) * hourBlockWidth;
  }
  return (
    <>
        <div className="DayBlockWrapper">
        <div className="Opaque" style={{display: isCompleted ? '' : 'none'}}></div>
            <div className="DayBlock">
                {workingHours.map((val: HourBlock) => 
                    <div className="HourBlock" key={val.hour} id={`${level}_${val.hour}_block`}>
                        {val.hour}
                    </div>
                )}
            </div>
            <div className="ScheduleBlocks">
              {blockedHoursList.map((block: HourBlock) => {
                  return (<div key={`${level}_${block.hour}`} className="BlockedHour" style={{left : `${block.xValue}px`, width:`${hourBlockWidth*block.size}px`,position:"absolute",backgroundColor:"gray", height:"4vw"}}></div>)
                  })}
                  <ScheduleBlock 
                    isLevelComplete={isCompleted} 
                    size={userBlockSize} 
                    winningHours={winningHours} 
                    startingHour={STARTING_HOUR} 
                    blockedHours={blockedHoursList}
                    startingX={evaluateXPosition(initialHour)} 
                    hourPixelWidth={hourBlockWidth}/>
            </div>
            <div>Schedule Slot Size: {gapSize}</div>
        </div>
    </>
  );
}

export default DayBlock;
