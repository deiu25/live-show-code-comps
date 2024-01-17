import React from 'react'
import './NewBlogNavbar.css'
import { Link } from 'react-router-dom'
import livecodeshowlogo1 from '../../../assets/logo/livecodeshowlogo1.png'

export const NewBlogNavbar = () => {
  return (
    <div className='editor-nav'>
        <Link to='/' className=''>
            <img src={livecodeshowlogo1} alt='logo' className='editor-nav-logo' />
        </Link>
        <div className='editor-nav-buttons'>
            <button className='editor-nav-button-draft'>Save Draft</button>
            <button className='editor-nav-button-publish'>Publish</button>
            <button className='editor-nav-button-preview'>Preview</button>
        </div>
    </div>
  )
}
