import ToggleSwitchWName from '@/_components/Switch/ToggleSwitchWName'
import React, {useState} from 'react'
import './modals.theme.scss'
import SingleSelect from '@/_components/Form/SingleSelect'
import MultiSelect from '@/_components/Form/MultiSelect'
import InputField from '@/_components/Form/InputField'

export default function CreateAgentModal() {
  const [inputFormatList, setInputFormatList] = useState([]);
  const [agentType, setAgentType] = useState('Unstructure');

  const updateInputFormatList = (value) => {
    setInputFormatList(prevValue => ([...value]));
  }


  const options = [
    { value: 'pdf', label: 'PDF' },
    { value: 'image', label: 'Image' },
    { value: 'txt', label: 'Text' },
    { value: 'html', label: 'HTML' },
    { value: 'xml', label: 'XML' },
  ];
  return (
    <div className='create-agent-modal'>
      <div className='create-agent-modal__input'>
        <label className='create-agent-modal__label'>Agent name</label>
        <InputField type='text' onChange={(value) => {
          setData((prevData) => ({
              ...prevData,
              toolName: value
          }));
          }}
          placeholder={'Enter agent name'}
        />
      </div>
      <div className='create-agent-modal__title'>Configuration</div>
      <div className='create-agent-modal__output-selection'>
      <label className='create-agent-modal__label'>Agent type</label>
        <ToggleSwitchWName options={['Structure', 'Unstructure']} value={agentType} setValue={setAgentType} disabled={true}/>
      </div>
      <div className='create-agent-modal__ingestion-tool-selection'>
        <label className='create-agent-modal__label'>Ingestion tool</label>
          <SingleSelect isDisabled={true} defaultValue={{value:'api',label:'API'}} options={[{value:'api',label:'API'},{value:'api',label:'API'},{value:'api',label:'API'},{value:'api',label:'API'}]}/>
      </div>
      <div className='create-agent-modal__data_input_type'>
      <label className='create-agent-modal__label'>Data ingestion type</label>
        <MultiSelect options={options} value={inputFormatList} onChange={updateInputFormatList}/>
      </div>
      
    </div>
  )
}
