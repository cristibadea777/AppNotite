import React from 'react'
import { Modal, Button } from "@mui/material"
import { Box } from "@mui/system"
import moment from "moment" //pt data
import { useState } from "react"

//alte componente ~~~~~~~~~~~~~~~~~
import CampEditabilTextNotita  from '../CampEditabilNotita.jsx'
import TitluEditabilNotita     from '../TitluEditabilNotita.jsx'


const ModalCreareNotita = ( {show, close, notitaService, createFlag, setCreateFlag} ) => {

    const [content, setContent] = useState(null) 
    const [contentTitlu, setContentTitlu] = useState(null) 

    const handleCloseModal = () => {
        //golire text si titlu din modal creare
        setContent(null)
        setContentTitlu(null)
        
        close()  
    }

    //functie pentru update notita 
    const handleCreateNotita = () => {
        //salvare notita

        //pregatire obiect notita creat
        const notitaNoua = {
            textNotita:     content,          
            titlu:          contentTitlu,     
            dataScriere:    moment().format("DD-MM-YYYY"),
            dataModificare: moment().format("DD-MM-YYYY"),
            stare:          '' 
        }
        //creare notita 
        notitaService.createNotita(notitaNoua)
        .then(() => {
            //Pornire hook useEffect ce este legat de variabila de stare -- pt update lista notite (altfel trebuie sa dam F5 paginii)
            setCreateFlag(!createFlag)
            //golire text si titlu din modal creare
            setContent(null)
            setContentTitlu(null)
            close() //inchidere modal, din true cand e deschid in false cu functia de toggle din TabelNotite ce inverseaza valoarea
        })
        .catch(error => {
            console.error(error)
        })
    }

    //Content pentru Modalul Editare Notita
    const ContentModalCreareNotita = (

        <Box
            sx={{ display: 'flex', flexDirection: 'column', bgcolor: "#282424", color: "white", justifyContent: "center", alignItems: "center",
                width: "77%", height: "77%", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            }}
        >
            
            <Box sx={{ display: "flex", flexDirection: 'column', height: '85%', width: '100%'}}>

                <Box sx={{ display: "flex", height: '15%', justifyContent: 'center'}}>
                    <TitluEditabilNotita contentTitlu={contentTitlu} setContentTitlu={setContentTitlu}/>
                </Box>
                
                <Box sx={{ display: "flex", height: "90%" }}>
                    <CampEditabilTextNotita content={content} setContent={setContent}/>
                </Box>

            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center', width: "100%", height: "15%" }}>
                <Button variant="contained" onClick={ handleCloseModal } sx={{margin: '2vh'}}>
                    Închide
                </Button>
                <Button variant="contained" sx={{ backgroundColor: "red", "&:hover": { backgroundColor: "#FF4500" }, margin: '2vh' }} onClick={ handleCreateNotita }>
                    Salvează
                </Button>
            </Box>

        </Box>
    )

    return(
        <>
            {
                <Modal 
                    aria-labelledby="modal-creare-notita" 
                    open = {show}
                >
                    {ContentModalCreareNotita}
                </Modal>
            }
        </>
    )

}
export default ModalCreareNotita
