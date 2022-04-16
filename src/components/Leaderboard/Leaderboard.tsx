import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Score } from "../../data/interfaces";
import { selectIsGameComplete, selectRecordedPoints } from "../../features/game/gameSlice";
import { pushScore, selectLeaderboard } from "../../features/game/leaderboardSlice";
import './Leaderboard.css';

function Leaderboard(props :any) {
  const {enabled} = props;
  const [displayScoreEntry, setDisplayScoreEntry] = useState<boolean>(false);
  const [inputName, setInputName] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const gameCompleted = useAppSelector(selectIsGameComplete);
  const leaderBoardScores = useAppSelector(selectLeaderboard);
  const totalPoints = useAppSelector(selectRecordedPoints);

  const dispatch = useAppDispatch();

  //it's a work event but just in case...
  const noNoWords = ['ass', 'cum', 'fag', 'gay', 'god', 'tit', 'f4g', 'g0d', 'a55', 'as5', 'a5s'];

  useEffect(() => {
    let highScoreFound = false;
    if(leaderBoardScores.length < 5){
        highScoreFound = true;
    }else{
        leaderBoardScores.forEach((score : Score) => {
            if(totalPoints > score.score){
                highScoreFound = true;
                return;
            }
        })
    }
    setDisplayScoreEntry(highScoreFound);
}, [gameCompleted]);
  const handleScoreSubmit = () => {
    if(noNoWords.includes(inputName.toLowerCase())){
        window.alert("let's try another name...");
    }
    else{
        setSubmitted(true);
        dispatch(pushScore({name: inputName, score: totalPoints}));
    }
  }

  const handleInputChange = (evt : any) => {
    const regex = /^([a-zA-Z0-9])*$/i;
        if (evt.target.value === '' || regex.test(evt.target.value)) {
          setInputName(evt.target.value);
        }
  }

  return enabled ? (
    <div className="Leaderboard">
        <Typography variant="h5">Leaderboard</Typography>
        {displayScoreEntry && 
        <>
          <div style={{padding: '5px'}}>You made the Top 5!</div>
          <div className="EntryForm">
              <TextField style={{textAlign:'center'}} variant="outlined" type="" onChange={(evt) => handleInputChange(evt)} value={inputName} inputProps={{maxLength: 3, type: "text", onkeypress: 'return ((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode == 32))', style: {textAlign: 'center'}}}></TextField>
              <div style={{paddingTop:'5px'}}><Button variant="outlined" disabled={inputName.length < 3 || submitted} onClick={handleScoreSubmit}>Submit</Button></div>
          </div>
        </>
        }
        {leaderBoardScores.map((score : Score, i) => 
            <div className="ScoreEntry">
                <div><b>{i+1}.</b></div>
                <div><b>Name: </b> {score.name}</div>
                <div><b>Score: </b> {score.score}</div>
            </div>
        )}
    </div>
  ) : <></>;
}

export default Leaderboard;
