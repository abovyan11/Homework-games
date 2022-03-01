import './bar.css'
import React, { useEffect } from 'react';

export default function Bar(props){
    useEffect(()=>{
        if(props.nav !== 0 ){
            document.querySelectorAll('.ticTak').forEach((e,i)=>{
                e.style={}
                if(i===props.nav-1){
                    e.style.backgroundColor = "rgb(87, 0, 95)";
                    e.style.color = "white";
                }
                
            })
            
        }
    })
    
    return(
        <div className="bar">
            <h2 onClick={props.navigate.bind(this,10)} style={{cursor:"pointer"}}>Games</h2>
            
            <div onClick={props.navigate.bind(this,1)} className="ticTak">Tic Tac toe</div>
            <div onClick={props.navigate.bind(this,2)} className="ticTak">Snake</div>
            <div onClick={props.navigate.bind(this,3)} className="ticTak"> Rock scissors paper</div>

        </div>
    )
}