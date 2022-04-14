import { useEffect, useState } from "react";
import { HourBlock } from "../data/interfaces";
import ScheduleBlock from "./ScheduleBlock";

function DayBlock(props :any) {
  const {initialHour, blockedHours, workingHours, userBlockSize, level, winningHours, isCompleted} = props;
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
    <div className="DayBlockWrapper" style={{width:'100%', margin:'auto', position: 'relative'}}>
        <div className="DayBlock" style={{border: '.25px solid black', display:'flex', height: '2vw', width:'100%', textAlign: 'left'}}>
            {workingHours.map((val: HourBlock) => 
                <div key={val.hour} id={`${level}_${val.hour}_block`} style={{border: '.5px solid black', width: `100%`, height:'inherit', display:'inline-flex', textAlign: 'center'}}>
                    {val.hour}
                </div>
            )}
        </div>
        <div className="DayBlock" style={{width: '100%', border: '.25px solid red', height: '4vw', position:'relative'}}>
        {blockedHoursList.map((block: HourBlock) => {
            return (<div className="BlockedHour" style={{left : `${block.xValue}px`, border: '.5px solid black', width:`${hourBlockWidth*block.size}px`,position:"absolute",backgroundColor:"gray", height:"4vw"}}></div>)
            })}
            <ScheduleBlock 
              isLevelComplete={isCompleted} 
              size={userBlockSize} 
              winningHours={winningHours} 
              initialHour={initialHour} 
              startingHour={STARTING_HOUR} 
              startingX={evaluateXPosition(initialHour)} 
              hourPixelWidth={hourBlockWidth}/>
        </div>
    </div>
  );
}

export default DayBlock;
