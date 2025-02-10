import React from 'react'
import SingleSelect from '../../../_components/Form/SingleSelect'
import './agent-setting.theme.scss'
import InputField from '../../../_components/Form/InputField'
import ThemeButton from '../../../_components/Buttons/ThemeButton'
import ReactJson from 'react-json-view'

export default function AgentSetting() {
  return (
    <div className='agent-setting'>
        <span className='main-header'>Agent Setting</span>
        <div className='container agent-name-cont'>
            <span className='setting-header'>Agent Name</span>
            <div className='agent-name'>
                <InputField type='text' customInputStyle={{ padding:'2px 10px', border:'1px solid var(--slate--600) !important'}}/>
                    <ThemeButton leftIcon='edit' />
            </div>
            <div className='agent-id'>
                <span style={{
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    display: 'inline-block',
                    fontSize: 'var(--ps-txt-s)',
                    color: 'var(--slate-400)',
                    width: '100%',
                    padding:'5px'
                    }}>agent-123123-1312312-12313123-12e12312ewdfeqw</span>
                <ThemeButton leftIcon='copy' />
            </div>
        </div>
        <div className=' container model-selection-cont'>
            <div className='model-selection-title'>
            <span className='setting-header'>Select LLM Model</span>
            <ThemeButton leftIcon='info' className='info-btn' />
            </div>
            
            <div className='model-selection'>
            <SingleSelect />
            <ThemeButton leftIcon='add' className='add-button-class' iconFill='var(--ps-white-1)'>Add LLM Config</ThemeButton>   
            </div>
        </div>
        <div className=' container system-description-cont'>
        <span className='setting-header'>System description</span>
        <div className='agent-description'>
            <textarea placeholder='Agent Description'></textarea>
        </div>
        </div>
        <div className=' container state-description-cont'>
        <span className='setting-header'>State description</span>
        <div className='state-description'>
            <ReactJson theme='summerfruit:inverted' style={{padding:'10px' , border:'1px solid var(--slate-300)', minHeight:'200px'}}/>
        </div>
        </div>
        <div className='tool-list-cont'>
        <span className='description-txt'>Add tools and agents to your agentic workflow seamlessly</span>
        <ThemeButton leftIcon='add' className='add-tool-btn' iconFill='var(--ps-white-1)'>Add tools</ThemeButton>   
        </div>
    </div>
  )
}
