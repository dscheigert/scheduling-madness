import './App.css';
import Calendar from './components/Calendar/Calendar';
import { useAppSelector } from './app/hooks';
import { selectLevels } from './features/game/gameSlice';
import HowTo from './components/HowTo/HowTo';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  const levels = useAppSelector(selectLevels);
  return (
    <div className="App" style={{textAlign: 'center'}}>
      {/* <HowTo/> */}
      <Header/>
      <Calendar levels={levels}/>
      <Footer/>
    </div>
  );
}

export default App;
