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
      //TODO: randomize level order?
      state.gameCompleted = false;
      state.levels.forEach((level) => {
        level.active = false;
        level.completed = false;
      })
      state.currentLevel = 0;
      state.collisionBlocks = state.levels[state.currentLevel].collisionBlocks;
      state.gameStarted = false;
    },
    restart: (state) => {
      state.timerAction = timerActions.RESET;
      //TODO: randomize level order?
      state.gameCompleted = false;
      state.levels.forEach((level) => {
        level.active = false;
        level.completed = false;
      })
      state.currentLevel = 0;
      state.levels[state.currentLevel].active = true;
      state.collisionBlocks = state.levels[state.currentLevel].collisionBlocks;
      state.gameStarted = true;
    },
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
      while (currentIndex != 0) {
    
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [state.levels[currentIndex], state.levels[randomIndex]] = [
        state.levels[randomIndex], state.levels[currentIndex]];
      }
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
//   extraReducers: (builder) => {
//     builder
//       .addCase(incrementAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(incrementAsync.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.value += action.payload;
//       });
//   },
});

export const { begin, end, completeLevel, restart, recordPoints, goHome, shuffleLevels } = gameSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectIsGameStarted = (state: RootState) => state.game.gameStarted;
export const selectIsGameComplete = (state: RootState) => state.game.gameCompleted;
export const selectLevels = (state: RootState) => state.game.levels;
export const selectTimerStatus = (state: RootState) => state.game.timerAction;
export const selectRecordedPoints = (state: RootState) => state.game.points;
export const selectCollisionBlocks = (state: RootState) => state.game.collisionBlocks;


// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount: number): AppThunk => (
//   dispatch,
//   getState
// ) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
//};

export default gameSlice.reducer;
