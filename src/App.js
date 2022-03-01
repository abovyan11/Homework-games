import './App.css';
import Bar from'./Bar.js';
import Snake from'./Snake';
import Rock from'./Rock';


import TicTak from'./TicTak.js';
import React, { useState } from 'react';

function App() {
  let[navigation,setnav] = useState(0);

  function navigate(i){
    setnav(i);
  }
  return (
    <div className="App">
      <Bar nav ={navigation} navigate={navigate}/>
      { 
        navigation===1?<TicTak/>:
        navigation===2?<Snake/>:
        navigation===3?<Rock/>:""
      }
    </div>
  );
}

export default App;
