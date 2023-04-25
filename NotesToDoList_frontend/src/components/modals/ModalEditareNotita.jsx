import React from 'react';
import { Modal, Button } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment"; //pt data


//alte componente ~~~~~~~~~~~~~~~~~
import CampEditabilTextNotita  from '../CampEditabilNotita.jsx'
import TitluEditabilNotita from '../TitluEditabilNotita.jsx'

const ModalEditareNotita = ( {show, close, notitaCurenta, setNotitaCurenta, notitaService, updateFlag, setUpdateFlag, content, setContent, contentTitlu, setContentTitlu} ) => {

    const handleCloseModal = () => {
        setContent(notitaCurenta.textNotita)
        setContentTitlu(notitaCurenta.titlu)
        close()  //---close sa nu fie pus aici, ci sa se seteze toggle on pt modalu de confirmare ... si daca se confirma, restu de mai sus sa se puna in handle confirm Close modal
    }

    //functie pentru update notita 
    const handleUpdateNotita = () => {
        //salvare notita

        //pregatire obiect notita updatat
        const notitaNoua = {
            ...notitaCurenta,                // Creare obiect de tip notitaCurenta
            textNotita:     content,         // Setare field-uri 
            titlu:          contentTitlu,     
            dataModificare: moment().format("DD-MM-YYYY") 
            //la fel facut si pt titlu --content sa fie redenumit in contentTextNotita sau ceva, si sa mai fie inca o variabila cum e content, contentTitluNotita
        };

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
            console.error(error);
        });

    }

    //Content pentru Modalul Editare Notita
    const ContentModalEditNotita = (

        <Box
            sx={{ display: 'flex', flexDirection: 'column', bgcolor: "#282424", color: "white", justifyContent: "center", alignItems: "center",
                width: "77%", height: "77%", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            }}
        >
            
            <Box sx={{ display: "flex", flexDirection: 'column', height: '85%', width: '100%' }}>

                <Box sx={{ display: "flex", height: '15%', justifyContent: 'center' }}>
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
                <Button variant="contained" sx={{ backgroundColor: "red", "&:hover": { backgroundColor: "#FF4500" }, margin: '2vh' }} onClick={handleUpdateNotita}>
                    Salvează
                </Button>
            </Box>

        </Box>
    )

    return(
        //DE SCOS ASTA DE AICI, LASAT DOAR UN DIV NEEDITABIL 
        //PUSA IN MODALU EDIT IMPREUNA CU textNotitaNou  si contentu
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
