import React from 'react'
import { Modal, Button } from "@mui/material"
import { Box } from "@mui/system"

const ModalCautare = ( {show, close, notitaService, searchTitlu, setSearchTitlu, setListaNotite, setNotitaCurenta, setContent, setContentTitlu, setSelectedRow, optiuneNotiteArhivate} ) => {


    const handleChangeInputSearchTitlu = ( {target} ) => {
       setSearchTitlu(target.value)
    }

    const handleCautare = () => {
        notitaService[searchTitlu ? 'getNotiteCautare' : 'getNotite'](searchTitlu)
        .then(response => {
            setListaNotite(response.data)
            if(! response.data.length === 0 ){
                //const index = response.data.length - 1
                const index = 0
                setNotitaCurenta(response.data[index])
                setContent      (response.data[index].textNotita) 
                setContentTitlu (response.data[index].titlu)
                setSelectedRow  (index) 
            }
            setSearchTitlu('')
            close()
        })
        .catch(error => {
            console.error(error)
        })
    }

    const handleCautareArhivate = () => {
        notitaService[searchTitlu ? 'getNotiteCautareArhivate' : 'getNotiteArhivate'](searchTitlu)
        .then(response => {
            setListaNotite(response.data)
            if(! response.data.length === 0 ){
                //const index = response.data.length - 1
                const index = 0
                setNotitaCurenta(response.data[index])
                setContent      (response.data[index].textNotita) 
                setContentTitlu (response.data[index].titlu)
                setSelectedRow  (index) 
            }
            setSearchTitlu('')
            close()
        })
        .catch(error => {
            console.error(error)
        })
    }

    //Content pentru Modal
    const ContentModalCautare = (

        <Box
            sx={{ display: 'flex', flexDirection: 'column', bgcolor: "#282424", color: "white", justifyContent: "center", alignItems: "center",
                width: "57%", height: "40%", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            }}
        >
            
            <Box sx={{ display: "flex", justifyContent: 'center', height: '30%', width: '100%'}}>
                <h1>Caută notițe</h1>
            </Box>

            <Box sx={{ display: "flex",  flexDirection: 'column', height: '30%', width: '100%'}}>
                
                <div style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <h2>Titlu: </h2>
                    <input onChange={handleChangeInputSearchTitlu} style={{marginLeft: '15%', width: '25vh', background: 'transparent', backgroundColor: '#282424', outline: 'none', border: 'none', borderBottom: '1px solid cyan', borderColor: 'deepskyblue', color: 'cyan' }}></input>
                </div>
   
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center', width: "100%", height: "15%" }}>
                <Button variant="contained" onClick={ close } sx={{margin: '2vh'}}>
                    Aulează
                </Button>

                <>
                {
                    ! optiuneNotiteArhivate ? (
                        <Button onClick={handleCautare}  variant="contained" sx={{ backgroundColor: "red", "&:hover": { backgroundColor: "#FF4500" }, margin: '2vh' }} >
                            Caută
                        </Button>
                    ) :
                        <Button onClick={handleCautareArhivate}  variant="contained" sx={{ backgroundColor: "red", "&:hover": { backgroundColor: "#FF4500" }, margin: '2vh' }} >
                            Caută Arhivate
                        </Button>

                }
                </>

            </Box>

        </Box>
    )

    return(
        <>
            {
                <Modal 
                    aria-labelledby="modal-cautare-notita" 
                    open = {show}
                >
                    {ContentModalCautare}
                </Modal>
            }
        </>
    )

}
export default ModalCautare
