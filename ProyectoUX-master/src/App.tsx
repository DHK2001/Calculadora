import { Redirect, Route } from 'react-router-dom';
import { IonApp,setupIonicReact, IonContent, IonHeader, IonPage,IonTitle, IonFooter, IonToolbar} from '@ionic/react';
import './App.css'
import {memo, useState} from 'react';
import {evaluate, isOperatorNode}from 'mathjs';
import { IonReactRouter } from '@ionic/react-router';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';


/* Theme variables */
import './theme/variables.css';
import PantallaRes from './components/PantallaRes';

// COMPONENTS
import Pantalla from './components/Pantalla';
import Boton from './components/Boton';
import BotonList from './components/BotonList';
import BotonClear from './components/BotonClear';
import DropdownM from './components/DropdownM';
import History from './components/History';
import Memory from './components/Memory';

setupIonicReact();

const App: React.FC = () => {

  const [input,setInput]=useState('0');
  const [input2,setInput2]=useState('');
  const [bool,setBool]=useState(false);
  const [bool2,setBool2]=useState(false);
  const [history, setHistory]=useState(new Array);
  const [memory, setMemory]=useState(new Array);
  const [open, setOpen]=useState(false);
  const [historyVisible,setHistoryVisible]=useState(true);
  const [memoryVisible,setMemoryVisible]=useState(true);
  const [disableMemoryButtons,setDisableMemoryButtons]=useState(true);

  const abrir=()=>{
    setOpen(!open);
  };

  const abrir2=()=>{
    if(open==true)
      setOpen(false);
  };

  const invertir=()=>{
    if(open==true){
      return input;
    }
    return evaluate(input+'*'+'-1')+'';
  };

  const agregarInput=(val:string)=>{
    if(open==true){
      return;
    }
    if(val=='.' && input.includes('.') && !bool){
      setInput(input);
    }
    else{

      if(input2.includes('=')){
        setInput2('');
        if(val=='.')
          setInput('0'+val);
        else
          setInput(val);

        setBool(false);
      }
      else {

        if(bool==false){
          if(input=='0' || bool2==true){
            setBool2(false);
            if(val=='.')
              setInput(input+val);
            else
              setInput(val);
          }
          else
            setInput(input +val);
        }
        else{
          if(val=='.')
              setInput('0'+val);
          else
            setInput(val);
          setBool(false);
        }
      
      }
    }

  };

  const agregarOp=(val:string)=>{
    if(open==true){
      return;
    }
    setBool2(true);
    setBool(false);

    if(input2[input2.length-1]=='+' ||input2[input2.length-1]=='-'||input2[input2.length-1]=='x'||input2[input2.length-1]=='÷'){
      calcular(val);
      return;
    }

    var op=input;
    
    if(op[op.length-1]=='.')
      op=op.replace('.','')+val;
    else
      op=(input+val);

    setInput2(op);
  };

  const cambiarOp=(operacion:string)=>{
    if(open==true){
      return input;
    }
    if(operacion[operacion.length-1]=='.')
    operacion=operacion.replace('.','');
    var inp='';
    for(var i=0;i<operacion.length;i++){
      if(operacion[i]=='÷')
        inp+='/';
      else if(operacion[i]=='x')
        inp+='*';
      else
        inp+=operacion[i];
    }
    return inp;
  }

  const calcular=(val:string)=>{
    if(open==true){
      return;
    }
    var operacion=input2+input;
    operacion=operacion.replace('=','');

    if(operacion){
      var a=evaluate(cambiarOp(operacion));
      setInput(a + '');
      setInput2(a + val);

      let newOperation = {
        operation: input2 + input,
        result: evaluate(input2 + input)
      }
      let newArray = history
      newArray.unshift(newOperation);
      setHistory(newArray);
    }
  };

  const calcularResultado = ()=> {
    if(open==true){
      return;
    }
    var operacion=input2;
    operacion=operacion.replace('=','');

    if(bool==true){
      var a='';
      var ver=false;
      for(var i=0;i<operacion.length;i++){
        if(operacion[i]=='+'|| operacion[i]=='-' || operacion[i]=='÷' || operacion[i]=='x'){
          if(i==0)
            ver=false;
          else
            ver=true;
        }
        if(ver==true){
          a+=operacion[i];
        }
      }
      operacion=input+a;
    }else{
      operacion=operacion+input;
      setBool(true);
    }

    if(operacion){
      setInput(evaluate(cambiarOp(operacion))+'');
      setInput2(operacion+'=');
      
      let newOperation = {
        operation: operacion+'=',
        result: evaluate(cambiarOp(operacion))
      }
      let newArray = history
      newArray.unshift(newOperation);
      setHistory(newArray);
    }
  };

  const limpiar=()=>{
    if(open==true){
      return;
    }
    setInput('0');
    setInput2('');
    setBool(false);
  };

  const backspace=()=>{
    if(open==true){
      return input;
    }
    var v='';      
    if(bool==true){
      setInput2('');
      return input;
    }
    
    if(input.length==1){
      v='0';
      setBool(false);
    }
    else{
      for(var i=0;i<input.length-1;i++){
        v+=input[i];
      }
    }

    return v;
  };

  const CE=()=>{
    if(open==true){
      return;
    }
    if(bool==true){
      setInput2('');
      setInput('0');
      return input;
    }else{
      setInput('0');
    }
  }

  const raiz=()=>{
    if(open==true){
      return input;
    }
    var v='';
    var int=parseInt(input);

    v=''+Math.sqrt(int);

    return v;
  }

  // HISTORY FUNCTIONS
  const toggleHistoryVisible = () => {
    if(open==true){
      return;
    }
    setHistoryVisible(!historyVisible);
  }

  const deleteHistory = () => {
    if(open==true){
      return;
    }
    setHistory([]);
  }

  // MEMORY FUNCTIONS
  /* M+ M- */
  const toggleMemoryVisible = () => {
    if(open==true){
      return;
    }
    setMemoryVisible(!memoryVisible);
  }

  const deleteMemory = () => {
    if(open==true){
      return;
    }
    setMemory([]);
    setDisableMemoryButtons(true);
  }

  const memoryAddition = (value: number) => {
    if(open==true){
      return;
    }
    const newArray = memory;
    newArray[0] == undefined? newArray[0] = value : newArray[0] += value;
    setMemory(newArray)
    setDisableMemoryButtons(false);
  }

   /* MS */
  const storeMemory = () => {
    if(open==true){
      return;
    }
    const newArray = memory;
    newArray.unshift(parseInt(input));
    setMemory(newArray);
    setDisableMemoryButtons(false);
  }

  const restoreMemory = () => {
    if(open==true){
      return;
    }
    setInput(memory[0]);
  }

  return (
    <IonApp>
      <IonPage>
        <IonContent fullscreen>
          <div className="App" onClick={abrir2}>
            <div className="calculadora">
              <DropdownM>{open}</DropdownM>
              <History visible={historyVisible} data={history} close={toggleHistoryVisible} deleteHistory={deleteHistory}></History>
              <Memory visible={memoryVisible} data={memory} close={toggleMemoryVisible} deleteMemory={deleteMemory}></Memory>
              
              <div className='i2'> 
                <BotonList manejarList={toggleHistoryVisible}><i className="fa-solid fa-clock-rotate-left"></i></BotonList>
              </div>

              <BotonList manejarList={abrir}><i className="fa-solid fa-circle-info"></i></BotonList>
              <div className='fila3'> 
                Estándar
              </div>

              <Pantalla input={input2}/>
              <PantallaRes input2={input}></PantallaRes>

              <div className='fila2'>
                <Boton manejarClic={deleteMemory} desactivado={disableMemoryButtons}>MC</Boton>
                <Boton manejarClic={restoreMemory} desactivado={disableMemoryButtons}>MR</Boton>
                <Boton manejarClic={() => memoryAddition(parseInt(input))}>M+</Boton>
                <Boton manejarClic={() => memoryAddition(parseInt(`-${input}`))}>M-</Boton>
                <Boton manejarClic={storeMemory}>MS</Boton>
                <Boton manejarClic={toggleMemoryVisible} desactivado={disableMemoryButtons}>M˅</Boton>
              </div>

              <div className='fila'>
                <Boton manejarClic={()=>setInput(evaluate(input+'%')+'')}>%</Boton>
                <Boton manejarClic={CE}>CE</Boton>
                <Boton manejarClic={limpiar}>C</Boton>
                <BotonClear manejarClear={()=>setInput(backspace)}>
                  <i className="fa-solid fa-delete-left"></i>
                </BotonClear>
              </div>

              <div className='fila'>
                <Boton manejarClic={()=>setInput(evaluate('1'+'/'+input)+'')}>¹/x</Boton>
                <Boton manejarClic={()=>setInput(evaluate(input+'*'+input)+'')}>x²</Boton>
                <Boton manejarClic={()=>setInput(raiz)}>²√x</Boton>
                <Boton manejarClic={agregarOp}>÷</Boton>
              </div>

              <div className='fila'>
                <Boton manejarClic={agregarInput}>7</Boton>
                <Boton manejarClic={agregarInput}>8</Boton>
                <Boton manejarClic={agregarInput}>9</Boton>
                <Boton manejarClic={agregarOp}>x</Boton>
              </div>

              <div className='fila'>
                <Boton manejarClic={agregarInput}>4</Boton>
                <Boton manejarClic={agregarInput}>5</Boton>
                <Boton manejarClic={agregarInput}>6</Boton>
                <Boton manejarClic={agregarOp}>-</Boton>
              </div>

              <div className='fila'>
                <Boton manejarClic={agregarInput}>1</Boton>
                <Boton manejarClic={agregarInput}>2</Boton>
                <Boton manejarClic={agregarInput}>3</Boton>
                <Boton manejarClic={agregarOp}>+</Boton>
              </div>

              <div className='fila'>
                <Boton manejarClic={()=>setInput(invertir)}>+/-</Boton>
                <Boton manejarClic={agregarInput}>0</Boton>
                <Boton manejarClic={agregarInput}>.</Boton>
                <Boton manejarClic={calcularResultado}>=</Boton>
              </div>
          </div>
        </div>

      </IonContent>
    </IonPage>
  </IonApp>
  )
  
}; 

export default App;