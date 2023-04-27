
import './App.css'
import Appbar from './components/Appbar'
import TabelNotite from './components/TabelNotite'
import { useState } from 'react'

const App = () => {

  //selectare lista notite arhivate
  //false = notite active; true = notite activate
  //in Appbar se seteaza valoarea pentru variabila de stare, utilizand functia ei, cu valoarea de adevar din Select
  //variabila de stare se schimba peste tot, se sincronizeaza si in TabelNotite, care primeste variabila de stare ca props 
  const [optiuneNotiteArhivate, setOptiuneNotiteArhivate] = useState(false)

  return (
    <div className="App">
      <Appbar setOptiuneNotiteArhivate={setOptiuneNotiteArhivate} />
      <TabelNotite optiuneNotiteArhivate={optiuneNotiteArhivate}  /> 
    </div>
  )

}

export default App
