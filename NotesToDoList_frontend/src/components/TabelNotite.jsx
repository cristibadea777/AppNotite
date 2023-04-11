import * as React from "react";
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Modal, Button } from "@mui/material";
import { Delete, Edit, Search } from "@mui/icons-material";
import notitaService from '../services/NotitaService'; // importare serviciu ce populeaza listaNotite
import Pagination from '@mui/material/Pagination'; //pentru paginare tabel
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import sanitizeHtml from "sanitize-html"
import ContentEditable from 'react-contenteditable';
import { Box } from "@mui/system";

const TabelNotite = () => {
    //initializare lista notita ca fiind o lista goala utilizand hook-ul useState si populare prin apelarea serviciului

    const [listaNotite, setListaNotite] = useState([])
    
    //hook React
    //va rula doar o singura data , pentru ca are lista de dependente [] goala
    //ruleaza cand se monteaza componenta (cand se instantiaza componenta si se insereaza in DOM - Document Object Model) 
    useEffect(() => {
        notitaService.getNotite()
          .then(response => {
            setListaNotite(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }, []
    )// This will run only once, when the component mounts

    const [updateFlag, setUpdateFlag] = useState(false);
    
    useEffect(() => {
        notitaService.getNotite()
          .then(response => {
            setListaNotite(response.data);
          })
          .catch(error => {
            console.error(error);
          });
    }, [updateFlag]);

    //initializare openRowIndex ca fiind null. functie folosita la extinderea unei linii din tabel
    //se activeaza atunci cand se da click pe o linie a tabelului, evenimentul este definit in tabel cu onClick pt tableRow
    const [openRowIndex, setOpenRowIndex] = useState(null);
    const handleRowClick = (index) => {
        if (openRowIndex === index) {
            setOpenRowIndex(null)
        } else {
            setOpenRowIndex(index)
        }
    };

    //functii paginare tabel
    //initializare pagina curenta si numarul de elemente pe pagina
    const [page, setPage] = useState(1)
    //pentru schimbarea nr de inregistrari de pe pagina
    const [rowsPerPage, setRowsPerPage] = useState(7)
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(1); //reseta pagina atunci cand rowsPerPage este schimbat
    };
    //functie de schimbare a paginii
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        handleRowClick(null); //ca sa nu ramana deschisa linia cu indexul i chiar daca schimbam pagina
    };
    //calcularea indexului elementelor de pe pagina curenta
    const startIndex = (page - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    //lista elementelor de pe pagina curenta
    const currentNotite = listaNotite.slice(startIndex, endIndex)

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
        console.log(notitaCurenta)
        console.log(textNotitaNou)
       
        //pregatire obiect notita updatat
        const notitaNoua = {
            ...notitaCurenta,           // Creare obiect de tip notitaCurenta
            textNotita: textNotitaNou   // Modificare field textNotita cu valoarea noua stocata in textNotitaNou
        };

        //update notita
        notitaService.updateNotita(notitaNoua)
        .then(() => {
            // Trigger the useEffect hook by updating the updateFlag state variable
            setUpdateFlag(!updateFlag)
            handleCloseModalTextNotite()
        })
        .catch(error => {
            console.error(error);
        });

    };

    //notita curenta (cu ea lucram pt PUT, DELETE, etc)
    const [notitaCurenta, setNotitaCurenta] = useState(null)


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
    const LinieEditabilaTextNotita = ({ propNotita }) => {

        const [content, setContent] = useState(propNotita.textNotita)

        //setare notitaCurenta cu notita pe care am primit-o ca prop, deci notita care a fost deschisa, folosim useEffect nu schimbam starea direct
        useEffect(() => {
            setNotitaCurenta(propNotita);
        }, [propNotita]);

        //functie ce va actiona in onBlur daca dam focus pe textul celulei tabelului
        const handleBlurTableCell = () => {            
            setTextNotitaNou(content)
            if(propNotita.textNotita !== content)
                handleOpenModalTextNotite() //functie de deschidere modal notite
        }

        const onContentChange = React.useCallback(evt => {
            const sanitizeConf = {
                allowedTags: ["b", "i", "a", "p"],
                allowedAttributes: { a: ["href"] }
            };
            setContent(sanitizeHtml(evt.currentTarget.innerHTML, sanitizeConf))            
        }, [])

        //ruleaza de fiecare data cand se schimba contentul
        useEffect(() => {
            
        }, [content]);

        //pentru eveniment apasare TAB sau enter
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
        };





        const handleOnFocus = () =>{
            console.log(propNotita)
            //setat aici variabila cum ca e pe focus
            //si daca e pe focus, cand se da click pe butonu <Edit> sa se ia cu hook notita curenta etc sau sa apara modal salvare
        }




        return (
            <TableCell
                colSpan={5}
                style={{
                    color: 'white',
                    paddingLeft: '7vh',
                    overflowWrap: 'break-word',
                    wordWrap: 'break-word',
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap'
                }}
                onBlur={handleBlurTableCell}
                onFocus={handleOnFocus}
            >
                <ContentEditable
                    onChange={onContentChange}
                    html={content}
                    tagName="div"             //ContentEditable va fi un div in interiorul table cell care e un td
                    style={{ outline: "none" }}
                    onKeyDown={handleKeyDown} //Pentru tab si carriage return       
                />
            </TableCell>
        )
    }
    
    return (
        <TableContainer component={Paper} style={{ backgroundColor: '#1e1e1e' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: 5, justifyContent: "space-between" }}>
                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                    <h4 style={{ color: 'cyan' }}>Număr notițe:</h4>
                    <Select
                        value={rowsPerPage}
                        onChange={handleChangeRowsPerPage}
                        style={{ marginLeft: 10, marginRight: 10, width: "10ch", color: 'cyan', backgroundColor: "#282424", textAlign: 'center' }}
                        sx={{
                            color: 'cyan',
                            '& .MuiSvgIcon-root': {
                                color: 'cyan'
                            }
                        }}
                    >
                        {[1, 3, 5, 7, 20].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <div>
                    <IconButton> <Search style={{ color: "cyan" }} /></IconButton>
                </div>

                <div>
                    <Pagination
                        count={Math.ceil(listaNotite.length / rowsPerPage)}
                        page={page}
                        onChange={handleChangePage}
                        rowsperpage={rowsPerPage}
                        variant="outlined"
                        shape="rounded"
                        sx={{
                            "& .MuiPaginationItem-root": { color: "cyan", backgroundColor: "#282424" },
                            "& .Mui-selected": { backgroundColor: "#403c3c" }
                        }}
                    />
                </div>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ color: 'cyan' }}><h4>Titlu</h4></TableCell>
                        <TableCell style={{ color: 'cyan' }}><h4>Dată scriere</h4></TableCell>
                        <TableCell style={{ color: 'cyan' }}><h4>Dată modificare</h4></TableCell>
                        <TableCell colSpan={2}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentNotite.map((notita, index) => (
                        <React.Fragment key={notita.notitaId}>
                            <TableRow onClick={() => handleRowClick(index)}>
                                <TableCell style={{ color: 'white' }}> <h4>{notita.titlu}</h4>          </TableCell>
                                <TableCell style={{ color: 'white' }}> {notita.dataScriere}             </TableCell>
                                <TableCell style={{ color: 'white' }}> {notita.dataModificare}          </TableCell>
                                <TableCell> <IconButton> <Edit style={{ color: "cyan" }} /></IconButton> </TableCell>
                                <TableCell> <IconButton> <Delete style={{ color: "cyan" }} /></IconButton> </TableCell>
                            </TableRow>
                            {openRowIndex === index && (
                                <TableRow>
                                    <LinieEditabilaTextNotita propNotita={notita} />
                                </TableRow>
                            )}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
            {ModalTextNotita}
        </TableContainer>
    );
};
export default TabelNotite;