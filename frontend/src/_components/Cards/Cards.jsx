import React from 'react'
import './cards.theme.scss'

export default function Cards({children}) {
  return (
    <div className='cards'>
      { children}
    </div>
  )
}
