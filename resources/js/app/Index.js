import React from 'react'
import ReactDOM from "react-dom";
import Navigation from '../app/components/Navigation';
import '../../css/app.css';

if(document.getElementById('main')) {
    ReactDOM.render(<Navigation />, document.getElementById('main'));
}