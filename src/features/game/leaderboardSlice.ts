import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Score} from '../../data/interfaces';
import { RootState } from '../../app/store';

export interface LeaderboardState {
  scores: Score[];
}

const retrieveInitialLeaderboard = () => {
    let scoreState : LeaderboardState = {scores: []}
    const scoreString  = localStorage.getItem('scores') ? localStorage.getItem('scores') : '';
    if(scoreString){
        //@ts-ignore
        scoreState = {scores: JSON.parse(scoreString)};
    }
    return scoreState;
}

const initialState = retrieveInitialLeaderboard();

export const leaderBoardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    pushScore: (state, payload :PayloadAction<Score>) => {
        state.scores.push(payload.payload);
        state.scores.sort(function (a: { score: number; }, b: { score: number; }) {
            return b.score - a.score;
        })
        //only really need top 5
        if(state.scores.length > 5){
            state.scores.pop();
        }
        console.log(JSON.stringify(state.scores));
        localStorage.setItem('scores', JSON.stringify(state.scores))
    }
  },
});

export const { pushScore } = leaderBoardSlice.actions;

export const selectLeaderboard = (state: RootState) => state.leaderboard.scores;

export default leaderBoardSlice.reducer;
