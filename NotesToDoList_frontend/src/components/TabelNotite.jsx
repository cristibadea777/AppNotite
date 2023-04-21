import * as React from "react";
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { Add, Archive, Delete, Edit, Search, Settings } from "@mui/icons-material";
import notitaService from '../services/NotitaService'; // importare serviciu ce populeaza listaNotite
import sanitizeHtml from "sanitize-html"
import ContentEditable from 'react-contenteditable';
//modale ~~~~~~~~~~~~~~~~~
import ModalCreareNotita from  '../components/modals/ModalCreareNotita';
import ModalEditareNotita from '../components/modals/ModalEditareNotita';

const butoane1 = { backgroundColor: '#1e1e1e', color: 'cyan', border: '1px solid black', fontSize: '2vh',  marginLeft: '3vh' }


const TabelNotite = () => {

//initializare lista notita ca fiind o lista goala utilizand hook-ul useState si populare prin apelarea serviciului
const [listaNotite, setListaNotite] = useState([])

//variabila de stare ce va declansa hook-ul useEffect pt a updata listaNotite 
//fiecare flag va declansa o anumita functie de creare/editare/stergere (exemplu - updateFlag declanseaza functia de update a modalului ModalEditareNotita)  
//--- pentru Editare
const [updateFlag, setUpdateFlag] = useState(false);
//--- pentru Stergere
//const [deleteFlag, setDeleteFlag] = useState(false);
//--- pentru Creare
//const [createFlag, setCreateFlag] = useState(false);


//notita curenta (cu ea lucram pt afisare text notita, PUT, DELETE, etc)
const [notitaCurenta, setNotitaCurenta] = useState(null)

//hook React
//prima oara ruleaza cand se monteaza componenta (cand se instantiaza componenta si se insereaza in DOM - Document Object Model) 
//prima oara, useEffect ruleaza indiferent de starea updateFlag
//apoi, de fiecare data cand updateFlag isi schimba valoarea din false in true, se porneste hook-ul
useEffect(() => {
    notitaService.getNotite()
    .then(response => {
        setListaNotite(response.data);
    })
    .catch(error => {
        console.error(error);
    });
}, [updateFlag]
)

//functie folosita la setarea notitei curente pt afisarea notitei in div
//se activeaza atunci cand se da click pe o linie a tabelului, evenimentul este definit in tabel cu onClick pt tableRow

const handleRowClick = (index) => {
    setNotitaCurenta(listaNotite[index])
    setContent(listaNotite[index].textNotita)
}

//MODALE
//modal creare
const [isOpenModalCreareNotita, setIsOpenModalCreareNotita] = useState(false);
const ToggleModalCreareNotita = () => setIsOpenModalCreareNotita( ! isOpenModalCreareNotita);
//modal editare
const [isOpenModalEditareNotita, setIsOpenModalEditareNotita] = useState(false);
const ToggleModalEditareNotita = () => setIsOpenModalEditareNotita( ! isOpenModalEditareNotita);
//MODALE

const [content, setContent] = useState(null)

useEffect(() => {
    const sanitizeConf = {
        allowedTags: ["b", "i", "a", "p"],
        allowedAttributes: { a: ["href"] }
    };
}, [content]
)


//functie ce va actiona atunci cand dam click pe butonul de Edit (dupa ce se selecteaza o notita, pt a avea variabila notita curenta ne-nulla)
const handleOpenModalEditare = () => {            
    setTextNotitaNou(content)
    ToggleModalEditareNotita() //deschidere modal prin schimbare variabila de stare, din starea initiala false, in true cu functia de toggle ce inverseaza valoarea
}

//variabila de stare pt textul introdus de utilizator in campul editabil al text notita, se va seta pt notita curenta in server-side  
const [textNotitaNou, setTextNotitaNou] = useState(null)

//componenta care va afisa textul notitei, sub forma de <div>
//se re-randeaza automat cand se schimba starea notitaCurenta, pentru ca variabila interna de stare 'content' depinde de ea 
const CampTextNotita = ( {content} ) => {

    //functie pt manipularea apasarii TAB si ENTER     
    const handleKeyDown = (evt) => {
        if (evt.keyCode === 9) {
            //key code pt TAB este 9. atunci cand useru apasa TAB, se insereaza 4 space-uri
            evt.preventDefault();
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0")
            range.insertNode(tabNode);
            range.setStartAfter(tabNode);
            range.setEndAfter(tabNode);
            selection.removeAllRanges();
            selection.addRange(range);
        }
        else if (evt.keyCode === 13) {
            //key code pt ENTER este 13. atunci cand useru apasa ENTER, se insereaza '\n' 
            //whiteSpace: 'pre-wrap' la table cell -- altfel nu merge
            evt.preventDefault();
            const selection = window.getSelection()
            const range = selection.getRangeAt(0)
            const textNode = document.createTextNode("\n")
            range.insertNode(textNode)
            range.setStartAfter(textNode)
            range.setEndAfter(textNode)
            selection.removeAllRanges()
            selection.addRange(range)
        }   
    }

    //componenta returnata sub forma de div cu un element interior de tip ContentEditable
    return (
        <ContentEditable 
            html={content}//inner html
            onKeyDown={handleKeyDown}
            tagName="div"             //ContentEditable va fi sub forma de div
            style={{ 
                marginLeft: '2vh', marginRight: '0.5vh', color: 'white', overflowWrap: 'break-word', wordWrap: 'break-word',
                wordBreak: 'break-word', whiteSpace: 'pre-wrap', border: '1px solid #1e1e1e', padding: '1em', textAlign: 'justify',
                height: '77vh', overflow: 'auto'
            }}
        />
    )
}


return (
    <div style={{display: 'flex'}}>

        <div style={{width: '30vw'}}>

            <div style={{height: '10vh', display:'flex', alignItems: 'center', justifyContent:'left', flexWrap: 'wrap', marginBottom: '0.5vh'}}>
                <Button variant="contained" style={{...butoane1, marginLeft: '0.5vh'}}><Search style={{ color: 'white' }} /></Button>
                <Button variant="contained" onClick ={ () => ToggleModalCreareNotita() } style={{...butoane1, marginLeft: '0.5vh'}}><Add style={{ color: 'white' }} /></Button>
            </div>

            <TableContainer component={Paper} style={{ backgroundColor: '#1e1e1e', height: '81vh', overflowY: 'auto', overflowX: 'hidden', whiteSpace: 'nowrap', marginLeft: '0.5vh',}}>
                <Table>
                    <TableHead>
                    </TableHead>
                    <TableBody>
                        {listaNotite.map((notita, index) => (
                            <React.Fragment key={notita.notitaId}>
                                <TableRow onClick={ () => handleRowClick(index) }>
                                    <TableCell style={{ color: 'white', border: 'none', overflow: 'hidden',  }}>
                                        <div style={{display: 'flex', flexDirection: 'column'}}>
                                            <div>
                                                <h3>{notita.titlu}</h3>
                                            </div> 
                                            <div style={{width: '100%'}}>
                                                <div style={{display:'flex', justifyContent:'left', flexWrap: 'wrap'}}>
                                                    <small style={{marginRight:'2.7vh'}}>Creat:</small> 
                                                    <small> {notita.dataScriere} </small>
                                                </div>
                                                <div style={{display:'flex', justifyContent:'left', flexWrap: 'wrap'}}>
                                                    <small style={{marginRight:'0.5vh'}}>Modificat:</small>
                                                    <small> {notita.dataModificare} </small>
                                                </div> 
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            
                <ModalEditareNotita
                    show={isOpenModalEditareNotita} close={ToggleModalEditareNotita} 
                    notitaCurenta={notitaCurenta}   setNotitaCurenta={setNotitaCurenta} 
                    textNotitaNou={textNotitaNou}   notitaService={notitaService} 
                    updateFlag={updateFlag}         setUpdateFlag={setUpdateFlag}
                />
            
                <ModalCreareNotita  
                    show={isOpenModalCreareNotita}  close={ToggleModalCreareNotita} 
                />
            
            </TableContainer>
        </div>
        
        <>
        {
            notitaCurenta ? (
                <div style={{width: '70vw'}}>

                    <div style={{display: 'flex', justifyContent: 'right', alignItems: 'center', height:'10vh', marginLeft: '3vh', marginRight: '0.5vh', marginBottom: '0.5vh', flexWrap: 'wrap'}}>
                        <Button onClick={ () => handleOpenModalEditare() } variant="contained" style={{...butoane1}}><Edit     style={{ color: "blue"   }} /></Button>
                        <Button variant="contained" style={{...butoane1}}><Archive  style={{ color: "yellow" }} /></Button>
                        <Button variant="contained" style={{...butoane1}}><Delete   style={{ color: "red"    }} /></Button>
                        <Button variant="contained" style={{...butoane1}}><Settings style={{ color: "white"  }} /></Button>
                    </div>

                    <div>
                        <CampTextNotita content={content}/>
                    </div>
                </div>
            ) : null
        }
        </>

    </div>
)

}
export default TabelNotite;