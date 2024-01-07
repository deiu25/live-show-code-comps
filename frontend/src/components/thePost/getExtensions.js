import {javascript} from '@codemirror/lang-javascript';
import {css} from '@codemirror/lang-css';
import {html} from '@codemirror/lang-html';

export const getExtensions = (language) => {
    switch(language) {
        case 'html':
          return [html()];
        case 'css':
          return [css()];
        case 'javascript':
          return [javascript()];
        default:
          return [];
      }
}
