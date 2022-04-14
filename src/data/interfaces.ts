export interface HourBlock {
  hour: number;
  xValue: number;
  size: number;
}

export interface Level {
  workingHours: HourBlock[];
  blockedHours: HourBlock[];
  collisionBlocks: number[];
  initialHour: number;
  userBlockSize: number;
  winningHours : number[];
  active : Boolean;
  completed : Boolean;
}