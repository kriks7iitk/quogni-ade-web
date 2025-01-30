import React from 'react'
import { formatTimestamp, kebabCaseToNormal } from '../../../../Utility/utility'
import Icon from '../../../../_icons/svgs/SolidIcons'
import ThemeButton from '../../../../_components/Buttons/ThemeButton'

export default function Log({log}) {
    return (
        <div className='log'>
            <div className='log-detail'>
          <div className='agent'><Icon name={log?.agent} width='18'/><span>{kebabCaseToNormal(log?.agent)}</span></div>
                <div className='time'>{formatTimestamp(log?.timestamp)}</div>
            </div>
            <div className='query'>
            <div style={{display:'flex', flexDirection:'row'}}>
                <span style={{fontSize:'var(--ps-txt-xxs)', fontWeight:'bold'}}>
                        Query:
                    </span>
                <div style={{ display:'flex', justifyContent:'center' ,alignItems:'', marginLeft:'auto'}}>
                    <ThemeButton leftIcon='copy' iconWidth='10' className='copy-btn'  />
                </div>
            </div>
                {log?.query}
            </div>
            {
                log?.metadata &&
                <div className='query meta'>
            <div style={{display:'flex', flexDirection:'row'}}>
                <span  style={{fontSize:'var(--ps-txt-xxs)', fontWeight:'bold'}}>Meta data:</span>
                <div style={{ display:'flex', justifyContent:'center' ,alignItems:'', marginLeft:'auto'}}>
                    <ThemeButton leftIcon='copy' iconWidth='10' className='copy-btn'  />
                        </div>
                    </div>
                    {JSON.stringify(log?.metadata)}
                </div>
            }

        </div>
    )
}
