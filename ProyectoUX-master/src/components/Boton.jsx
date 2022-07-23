import React from 'react';
import './Boton.css';

function Boton(props) {

   const memoria=['MC','MR','M+','M-','MS','M˅'];

   const esOperador = () => {
      const valor = props.children;
      return isNaN(valor) && (valor !== '.') && (valor !== '=') && (valor !='+/-')&& (valor !=memoria.includes(valor));
   };
   
   return (
      <div className={`boton ${esOperador()? 'operador': ''} ${props.children == "="? 'igual': ''} ${memoria.includes(props.children)? `memoria ${props.desactivado? "desactivar" : ""}`: ''} `.trimEnd()} onClick={() => memoria.includes(props.children)? props.manejarClic() : props.manejarClic(props.children)}>
         {props.children}
      </div>
   )
}

export default Boton;