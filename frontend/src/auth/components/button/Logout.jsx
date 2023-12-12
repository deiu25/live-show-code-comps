import React from 'react';
import './Button.css';

export const Logout = (props) => {
  return (
    <button className='logout-btn' onClick={props.onClick}>Logout</button>
  )
}