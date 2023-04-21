import React from 'react';
import { Modal, Button } from "@mui/material";
import { Box } from "@mui/system";

  
const ModalCreareNotita = ( {show, close} ) => {

    const ContentModalTextNotita = (
        <Box
            sx={{
                bgcolor: '#282424', color: 'white',       padding: 3,   display: 'flex',justifyContent: 'center',   minHeight: '20vh',
                minWidth: '50vh',   position: 'absolute', top: '50%',   left: '50%',    transform: 'translate(-50%, -50%)'
            }}
        >
            <Box>
                <h2>NIG NOG</h2>
                <Button onClick={() => close()}>CLOSE</Button>
            </Box>

        </Box>
    );

    return (
        <>
            {
                <Modal
                    aria-labelledby="modal-creare-notita"
                    open={show}
                >
                    {ContentModalTextNotita}
                </Modal>
            }
        </>
    )

}
export default ModalCreareNotita;
