import InputField from '@/_components/Form/InputField'
import React from 'react'
import './style.theme.scss'

export default function OpenAI() {
  return (
    <div className='open-ai'>
      <span className='message'>
        To use your own OpenAI key, please enter and enable it down below. We will encrypt and store your key securely
      </span>
      <div className='form'>
        <div className='form__input-field'>
          <label>API Key</label>
          <InputField type='text'/>
        </div>
        <div className='form__input-field'>
          <label>Base Url</label>
          <InputField type='text'/>
        </div>
        <div className='form__input-field'>
          <label>Custom headers</label>
          <InputField type='text'/>
        </div>
      </div>
      
    </div>
  )
}
