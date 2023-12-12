import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';  // Make sure path is correct
import './Button.css';

const LinkButton = ({ children, to }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <Button onClick={handleClick}>
            {children}
        </Button>
    );
}

export default LinkButton;