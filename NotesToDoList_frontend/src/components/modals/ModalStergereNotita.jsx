import React from 'react'
import { Modal, Button } from "@mui/material"
import { Box } from "@mui/system"

const ModalStergereNotita = ( {show, close, deleteFlag, setDeleteFlag, notitaCurenta, notitaService} ) => {
    //functie pentru update notita 
    const handleStergereNotita = () => {
        //notita stearsa este notitaCurenta
        //stergere notita 
        notitaService.deleteNotita(notitaCurenta)
        .then(() => {
            setDeleteFlag(! deleteFlag)//setare deleteFlag pt hook useEffect      
            close() //inchidere modal
        })
        .catch(error => {
            console.error(error)
        })
    }

    //Content pentru Modalul Stergere Notita
    const ContentModalStergereNotita = (

        <Box
            sx={{ display: 'flex', flexDirection: 'column', bgcolor: "#282424", color: "white", justifyContent: "center", alignItems: "center",
                width: "57%", height: "40%", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            }}
        >
            
            <Box sx={{ display: "flex", justifyContent: 'center', height: '50%', width: '100%'}}>

                <h1>Ești sigur că vrei să ștergi notița ?</h1>

            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center', width: "100%", height: "15%" }}>
                <Button variant="contained" onClick={ close } sx={{margin: '2vh'}}>
                    Aulează
                </Button>
                <Button variant="contained" sx={{ backgroundColor: "red", "&:hover": { backgroundColor: "#FF4500" }, margin: '2vh' }} onClick={ handleStergereNotita }>
                    Șterge
                </Button>
            </Box>

        </Box>
    )

    return(
        <>
            {
                <Modal 
                    aria-labelledby="modal-stergere-notita" 
                    open = {show}
                >
                    {ContentModalStergereNotita}
                </Modal>
            }
        </>
    )

}
export default ModalStergereNotita
