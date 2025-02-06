import React from 'react'
import SingleSelect from '../../../_components/Form/SingleSelect'
import './agent-setting.theme.scss'
import InputField from '../../../_components/Form/InputField'

export default function AgentSetting() {
  return (
    <div className='agent-setting'>
        <span className='main-header'>Agent Setting</span>
        <div className='container agent-name-cont'>
            <span className='setting-header'>Agent Name</span>
            <div className='agent-name'>
                <InputField type='text'/>
            </div>
        </div>
        <div className=' container model-selection-cont'>
        <span className='setting-header'>Select LLM Model</span>
        <div className='model-selection'>
         <SingleSelect />   
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
            
            <textarea placeholder='State Description'></textarea>
        </div>
        </div>
        <div className='container tool-list-cont'>
        <span className='setting-header'>Tools</span>
        <div className='tools-list'>
        </div>
        </div>
    </div>
  )
}
