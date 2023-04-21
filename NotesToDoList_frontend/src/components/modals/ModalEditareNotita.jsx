import React from 'react';
import { Modal, Button } from "@mui/material";
import { Box } from "@mui/system";

const ModalEditareNotita = ( {show, close, notitaCurenta, setNotitaCurenta, textNotitaNou, notitaService, updateFlag, setUpdateFlag} ) => {

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

            //Componenta (CampTextNotita) SE VA RE-RANDA atunci cand se schimba starea notitaCurenta
            //asta pentru ca content-ul CampTextNotita depinde de starea notitaCurenta (const [content, setContent] = useState(notitaCurenta.textNotita))
            //nu putem face cu setNotitaCurenta(notitaCurenta) pentru ca e aceeasi referinta a obiectului, deci starea nu se va schimba
            //notitaNoua este acelas obiect ca notitaCurenta dar are alta referinta
            setNotitaCurenta(notitaNoua)

            close() //inchidere modal, din true cand e deschid in false cu functia de toggle din TabelNotite ce inverseaza valoarea

        })
        .catch(error => {
            console.error(error);
        });

    }


    //Content pentru Modalul Editare Notita
    const ContentModalEditNotita = (
        <Box
            sx={{ 
                bgcolor: '#282424', color: 'white', padding: 3, display: 'flex', justifyContent: 'center', minHeight: '20vh', minWidth: '50vh',
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
                }}
        >
            <Box>
                <h2>Salvezi modificările textului?</h2>
            </Box>

            <Box
                sx={{
                    display: "flex", justifyContent: "space-between", width: "80%",
                    position: "absolute", padding: 3, bottom: 0
                }}
            >
                <Button
                    variant="contained"
                    onClick={close}
                >
                    Închide
                </Button>

                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "red", "&:hover": {backgroundColor: "#FF4500"}
                    }}
                    onClick={handleUpdateNotita}
                >
                    Salvează
                </Button>
            </Box>
        </Box>
    )


    return(
        <>
            {
                <Modal
                    aria-labelledby="modal-edit-notita"
                    open = {show}
                >
                    {ContentModalEditNotita}
                </Modal>
            }
        </>
    )

}
export default ModalEditareNotita;
