import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import {initialLevelsState} from '../../data/levels'
import {Level} from '../../data/interfaces';
import { RootState } from '../../app/store';
import { timerActions } from '../../components/Timer/Timer';

export interface GameState {
  levels: Level[];
  gameStarted : Boolean;
  gameCompleted : Boolean;
  currentLevel : number;
  timerAction : timerActions;
  points : number;
  collisionBlocks : number[]
}

const initialState: GameState = {
  levels: initialLevelsState,
  gameStarted : false,
  gameCompleted : false,
  currentLevel: 0,
  timerAction : timerActions.STOP,
  points : 0,
  collisionBlocks : []
};


export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    begin: (state) => {
      state.levels[state.currentLevel].active = true;
      state.collisionBlocks = state.levels[state.currentLevel].collisionBlocks;
      state.gameStarted = true;
      state.timerAction = timerActions.START;
    },
    end: (state) => {
      state.gameCompleted = true;
      state.timerAction = timerActions.STOP;
    },
    goHome: (state) => {
      state.timerAction = timerActions.RESET;
      state.gameCompleted = false;
      state.levels.forEach((level) => {
        level.active = false;
        level.completed = false;
      })
      state.currentLevel = 0;
      state.collisionBlocks = state.levels[state.currentLevel].collisionBlocks;
      state.gameStarted = false;
    },
    //TODO: this isn't working and I have no time to fix :(
    // restart: (state) => {
    //   state.timerAction = timerActions.RESET;
    //   state.gameCompleted = false;
    //   state.levels.forEach((level) => {
    //     level.active = false;
    //     level.completed = false;
    //   })
    //   state.currentLevel = 0;
    //   state.levels[state.currentLevel].active = true;
    //   state.collisionBlocks = state.levels[state.currentLevel].collisionBlocks;
    //   state.gameStarted = true;
    // },
    recordPoints: (state, action : PayloadAction<number>) => {
      state.points = action.payload;
    },
    completeLevel: (state) => {
        state.levels[state.currentLevel].active = true;
        state.levels[state.currentLevel].completed = true;
        if(state.currentLevel < state.levels.length -1){
          state.currentLevel += 1;
          state.collisionBlocks = state.levels[state.currentLevel].collisionBlocks;
          state.levels[state.currentLevel].active = true;
        }
        else{
          state.timerAction = timerActions.STOP;
          state.gameCompleted = true;
        }
    },
    updateCollisionBlocks: (state, action: PayloadAction<number[]>) => {
      state.collisionBlocks = action.payload;
    },
    shuffleLevels: (state) => {
      let currentIndex = state.levels.length,  randomIndex;
      while (currentIndex !== 0) {
    
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [state.levels[currentIndex], state.levels[randomIndex]] = [
        state.levels[randomIndex], state.levels[currentIndex]];
      }
    }
  },
});

export const { begin, end, completeLevel, recordPoints, goHome, shuffleLevels } = gameSlice.actions;

export const selectIsGameStarted = (state: RootState) => state.game.gameStarted;
export const selectIsGameComplete = (state: RootState) => state.game.gameCompleted;
export const selectLevels = (state: RootState) => state.game.levels;
export const selectTimerStatus = (state: RootState) => state.game.timerAction;
export const selectRecordedPoints = (state: RootState) => state.game.points;
export const selectCollisionBlocks = (state: RootState) => state.game.collisionBlocks;


export default gameSlice.reducer;
