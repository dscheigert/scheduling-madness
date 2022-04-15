import './App.css';
import Calendar from './components/Calendar/Calendar';
import { useAppSelector } from './app/hooks';
import { selectIsGameStarted, selectLevels } from './features/game/gameSlice';
import HowTo from './components/HowTo/HowTo';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  const levels = useAppSelector(selectLevels);
  const gameActive = useAppSelector(selectIsGameStarted);
  return (
    <div className="App" style={{textAlign: 'center'}}>
      <Header/>
      <HowTo active={!gameActive}/>
      <Calendar levels={levels}/>
      <Footer/>
    </div>
  );
}

export default App;
