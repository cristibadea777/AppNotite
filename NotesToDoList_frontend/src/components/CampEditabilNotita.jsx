import React from 'react';
import { useRef } from "react";
import sanitizeHtml from "sanitize-html"
import ContentEditable from 'react-contenteditable';

//componenta care va afisa textul notitei, sub forma de <div>
//se re-randeaza automat cand se schimba starea notitaCurenta, pentru ca variabila interna de stare 'content' depinde de ea 
const CampEditabilTextNotita = ( {content, setContent} ) => {
    const sanitizeConf = {
        allowedTags: ["b", "i", "a", "p"],
        allowedAttributes: { a: ["href"] }
    };

    const refContentEditable = useRef()

    const setNewContentNotita = () => {
      const html = refContentEditable.current.innerHTML;
      setContent(sanitizeHtml(html, sanitizeConf))
    };

    //functie pt manipularea apasarii TAB si ENTER     
    const handleKeyDown = (evt) => {
        const selection = window.getSelection()
        const range = selection.getRangeAt(0)
        if (evt.keyCode === 9) {
            evt.preventDefault();
            //key code pt TAB este 9. atunci cand useru apasa TAB, se insereaza 4 space-uri
            const tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0")
            range.insertNode(tabNode);
            range.setStartAfter(tabNode);
            range.setEndAfter(tabNode);
        }
        else if (evt.keyCode === 13) {
            evt.preventDefault();
            //key code pt ENTER este 13. atunci cand useru apasa ENTER, se insereaza '\n' 
            //whiteSpace: 'pre-wrap' la table cell -- altfel nu merge
            const textNode = document.createTextNode("\n")
            range.insertNode(textNode)
            range.setStartAfter(textNode)
            range.setEndAfter(textNode)
        }   
        selection.removeAllRanges();
        selection.addRange(range);
    }

    //componenta returnata sub forma de div cu un element interior de tip ContentEditable
    return (
        <ContentEditable 
            innerRef={refContentEditable}
            //setam ref-ul utilizand prop-ul innerRef. innerRef seteaza referinta pe elementul DOM, si putem lua innerHTML-ul lui
            html={content}//inner html
            onBlur={setNewContentNotita}
            onKeyDown={handleKeyDown}
            tagName="div"             //ContentEditable va fi sub forma de div
            style={{ 
                margin: '2vh', marginRight: '0.5vh', color: 'white', overflowWrap: 'break-word', wordWrap: 'break-word', wordBreak: 'break-word', 
                whiteSpace: 'pre-wrap', border: '1px solid #1e1e1e', padding: '1em', textAlign: 'justify', overflow: 'auto', width: '100%'
            }}
        />
    )
}
export default CampEditabilTextNotita;