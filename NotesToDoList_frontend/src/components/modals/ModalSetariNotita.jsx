import React from 'react'
import { Modal, Button } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from 'react'

const ModalSetariNotita = ( {show, close, updateFlag, setUpdateFlag, notitaCurenta, setNotitaCurenta, notitaService} ) => {


    //functie pentru update notita 
    const handleUpdateCuloriNotita = () => {
        //salvare notita

        //pregatire obiect notita updatat
        const notitaNoua = {
            ...notitaCurenta,                // Creare obiect de tip notitaCurenta
            culoareText:    culoareText,
            culoareTitlu:   culoareTitlu 
        }

        //update notita
        notitaService.updateNotita(notitaNoua)
        .then(() => {
            //Pornire hook useEffect ce este legat de variabila de stare -- pt update lista notite (altfel trebuie sa dam F5 paginii)
            setUpdateFlag(!updateFlag)

            //setare pt re-randare
            //Componenta (CampEditabilNotita) SE VA RE-RANDA atunci cand se schimba starea notitaCurenta
            //asta pentru ca content-ul CampEditabilNotita depinde de starea notitaCurenta (const [content, setContent] = useState(notitaCurenta.textNotita))
            //nu putem face cu setNotitaCurenta(notitaCurenta) pentru ca e aceeasi referinta a obiectului, deci starea nu se va schimba
            //notitaNoua este acelas obiect ca notitaCurenta dar are alta referinta
            setNotitaCurenta(notitaNoua)

            close() //inchidere modal, din true cand e deschid in false cu functia de toggle din TabelNotite ce inverseaza valoarea
        })
        .catch(error => {
            console.error(error)
        })

    }


    const [culoareTitlu, setCuloareTitlu] = useState('#FFFFFF')
    const [culoareText, setCuloareText] = useState('#FFFFFF')


    const handleChangeInputCuloareTitlu = ({target}) => {
        setCuloareTitlu(target.value)
    }

    const handleChangeInputCuloareText = ({target}) => {
        setCuloareText(target.value)
    }

    //Content pentru Modal
    const ContentModalSetari = (

        <Box
            sx={{ display: 'flex', flexDirection: 'column', bgcolor: "#282424", color: "white", justifyContent: "center", alignItems: "center",
                width: "57%", height: "40%", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            }}
        >
            
            <Box sx={{ display: "flex", justifyContent: 'center', height: '30%', width: '100%'}}>

                <h1>Introdu noile culori</h1>

            </Box>

            <Box sx={{ display: "flex",  flexDirection: 'column', height: '60%', width: '100%'}}>
                
                <div style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <h2>Culoate Titlu: </h2>
                    <input type="color" value={culoareTitlu} onChange={handleChangeInputCuloareTitlu} style={{marginLeft: '15%', width: '25vh'}}/>
                </div>

                <div style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <h2>Culoate Text: </h2>
                    <input type="color" value={culoareText} onChange={handleChangeInputCuloareText} style={{marginLeft: '15%', width: '25vh'}}/>
                </div>
                                
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center', width: "100%", height: "15%" }}>
                <Button variant="contained" onClick={ close } sx={{margin: '2vh'}}>
                    Aulează
                </Button>
                <Button variant="contained" sx={{ backgroundColor: "red", "&:hover": { backgroundColor: "#FF4500" }, margin: '2vh' }} onClick={ handleUpdateCuloriNotita }>
                    Schimbă
                </Button>
            </Box>

        </Box>
    )

    return(
        <>
            {
                <Modal 
                    aria-labelledby="modal-setari-notita" 
                    open = {show}
                >
                    {ContentModalSetari}
                </Modal>
            }
        </>
    )

}
export default ModalSetariNotita