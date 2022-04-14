import { Level, HourBlock } from "./interfaces"


const evaluateWorkingHours = (dayLength : number, startingHour : number) => {
    let workingHours : HourBlock[] = [];
    for(let i=0;i<dayLength;i++){
        workingHours.push({hour: i+startingHour, xValue: 0, size: 1})
    }
    return workingHours;
}

export const initialLevelsState : Level[] = [{
    workingHours : evaluateWorkingHours(12, 8),
    blockedHours : [{hour: 12, size:1, xValue:0}],
    collisionBlocks : [12],
    userBlockSize : 3,
    initialHour : 14,
    winningHours : [13,15,17],
    active : false,
    completed : false, 
    gapSize : 2
},
{
    workingHours : evaluateWorkingHours(14, 10),
    blockedHours : [{hour: 12, size:1, xValue:0}, {hour: 18, size:1, xValue:0}, {hour: 19, size:1, xValue:0}],
    collisionBlocks : [12,18,19],
    userBlockSize : 3,
    initialHour : 21,
    winningHours : [13, 15],
    active : false,
    completed : false,
    gapSize : 2
},
{
    workingHours : evaluateWorkingHours(18, 8),
    blockedHours : [{hour: 8, size:1, xValue:0},{hour: 12, size:1, xValue:0},{hour: 15, size:1, xValue:0},{hour: 16, size:1, xValue:0},{hour: 17, size:1, xValue:0}, {hour: 18, size:1, xValue:0}, {hour: 19, size:1, xValue:0}],
    collisionBlocks : [8,12,15,16,17,18,19],
    userBlockSize : 2,
    initialHour : 22,
    winningHours : [13],
    active : false,
    completed : false,
    gapSize : 3
}
]