import React, {useState} from 'react';
import './App.css';

import Header from "../Header/Header";
import Exchange from "../Exchange/Exchange";

function App() {

    const [date, dateState] = useState(new Date());

    return (
    <div className="App">
        <div className="container">
            <Header onDate={dateState}/>
            <Exchange date={date}/>
        </div>
    </div>
    );
}

export default App;
