import './Snake.css';
import React, { useState, useEffect } from 'react';

const Size = 20;
let gift = [getRandomInt(),getRandomInt()] 
function getRandomInt(max = Size) {
    return Math.floor(Math.random() * max);
}
function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}
let dir = 1,spasel = true;
let ar=[],ar1=[,[]],position = [[0,0]];
let p=[0,0];
export default function Snake(){
    const [arr,setArr] = useState([,[],1])
    const [tit,settit] = useState("Start")
    const [gnal,setgn] = useState(false);
   

    



    useEffect(()=>{
        ar=[];
        ar1=[1,[]];
        

        for (let i = 0; i < Size; i++) {
           ar.push(0);
        }
        for (let i = 0; i < Size; i++) {
            ar1[1].push(Object.assign([],ar));
        }
        ar1[1][0][0]=1;
        ar1[0]=0;
        ar1[2]=1
        
        setArr(ar1)
        
    },[]);
    document.addEventListener('keypress',e=>{
        if(e.key =='w' && dir!=2)dir = 3;
        if(e.key =='a' && dir!=1)dir = 0;
        if(e.key =='d' && dir!=0)dir = 1;
        if(e.key =='s' && dir!=3)dir = 2;
    
    })
    function wait(ms){
        return new Promise(r=>setTimeout(()=>{
            r()
        },ms)
    )
    }
    function retry(ms){
        ar=[];
        ar1=[1,[]];
        position = [[0,0]];
        p=[0,0];
        dir = 1;

        for (let i = 0; i < Size; i++) {
           ar.push(0);
        }
        for (let i = 0; i < Size; i++) {
            ar1[1].push(Object.assign([],ar));
        }
        ar1[1][0][0]=1;
        ar1[0]=0;
        ar1[2]=1
        
        setArr(ar1);
        settit("Start")
        start();
    }
  
    function start(){
        if(arr[2]===1){
            setgn(!gnal);
            if(gnal){ 
                settit("Start")
            }
            else {
                settit("Pause")
            }  
        }
        
        
    }
    
    useEffect(debounce(async function (){
     
    
         if(gnal){
                ar1=[arr[0],[],1];
                await wait(250)
                if(dir == 1){
                    if(p[1]>=Size-1)p[1]=0;
                    else
                        p[1]++
                }
                if(dir == 0){
                    if(p[1]<=0)p[1]=Size-1;
                    else
                        p[1]--
                }
                if(dir == 2){
                    if(p[0]>=Size-1)p[0]=0;
                    else
                        p[0]++
                }
                if(dir == 3){
                    if(p[0]<=0)p[0]=Size-1;
                    else
                        p[0]--
                }
                
                position.forEach(e=>{
                    if(p[0]==e[0]&&p[1]==e[1]){
                        setgn(false);
                        ar1[2]=0;
                       //document.querySelector('.result').style.opacity='1'
                    }
                })
                position.push(Object.assign([],p))
                if(p[0]==gift[0]&&p[1]==gift[1]){
                    let d = true
                    while(d){
                        gift = [getRandomInt(),getRandomInt()]
                        d=false
                        position.forEach(e=>{
                            
                            if(gift[0]==e[0]&&gift[1]==e[1])d=true;
                        })
                    }
                    ar1[0]=arr[0]+1;
                }
                else
                    position.shift()
                
                ar=[]
                for (let i = 0; i < Size; i++) {
                    ar.push(0);
                }
                for (let i = 0; i < Size; i++) {
                    ar1[1].push(Object.assign([],ar));
                }
                position.forEach(e=>{
                    ar1[1][e[0]][e[1]] = 1
                })
                ar1[1][gift[0]][gift[1]]=2
                //console.log(p)
               
                //console.log(ar1);
                setArr(ar1);

            }
       
    },50))
    
    return(
        <div id = 'cont'>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop: "20px",width:"300px"}}>
                <div id = "start" onClick={start}>{tit}</div>
                <div id ='score'>Score {arr[0]}</div>
            </div>
            <div id = 'container'>
                {
                    
                    arr[1].map((e,ir)=>{
                        return(
                            <div key = {ir} className='crou'>
                                {
                                    e.map((el,i)=>{
                                        return(<div key ={i}className={'cr '+`a${el}`}></div>)
                                    })
                                }
                            </div>
                        )
                    })}
                {arr[2]===0?
                    <div style={{width:"100%",position:"absolute",display:"flex",flexDirection:"column",
                    justifyContent:"center",alignItems:"center",alignContent:"center"}}>
                        <div id='result' >
                            Game over
                        </div>
                        <div onClick={retry} className='retry'>Retry</div>
                    </div>:""
                }
            </div>
            
        </div>
    )
}