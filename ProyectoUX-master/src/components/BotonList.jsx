import React from 'react';
import './BotonList.css';
const BotonList = (props)=>(
    <div className='icon' onClick={props.manejarList}>
        {props.children}
    </div>
);
export default BotonList;