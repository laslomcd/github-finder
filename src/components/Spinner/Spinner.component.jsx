import React from 'react'
import spinner from '../../assets/spinner.gif';
import './Spinner.css'

const Spinner = () =>
    <div className="spinner_container">
        <img src={spinner} alt="Loading..." style={{ width: '200px', margin: 'auto', display: 'block' }} />
    </div>
        
    

export default Spinner;
