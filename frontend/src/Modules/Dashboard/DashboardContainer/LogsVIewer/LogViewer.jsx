import React from 'react'
import './logs.theme.scss'
import Log from './Log'

export default function LogViewer({logs=[]}) {
  return (
    <div className='log-viewer'>{
        logs.map((log, index) => {
            return <Log key={index} log={log}/>
        })
    }
    </div>
  )
}
