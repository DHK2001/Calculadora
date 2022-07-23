import React from 'react';
import './Memory.css';
import {useState} from 'react';

function Memory(props) {
    return (
      <div hidden={props.visible}>
         <div class="closureArea" onClick={props.close}></div>
         <div className={"contenedorMemoria"} hidden={props.visible}>
               <div class="actions">{props.data.length != 0?<i class="fa-solid fa-trash-can" onClick={props.deleteMemory}></i>: ""}</div>
               {props.data.length != 0? props.data.map(e => <div><h1>{e}</h1></div>) : <div><h6>No hay nada guardado en la memoria</h6></div>}
         </div>
      </div>
    )
};

export default Memory;