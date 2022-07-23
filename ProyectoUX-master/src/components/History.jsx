import React from 'react';
import './History.css';
import {useState} from 'react';

function History(props) {
    return (
        <div hidden={props.visible}>
            <div class="closureArea" onClick={props.close}></div>
            <div className="historial">
                <div class="actions">{props.data.length != 0?<i class="fa-solid fa-trash-can" onClick={props.deleteHistory}></i>: ""}</div>
                {props.data.length != 0? props.data.map(e => <div><h4>{e.operation}</h4><h1>{e.result}</h1></div>) : <div><h6>No hay historial todavía</h6></div>}
            </div>
        </div>
    )
};

export default History;