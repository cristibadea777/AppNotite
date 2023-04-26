import React from 'react';
import { useRef } from "react";
import sanitizeHtml from "sanitize-html"
import ContentEditable from 'react-contenteditable';

//componenta care va afisa TITLUL notitei, sub forma de <div>
const TitluEditabilNotita = ( {contentTitlu, setContentTitlu} ) => {
    
    const sanitizeConf = {
        allowedTags: ["b", "i", "a", "p"],
        allowedAttributes: { a: ["href"] }
    };

    const refContentEditableTitlu = useRef()

    const setNewContentTitluNotita = () => {
      const html = refContentEditableTitlu.current.innerHTML;
      setContentTitlu(sanitizeHtml(html, sanitizeConf))
    };

    //componenta returnata sub forma de div cu un element interior de tip ContentEditable
    return (
        <ContentEditable 
            innerRef={refContentEditableTitlu}
            onBlur={setNewContentTitluNotita}
            //setam ref-ul utilizand prop-ul innerRef. innerRef seteaza referinta pe elementul DOM, si putem lua innerHTML-ul lui
            html={contentTitlu}//inner html
            tagName="div"             //ContentEditable va fi sub forma de div
            style={{ 
                margin: '2vh', color: 'white', overflowWrap: 'break-word', wordWrap: 'break-word', wordBreak: 'break-word', 
                whiteSpace: 'pre-wrap', border: '1px solid cyan', padding: '1em', paddingTop: '0.5em', textAlign: 'justify', overflow: 'hidden', width: '100%'
            }}
        />
    )
}
export default TitluEditabilNotita;
