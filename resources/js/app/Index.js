import React from 'react'
import ReactDOM from "react-dom";
import Home from './Home';
import '../../css/app.css';

if(document.getElementById('main')) {
    ReactDOM.render(<Home />, document.getElementById('main'));
}