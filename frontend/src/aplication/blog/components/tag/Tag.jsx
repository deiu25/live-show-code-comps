import React from 'react';
import './Tag.css';

export const Tag = ({ tag, onDelete }) => {
    return (
      <div className='tag-div'>
        <span className='tag'>{tag}</span>
        <button className='tag-delete' onClick={() => onDelete(tag)} aria-label={`Șterge ${tag}`}>×</button>
      </div>
    );
  }
  

