import React from 'react';
import Button from './presentation/buttons/blueGlowButton/BlueGlow';
import JSXsourceCode from './code/JSXsourceCode';
import CSSsourceCode from './code/CSSsourceCode';
import HTMLsourceCode from './code/HTMLsourceCode';
import JSsourceCode from './code/JSsourceCode';

const ComponentsCode = [
    {
      component: <Button>Glow Button</Button>,
      JSXsourceCode: JSXsourceCode('BlueGlowButtonCode'),
      CSSsourceCode: CSSsourceCode('BlueGlowButtonCode'),
      HTMLsourceCode: HTMLsourceCode('BlueGlowButtonCode'),
      JSsourceCode: JSsourceCode('BlueGlowButtonCode'),
    },
];

export default ComponentsCode;