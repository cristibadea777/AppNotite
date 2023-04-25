import * as React from "react";
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material"
import { Add, Archive, Delete, Edit, Search, Settings } from "@mui/icons-material"
import notitaService from '../services/NotitaService'; // importare serviciu ce populeaza listaNotite

//modale ~~~~~~~~~~~~~~~~~
import ModalCreareNotita from  '../components/modals/ModalCreareNotita'
import ModalEditareNotita from '../components/modals/ModalEditareNotita'

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

//content ce se transmite catre ModalEditareNotita - initial va fi textul notitei curente, pe care s-a facut click, stabilit in handleRowClick
const [content, setContent] = useState(null) 
const [contentTitlu, setContentTitlu] = useState(null) 


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
    setContent(listaNotite[index].textNotita) //setare content prima oara
    setContentTitlu(listaNotite[index].titlu)
}

//MODALE
//modal creare
const [isOpenModalCreareNotita, setIsOpenModalCreareNotita] = useState(false);
const ToggleModalCreareNotita = () => setIsOpenModalCreareNotita( ! isOpenModalCreareNotita);
//modal editare
const [isOpenModalEditareNotita, setIsOpenModalEditareNotita] = useState(false);
const ToggleModalEditareNotita = () => setIsOpenModalEditareNotita( ! isOpenModalEditareNotita);
//MODALE

//functie ce va actiona atunci cand dam click pe butonul de Edit (dupa ce se selecteaza o notita, pt a avea variabila notita curenta ne-nulla)
const handleOpenModalEditare = () => {            
    ToggleModalEditareNotita() //deschidere modal prin schimbare variabila de stare, din starea initiala false, in true cu functia de toggle ce inverseaza valoarea
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
                    notitaService={notitaService} 
                    updateFlag={updateFlag}         setUpdateFlag={setUpdateFlag}
                    content={content}               setContent={setContent}
                    contentTitlu={contentTitlu}     setContentTitlu={setContentTitlu}
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

                    <div 
                        style={{ 
                            marginLeft: '2vh', marginRight: '0.5vh', color: 'white', overflowWrap: 'break-word', wordWrap: 'break-word', wordBreak: 'break-word', 
                            whiteSpace: 'pre-wrap', border: '1px solid #1e1e1e', padding: '1em', textAlign: 'justify',height: '77vh', overflow: 'auto'
                        }}
                    >
                        {notitaCurenta.textNotita}
                    </div>
                </div>
            ) : null
        }
        </>

    </div>
)

}
export default TabelNotite;