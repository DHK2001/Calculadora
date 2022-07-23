import React from 'react';
import './DropdownM.css';
import BotonList from './BotonList';
function DropdownM(props){

return(
    <div className={`ventana ${props.children==false ? 'hide' : ''}`} >
       <div className='i3'> 

        </div>
        <div className='titulo'>Acerca de la Calculadora</div>

        <div className='caja'>
            <div className='sub'>Hecho en:</div>
            <div className='sub'>Experiencia de Usuario</div>
        </div>

        <div className='caja2'>
            <div className='sub'>Por:</div>
            <div className='sub'>Alan Garcia - 21941316</div>
            <div className='sub'>Derek Galeas - 21941206</div>
        </div>

        <div className='caja3'>
            <div className='sub'>Fecha:</div>
            <div className='sub'>7/27/2022</div>
        </div>

    </div>
)

};
export default DropdownM;