
import './App.css';
import Appbar from './components/Appbar';
import TabelNotite from './components/TabelNotite';

function App() {
  return (
    <div className="App">
      <Appbar/>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{width: '75%'}}>
          <TabelNotite />
        </div>
      </div>
    </div>
  );
}

export default App;
