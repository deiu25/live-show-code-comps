import React, { useState } from 'react';
import './ThemeButton.css';
import ThemeButtons from '../theme-buttons/ThemeButtons';

const ThemeButton = ({ handleChangeTheme }) => {
    const [isActive, setIsActive] = useState(false);

    const toggleMenu = () => {
        setIsActive(!isActive);
    };

    return (
        <div className={`theme-menu ${isActive ? 'theme-active' : ''}`}>
            <div className="theme-toggle" onClick={toggleMenu}>
                <ion-icon name="share-social"></ion-icon>
            </div>
            <ThemeButtons handleChangeTheme={handleChangeTheme} />
        </div>
    );
};

export default ThemeButton;
