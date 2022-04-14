import './App.css';
import Calendar from './components/Calendar/Calendar';
import { useAppSelector } from './app/hooks';
import { selectLevels } from './features/game/gameSlice';
import HowTo from './components/HowTo/HowTo';

function App() {
  const levels = useAppSelector(selectLevels);
  return (
    <div className="App" style={{textAlign: 'center'}}>
      {/* <HowTo/> */}
      <Calendar levels={levels}/>
    </div>
  );
}

export default App;
