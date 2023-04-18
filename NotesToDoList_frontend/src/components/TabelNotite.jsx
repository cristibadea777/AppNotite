import * as React from "react";
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Modal, Button } from "@mui/material";
import { Add, Delete, Edit, Search } from "@mui/icons-material";
import notitaService from '../services/NotitaService'; // importare serviciu ce populeaza listaNotite
import sanitizeHtml from "sanitize-html"
import ContentEditable from 'react-contenteditable';
import { Box } from "@mui/system";



const TabelNotite = () => {

//initializare lista notita ca fiind o lista goala utilizand hook-ul useState si populare prin apelarea serviciului
const [listaNotite, setListaNotite] = useState([])

//variabila de stare ce va declansa hook-ul useEffect pt a updata listaNotite
const [updateFlag, setUpdateFlag] = useState(false);

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
};

const [isModalTextNotiteOpen, setIsModalTextNotiteOpen] = useState(false); //isModalOpen este variabila de stare, setIsModalOpen este functia ce schimba starea 

//functie schimbare stare modal text notite in true
const handleOpenModalTextNotite = () => {
    setIsModalTextNotiteOpen(true); //seteaza variabila de stare isModalTextNotiteOpen ca fiind true. astfel modalul se va deschide 
};

//functie schimbare stare modal text notite in false atunci cand se apasa butonul Închide
const handleCloseModalTextNotite = () => {
    setIsModalTextNotiteOpen(false);
}

//functie pentru update notita 
const handleUpdateNotita = () => {
    //salvare notita

    //pregatire obiect notita updatat
    const notitaNoua = {
        ...notitaCurenta,           // Creare obiect de tip notitaCurenta
        textNotita: textNotitaNou   // Modificare field textNotita cu valoarea noua stocata in textNotitaNou
    };

    //update notita
    notitaService.updateNotita(notitaNoua)
    .then(() => {
        //Pornire hook useEffect ce este legat de variabila de stare -- pt update lista notite
        setUpdateFlag(!updateFlag)

        //Componenta (LinieEditabilaTextNotita) se va re-randa atunci cand se schimba starea notitaCurenta
        //asta pentru ca content-ul LinieEditabilaTextNotita depinde de starea notitaCurenta (const [content, setContent] = useState(notitaCurenta.textNotita))
        //nu putem face cu setNotitaCurenta(notitaCurenta) pentru ca e aceeasi referinta a obiectului, deci starea nu se va schimba
        //notitaNoua este acelas obiect ca notitaCurenta dar are alta referinta
        setNotitaCurenta(notitaNoua)

        handleCloseModalTextNotite()
    })
    .catch(error => {
        console.error(error);
    });

};


//Content pentru Modalul Text Notita
const ContentModalTextNotita = (
    <Box
        sx={{
            bgcolor: '#282424',
            color: 'white',
            padding: 3,
            display: 'flex',
            justifyContent: 'center',
            minHeight: '20vh',
            minWidth: '50vh',

            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'

        }}
    >
        <Box>
            <h2>Salvezi modificările textului?</h2>
        </Box>

        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "80%",
                position: "absolute",
                padding: 3,
                bottom: 0
            }}
        >
            <Button
                variant="contained"
                onClick={handleCloseModalTextNotite}
            >
                Închide
            </Button>

            <Button
                variant="contained"
                sx={{
                    backgroundColor: "red",
                    "&:hover": {
                        backgroundColor: "#FF4500"
                    }
                }}
                onClick={handleUpdateNotita}
            >
                Salvează
            </Button>
        </Box>

    </Box>
);

//Modalul propriu-zis (componenta modal caruia i se adauga contentent-ul, definit mai sus)
const ModalTextNotita = (
    <Modal
        aria-labelledby="modal-text-notita"
        open={isModalTextNotiteOpen}
    >
        {ContentModalTextNotita}
    </Modal>
);

//variabila de stare pt textul introdus de utilizator in campul editabil al text notita, se va seta pt notita curenta in server-side  
const [textNotitaNou, setTextNotitaNou] = useState(null)

//pentru o linie de tabel editabila
const LinieEditabilaTextNotita = ( ) => {

    const [content, setContent] = useState(notitaCurenta.textNotita)

    const onContentChange = React.useCallback(evt => {
        const sanitizeConf = {
            allowedTags: ["b", "i", "a", "p"],
            allowedAttributes: { a: ["href"] }
        };
        setContent(sanitizeHtml(evt.currentTarget.innerHTML, sanitizeConf))    
    }, [])

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

    //functie ce va actiona in onBlur daca dam focus pe textul celulei tabelului
    const handleBlur = () => {            
        setTextNotitaNou(content)
        if(notitaCurenta.textNotita !== content){
            handleOpenModalTextNotite() //functie de deschidere modal notite
        }
    }

    //componenta returnata sub forma de div cu un element interior de tip ContentEditable
    return (
        <div
            style={{
                color: 'white',
                paddingLeft: '7vh',
                overflowWrap: 'break-word',
                wordWrap: 'break-word',
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap'
            }}
            onBlur={handleBlur}
        >
            <ContentEditable
                onChange={onContentChange}
                html={content}
                tagName="p"             //ContentEditable va fi un div in interiorul table cell care e un td
                style={{ outline: "none" }}
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}


return (
    <div style={{display: 'flex', height: '100vh'}}>
        <div style={{width: '25%', overflow: 'scroll'}}>
            <TableContainer component={Paper} style={{ backgroundColor: '#1e1e1e' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: 5, justifyContent: "space-between" }}>
                    <div>
                        <IconButton> <Search style={{ color: "cyan" }} /></IconButton>
                    </div>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: 'cyan' }}><h2>Listă</h2></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listaNotite.map((notita, index) => (
                            <React.Fragment key={notita.notitaId}>
                                <TableRow onClick={() => handleRowClick(index)}>
                                    <TableCell style={{ color: 'white' }}>
                                        <div style={{display: 'flex', flexDirection: 'column'}}>
                                            <h3>{notita.titlu}</h3> 
                                            <small>Creat:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{notita.dataScriere}</small>    
                                            <small>Modificat:&nbsp;{notita.dataModificare}</small>   
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
                {ModalTextNotita}
            </TableContainer>
        </div>

        {notitaCurenta ? (
            <div>
                <LinieEditabilaTextNotita/>
            </div>
        ) : null}

    </div>
)

}
export default TabelNotite;