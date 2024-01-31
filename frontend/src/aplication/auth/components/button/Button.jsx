import React from 'react';
import './Button.css';

const Button = ({ children, onClick }) => {
    return (
        <button type="submit" className="glow-blue-btn" onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;