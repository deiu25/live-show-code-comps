const JSXsourceCode = (codeName) => {
    const codeExamples = {
        BlueGlowButtonCode: `
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
        `,
        RedGlowButtonCode: `
            import React from 'react';
            import './Button.css';
      
            const Button = ({ children, onClick }) => {
                return (
                    <button type="submit" className="glow-red-btn" onClick={onClick}>
                        {children}
                    </button>
                );
            }
      
            export default Button;
        `,
    };

    return codeExamples[codeName];
}

export default JSXsourceCode;