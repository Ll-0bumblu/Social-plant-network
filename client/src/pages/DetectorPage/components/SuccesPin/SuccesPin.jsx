import React, { useRef, useEffect } from 'react';
import './SuccesPin.css';

import succesImg from './icon-succes.svg'

function SuccesPin() {
    const circule = useRef(null);
    const mark = useRef(null)

    useEffect(() => {
        const element = circule.current;
        const markElem = mark.current;
        
        const handleTransitionEnd = () => {
            markElem.classList.toggle('succes-pin_mark')
            element.classList.toggle('hidden')
        };
        
        element.addEventListener('animationend', handleTransitionEnd);
        
        return () => {
            element.removeEventListener('animationend', handleTransitionEnd);
        };
    }, []);

    return (
        <div ref={circule} className='succes-pin'>
            <img src={succesImg} ref={mark} className='hidden'/>
        </div>
    );
}

export default SuccesPin;