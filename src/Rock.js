import './Rock.css'
import React, { useEffect, useState } from 'react';

let ping = 0;
export default function Rock(){
    let [animate,setAnim] = useState(false);
    let [winX,setX] = useState(0);
    let[winY,setY] = useState(0);
    let[placeText,setTxt] = useState("")
    function wait(ms){
        return new Promise(r=>setTimeout(()=>{
            r()
        },ms)
    )
    }
    async function animation(i){
        setAnim(true);
        ping = i;
        console.log(i);
        
    }
    useEffect(async ()=>{
        if(animate){
            let elm = document.querySelectorAll('.imga');
            let k = 40;
            let times = 6
            while(times){
                        
                elm[0].style.transform = `rotate(${k}deg)`
                elm[1].style.transform = `rotate3d(${k/130},1,0,180deg)`
                k = k===0?40:0;
                await wait(250);
                times--;
            }
            elm[0].style.transition = "none"
            elm[0].style.transform = `rotate(90deg)`
            elm[0].src = which(ping);
            elm[1].style.transition = "none"
            elm[1].style.transform = `rotate3d(1,1,0,180deg)`
            let comp = getRandomInt(3)
            elm[1].src = which(comp);
            document.querySelector('.result').style.opacity = 1;
            if(ping === comp){
                setTxt("Draw!");

            }else if((ping===0 && comp===1)||(ping===1 && comp === 2)||(ping===2 &&comp===0)){
                setTxt("You won!");
                setX(winX+1);
            }else{
                setTxt("You loss!");
                setY(winY+1);
            }
        }
    },[animate])
    function which(a){
        switch(a){
            case 0:return "../hand.png";
            case 1:return "../one.png";
            case 2:return "../two.png";

        }
    }
    function retry(){
        setTxt("");
        setAnim(false)
    }
    function getRandomInt(max = 3) {
        return Math.floor(Math.random() * max);
    }
    return(
        <div id = 'cont'>
            <h2 style={{marginTop:'30px'}}>Chose One</h2>
            <div id = 'hashiv'>
                
                <div id = "XO">
                    <div>You</div>
                    <div>{winX}</div>
                </div>
                <div id = "XOR">
                    <div>Computer</div>
                    <div>{winY}</div>
                </div>
            </div>
            <div id ='contain'>
                {   !animate?
                    <div>
                        <img onClick={animation.bind(this,0)} className = 'img' src = '../hand.png'/>
                        <img onClick={animation.bind(this,1)} className = 'img' src = '../one.png'/>
                        <img onClick={animation.bind(this,2)} className = 'img' src = '../two.png'/>
                    </div>:
                    <div>
                        <div style={{display:"flex",position:"relative",width:"400px",justifyContent:"space-between"}}>
                            <img  className = 'imga du' src = '../fist.png'/>
                            <img  className = 'imga comp' src = '../fist.png'/>
                            <div className='result'>{placeText}</div>
                        </div>
                        <div style={{display:"flex",flexDirection:"column"}}>
                            
                            <div onClick={retry} className = 'retry'>Retry</div>
                        </div>
                        
                    </div>
                }
            </div>
        </div>
    )
}