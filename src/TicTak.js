import './Tic.css';
import React, { useState, useEffect } from 'react';
export default function TicTak(){
    let [arr,setArr]=useState([0,0,0,0,0,0,0,0,0]);
    let [which,setWhich]=useState(1);
    let [winX,setX] = useState(0);
    let[winY,setY] = useState(0);
    let[open,setopen] = useState(0);
    let[mode,setmode] = useState(0);
    let[request,setreq] = useState(0);


    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

    async function dnel(i){
        let ar = Object.assign([],arr);
        console.log(arr);
        if(ar[i]===0){
            ar[i] = which;
            which = which===1?setWhich(2):setWhich(1);
        
        
        if(mode===0 && ar.indexOf(0)!==-1){
            let k = getRandomInt(9);

            while(ar[k]!==0){
                k = getRandomInt(9);
            }
            ar[k] = 2;
            console.log(ar);
           // document.querySelectorAll
            which = which===1?setWhich(2):setWhich(1);
            
        }
        
        }
        setArr( ar );
        await new Promise((r)=>{
            setTimeout(()=>{r()},2)
        })
        setreq(getRandomInt(100));

    }
    useEffect(()=>{
        if (document.querySelectorAll('.elm').length===2){
            document.querySelectorAll('.elm')[mode].style.backgroundColor = "rgb(87, 0, 95)";
            document.querySelectorAll('.elm')[mode].style.color = "white";
            
        }
        document.querySelectorAll('#Isolation_Mode').forEach(e=>{
            e.style.width = "60px";
            e.style.height = "60px";

        })
        document.querySelectorAll('#Bold_noll').forEach(e=>{
            e.style.width = "60px";
            e.style.height = "60px";

        })
        if(which === 1){
            document.getElementById('XO').style.borderBottom='3px solid aquamarine'
            document.getElementById('XOR').style = '';
            
        }else{
            document.getElementById('XOR').style.borderBottom='3px solid aquamarine'
            document.getElementById('XO').style = '';

        }
        let condition = (arr[0]===arr[4]&& arr[0]===arr[8] && arr[0]!==0)||(arr[2]===arr[4]&& arr[2]===arr[6]&& arr[2]!==0);
        if(condition ){
            if(arr[0]===1){
                setX(winX+1);
                setArr([1]);
                setWhich(1);
            }else{
                setY(winY+1);
                setArr([2]);
                setWhich(1);
            }
        }else{
            for(let i=0; i<3; i++){
                let condition1 = (arr[i*3] === arr[i*3+1] && arr[i*3+1]===arr[i*3+2] && arr[i*3]!==0);
                let condition2 = (arr[i] === arr[i+3] && arr[i+3]===arr[i+6] && arr[i+3]!==0)
                if((condition1 && arr[i*3]===1) || ( condition2 && arr[i+3]===1)){
                        setX(winX+1);
                        setArr([1]);
                        setWhich(1);
                }
                if((condition1 && arr[i*3]===2) || ( condition2 && arr[i+3]===2)){
                    setY(winY+1);
                    setArr([2]);
                    setWhich(1);
                }
              
            }
            if(arr.length!==1&&arr.indexOf(0)===-1){
                setArr([0]);
                setWhich(1);
            }
        }
    },[request,open]);
    function retry(){
        setArr([0,0,0,0,0,0,0,0,0]);
        setWhich(1);

    }
    function toOpen(i){
        if(i === 1 || i=== 0)setmode(i);
        if(open === 1)
            setopen(0);
        else
            setopen(1);
    }
    return(
        <div id="cont">
           
            <div id = 'hashiv'>
                
                <div id = "XO">
                    <svg xmlns="http://www.w3.org/2000/svg" id="Icon" data-name="Isolation Mode" viewBox="0 0 24 24" width="512" height="512"><polygon points="24.061 2.061 21.939 -0.061 12 9.879 2.061 -0.061 -0.061 2.061 9.879 12 -0.061 21.939 2.061 24.061 12 14.121 21.939 24.061 24.061 21.939 14.121 12 24.061 2.061"/></svg>
                    <div>{winX}</div>
                </div>
                <div id = "XOR">
                    <svg xmlns="http://www.w3.org/2000/svg" id="Icon" viewBox="0 0 24 24" width="512" height="512"><path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,21a9,9,0,1,1,9-9A9.01,9.01,0,0,1,12,21Z"/></svg>
                    <div>{winY}</div>
                </div>
            </div>
            <div className='modeCont'  onClick={toOpen}>
                <span className = "mode">Mode</span>
                {
                    open === 1 ?( <div style={{zIndex:5,position:"absolute",top:"44px",backgroundColor:"white",border:"1px solid grey",borderRadius:"8px"}}>
                        <div className='elm' onClick={toOpen.bind(this,0)}>With Computer</div>
                        <div className='elm' onClick={toOpen.bind(this,1)}>2 Player</div>
                    </div>):""

                }
            </div>
            <div className = "container">
                {arr.length === 9?
                    arr.map((e,i)=>{
                        
                        return(
                            <div onClick={dnel.bind(this,i)} key = {i} className = "tab">
                                {
                                    e===1?<svg xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="512" height="512"><polygon points="24.061 2.061 21.939 -0.061 12 9.879 2.061 -0.061 -0.061 2.061 9.879 12 -0.061 21.939 2.061 24.061 12 14.121 21.939 24.061 24.061 21.939 14.121 12 24.061 2.061"/></svg>:
                                    e===2?<svg style={mode===0?{transition:"all 1s ease",}:{}} xmlns="http://www.w3.org/2000/svg" id="Bold_noll" viewBox="0 0 24 24" width="512" height="512"><path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,21a9,9,0,1,1,9-9A9.01,9.01,0,0,1,12,21Z"/></svg>:""
                                } 
                            </div>
                        )
                    }):<WinOrDraw k={arr[0]} func={retry}/>
                }
            </div>
        </div>
    )
}
export function WinOrDraw(props){

    return(
        <div style={
            {
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center",
                width:"100%"

            }
        }>
            {
                props.k === 0?(<div className='draw'>DRAW!</div>):
                props.k === 1?(<div className='draw'>X WON!</div>):
                (<div className='draw'>O WON!</div>)
            }
            <div onClick={props.func} className='retry'>
                RETRY
            </div>
        </div>
    )
}