import React, { useState, useEffect} from "react";
import Draggable from "react-draggable"
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { completeLevel, selectIsGameComplete } from "../features/game/gameSlice";

function ScheduleBlock(props : any) {
    const {hourPixelWidth, startingX, size, initialHour, startingHour, winningHours, isLevelComplete} = props;
    const [chosenHour, setChosenHour] = useState(initialHour);
    const [controlledPosition, setControlledPosition] = useState({x:0, y:0});
    const [isCorrect, setIsCorrect] = useState(false);
    const dispatch = useAppDispatch();

    const gameCompleted = useAppSelector(selectIsGameComplete);

    const handleStop = (e : any,ui : any) => {
        //TODO: evaluate # of gaps
        const snapDistance = ui.x % hourPixelWidth;
        let xOffset = 0;
        xOffset = snapDistance >  (hourPixelWidth / 2) ? (hourPixelWidth - snapDistance) : (-snapDistance);
        setControlledPosition({x: ui.x + xOffset, y:0})
    }
    const evaluateHourForXValue = (xValue : number) => {
        return (xValue/hourPixelWidth) + startingHour;
    }
    useEffect(() => {
        if(!isNaN(controlledPosition.x)){
            setChosenHour(evaluateHourForXValue(controlledPosition.x));
        }
    },[controlledPosition]);

    useEffect(() => {
        //reset on completion
        if(gameCompleted){
            setControlledPosition({x:startingX, y:0})
        }
    },[gameCompleted]);
    
    useEffect(() => {
        if(winningHours.includes(chosenHour)){
            dispatch(completeLevel());
        }
        setIsCorrect(winningHours.includes(chosenHour));
    },[chosenHour]);
    useEffect(() => {
        setControlledPosition({x:startingX, y:0})
    },[props.startingX]);
    return (
        <Draggable scale={1} disabled={isLevelComplete} bounds="parent" onStop={handleStop} position={controlledPosition}>
            <div style={{border: '.5px solid black', backgroundColor:`${isLevelComplete ? 'green' : 'orange'}`, width: `${(hourPixelWidth * size)}px`, height: '4vw'}}></div>
        </Draggable>
    );
}
export default ScheduleBlock;