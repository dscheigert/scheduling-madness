import { useState, useEffect} from "react";
import Draggable from "react-draggable"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { completeLevel, selectCollisionBlocks, selectIsGameComplete } from "../../features/game/gameSlice";
import './ScheduleBlock.css';

function ScheduleBlock(props : any) {
    const gameCompleted = useAppSelector(selectIsGameComplete);
    const masterCollideBlocks = useAppSelector(selectCollisionBlocks);

    const {hourPixelWidth, startingX, size, startingHour, winningHours, isLevelComplete} = props;
    const [chosenHour, setChosenHour] = useState(0);
    const [controlledPosition, setControlledPosition] = useState({x:0, y:0});
    const [collision, setCollision] = useState(false);
    const [collideBlocks, setCollideBlocks] = useState(masterCollideBlocks);
    const dispatch = useAppDispatch();

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

    const updateCollideBlocks = () => {
        let blockList : number[] = [];
        blockList.push.apply(blockList,masterCollideBlocks);
        masterCollideBlocks.forEach((block) => {
            for(let i=0; i<size; i++){
                blockList.push(block - i)
            }
        })
        setCollideBlocks(blockList);
    }

    const evaluateColor = (isLevelComplete : Boolean, collision : Boolean) => {
        if(collision){
            return 'Collision';
        }
        else {
            return isLevelComplete ? 'Correct' : 'Default';
        }
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
        if(collideBlocks.includes(chosenHour)){
            setCollision(true);
        }else{
            setCollision(false);
        }
    },[chosenHour]);

    useEffect(() => {
        updateCollideBlocks();
        setControlledPosition({x:startingX, y:0})
    },[props.startingX]);

    return (
        <Draggable scale={1} disabled={isLevelComplete} bounds="parent" onStop={handleStop} position={controlledPosition}>

            <div className={`DraggableBlock  ${evaluateColor(isLevelComplete, collision)}`} style={{ width: `${(hourPixelWidth * size)}px`}}></div>
        </Draggable>
    );
}
export default ScheduleBlock;