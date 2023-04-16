
import './App.css';
import Appbar from './components/Appbar';
import TabelNotite from './components/TabelNotite';

function App() {
  return (
    <div className="App">
      <Appbar/>
      <div style={{display: 'flex'}}>
        <div style={{width: '25%'}}>
          {}
        </div>
        <div style={{width: '50%'}}>
          <TabelNotite />
        </div>
        <div style={{width: '25%'}}>
          {}
        </div>
      </div>
    </div>
  );
}

export default App;
