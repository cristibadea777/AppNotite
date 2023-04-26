import * as React from "react";
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material"
import { Add, Archive, Delete, Edit, Search, Settings } from "@mui/icons-material"
import notitaService from '../services/NotitaService'; // importare serviciu ce populeaza listaNotite

//modale ~~~~~~~~~~~~~~~~~
import ModalCreareNotita   from './modals/ModalCreareNotita'
import ModalEditareNotita  from './modals/ModalEditareNotita'
import ModalStergereNotita from './modals/ModalStergereNotita'

const butoane1 = { backgroundColor: '#1e1e1e', color: 'cyan', border: '1px solid black', fontSize: '2vh',  marginLeft: '3vh' }

const TabelNotite = () => {

//initializare lista notita ca fiind o lista goala utilizand hook-ul useState si populare prin apelarea serviciului
const [listaNotite, setListaNotite] = useState([])

//variabila de stare ce va declansa hook-ul useEffect pt a updata listaNotite sau seta anumite stari 
//fiecare flag va declansa un anumit useEffect atunci cand se creaza/editeaza/sterge 

//--- flag pentru Editare
const [updateFlag, setUpdateFlag] = useState(false);
//--- flag pentru Stergere
const [deleteFlag, setDeleteFlag] = useState(false);
//--- flag pentru Creare
const [createFlag, setCreateFlag] = useState(false);

//content ce se transmite catre ModalEditareNotita - initial va fi textul notitei curente, pe care s-a facut click, stabilit in handleRowClick
const [content, setContent] = useState(null) 
const [contentTitlu, setContentTitlu] = useState(null) 

//notita curenta (cu ea lucram pt afisare text notita, PUT, DELETE, etc)
const [notitaCurenta, setNotitaCurenta] = useState(null)

//hook React
//prima oara ruleaza cand se monteaza componenta (cand se instantiaza componenta si se insereaza in DOM - Document Object Model) 
//prima oara, useEffect ruleaza indiferent de starea updateFlag
//apoi, de fiecare data cand updateFlag isi schimba valoarea din false in true, se porneste hook-ul
useEffect(() => 
    {
        notitaService.getNotite()
        .then(response => {
            setListaNotite(response.data)
        })
        .catch(error => {
            console.error(error)
        });

    }, [updateFlag]
)

//useEffect pt createFlag si deleteFlaf. dupa ce se creaza notita, se da refresh listei, SI notita curenta se va seta cu ultima notita din lista (cea creata)
//la startul aplicatiei se va afisa si ultima notita salvata (daca vreau sa scot asta, pun if(createFlag) sau modificat in useEffect la deleteFlag sa nu tina cont)
//cand se updateaza o notita, numarul de notite nu se schimba, ramane aceeasi notita curenta
//dar cand se creaza o notita noua, trebuie sa se seteze notita curenta cu ultima notita (ultima = cea creata)
useEffect(() => 
    {
        notitaService.getNotite()
        .then(response => {
            //refresh lista notite
            setListaNotite(response.data) 
            //setare notita curenta si content initial 
            //setam starea aici si nu in modal in .then dupa ce se creaza notita, pt ca setarea starii cu setState este asincrona iar 
            //modificarile starii nu vor avea efect imediat, este o "promisiune"
            //de asta se seteaza in useEffect 
            if(response.data){
                const index = response.data.length - 1
                setNotitaCurenta(response.data[index])
                setContent      (response.data[index].textNotita) 
                setContentTitlu (response.data[index].titlu)
            }
        })
        .catch(error => {
            console.error(error);
        });

    }, [createFlag]
)

//useEffect pt deleteFlag. notitaCurenta se sterge, nu se seteaza alta in locul ei, userul trebuie sa aleaga alta pt a se seta
useEffect(() => 
    {
        notitaService.getNotite()
        .then(response => {
            //refresh lista notite
            setListaNotite(response.data) 
            //stergere content si notitaCurenta, daca s-a facut o stergere (useEffect la startup se cheama indiferent daca deleteFlag e false)
            if(deleteFlag){
                setNotitaCurenta(null)
                setContent      (null) 
                setContentTitlu (null)   
                setDeleteFlag(! deleteFlag) //setare inapoi in false
            }
        })
        .catch(error => {
            console.error(error);
        });

    }, [deleteFlag]
)


//functie folosita la setarea notitei curente pt afisarea notitei in div
//se activeaza atunci cand se da click pe o linie a tabelului, evenimentul este definit in tabel cu onClick pt tableRow
const handleRowClick = (index) => {
    setNotitaCurenta(listaNotite[index])
    setContent(listaNotite[index].textNotita) //setare content prima oara
    setContentTitlu(listaNotite[index].titlu)
}

//MODALE ~~~~~~~
//deschidere modal prin schimbare variabila de stare, din starea initiala false, in true cu functia de toggle, chemata de onClick, ce inverseaza valoarea
//modalul are ca argument pt atributul modalului "open" valoarea variabilei de stare, cand e pe true se deschide.
//daca vrem ca pe langa deschiderea modalului sa mai facem si altceva, punem functia de Toggle inauntrul unui alte functii de handle...si o chemam la onClick
//modal creare
const [isOpenModalCreareNotita, setIsOpenModalCreareNotita] = useState(false)
const ToggleModalCreareNotita = () => setIsOpenModalCreareNotita( ! isOpenModalCreareNotita)
//modal editare
const [isOpenModalEditareNotita, setIsOpenModalEditareNotita] = useState(false)
const ToggleModalEditareNotita = () => setIsOpenModalEditareNotita( ! isOpenModalEditareNotita)
//modal stergere
const [isOpenModalStergereNotita, setIsOpenModalStergereNotita] = useState(false)
const ToggleModalStergereNotita = () => setIsOpenModalStergereNotita(! isOpenModalStergereNotita)
//~~~~~~~


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
                    notitaService={notitaService} 
                    createFlag={createFlag}         setCreateFlag={setCreateFlag}
                />

                <ModalStergereNotita
                    show={isOpenModalStergereNotita} close={ToggleModalStergereNotita}
                    notitaService={notitaService}
                    deleteFlag={deleteFlag}          setDeleteFlag={setDeleteFlag}
                    notitaCurenta={notitaCurenta}
                />

                        
            </TableContainer>
        </div>
        
        <>
        {
            notitaCurenta ? (
                <div style={{width: '70vw'}}>

                    <div style={{display: 'flex', justifyContent: 'right', alignItems: 'center', height:'10vh', marginLeft: '3vh', marginRight: '0.5vh', marginBottom: '0.5vh', flexWrap: 'wrap'}}>
                        <Button onClick={ () => ToggleModalEditareNotita() } variant="contained" style={{...butoane1}}><Edit     style={{ color: "blue"   }} /></Button>
                        <Button variant="contained" style={{...butoane1}}><Archive  style={{ color: "yellow" }} /></Button>
                        <Button onClick={ ()=>  ToggleModalStergereNotita() } variant="contained" style={{...butoane1}}><Delete   style={{ color: "red"    }} /></Button>
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