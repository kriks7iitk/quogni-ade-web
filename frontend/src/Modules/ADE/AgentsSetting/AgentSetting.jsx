import React, { useEffect } from 'react'
import SingleSelect from '../../../_components/Form/SingleSelect'
import './agent-setting.theme.scss'
import InputField from '../../../_components/Form/InputField'
import ThemeButton from '../../../_components/Buttons/ThemeButton'
import ReactJson from 'react-json-view'
import { useAiUi } from '../../Ai-Ui/AiUiProvider'
import { toolService } from '../../../_services'
import toast from 'react-hot-toast'

export default function AgentSetting() {
  
  const { data , setData } = useAiUi();

  useEffect(() => {
    setData({
        disableNameEdit:true,
        name:'',
        currentLLMModelState:{},
        description:'',
        parameters:{},
        code:' hellojasdj',
    })
  },[])


  const saveToolOutputDescription = () => {
    const body = {
        name:data?.name,
        description:data?.description,
        parameters:data?.parameters,
        code:data?.code
    }
    toolService.saveAgentDescription(body).then((res) => {
        toast.success("Agent details are saved")
    })
    .catch((err) => {
        console.log(err)
    })
  }


const handleEdit = (edit) => {
    console.log("Edited:", edit);
    if (edit.updated_src) {
        setData({
            ...data,
            parameters: edit.updated_src
        })
    }
};

const handleAdd = (add) => {
    console.log("Added:", add);
    if (add.updated_src) {
        setData({
            ...data,
            parameters: add.updated_src
        })
    }
};

  return (
    <div className='agent-setting'>
        <span className='main-header'>Agent Setting</span>
        <div className='container agent-name-cont'>
            <span className='setting-header'>Agent Name</span>
            <div className='agent-name'>
                <InputField disable={data?.disableNameEdit} type='text' customInputStyle={{ padding:'2px 10px', border:'1px solid var(--slate--600) !important'}} value={data?.name} onChange={(value) => {
                    setData({
                        ...data,
                        name: value
                    })
                }}
                onBlur={()=> {
                    setData({
                        ...data,
                        disableNameEdit: true
                    })
                }}/>
                    <ThemeButton leftIcon='edit' onClick={() => {
                        setData({
                            ...data,
                            disableNameEdit: !data.disableNameEdit
                        })
                    }} />
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
                    }}>agent-123123-1312312-12313123-P</span>
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
            <textarea placeholder='Agent Description' onChange={(event) => {
                const value = event.target.value;
                setData({
                    ...data,
                    description: value
                })
            }}></textarea>
        </div>
        </div>
        <div className=' container state-description-cont'>
            <span className='setting-header'>State description</span>
            <div className='state-description'>
                  <ReactJson
                      name="state"
                      theme='summerfruit:inverted'
                      style={{ padding: '10px', border: '1px solid var(--slate-300)', minHeight: '240px', maxHeight:'240px', overflowY:'auto' }}
                      src={data?.parameters}
                      onEdit={handleEdit}
                      onAdd={handleAdd}
                      onDelete={handleEdit}
                      defaultValue={{
                          "type": "",
                          "description": ""}}
                  />
            </div>
        </div>
        <div className='tool-list-cont'>
            <ThemeButton  className='add-tool-btn' iconFill='var(--ps-white-1)' onClick={()=>{
                saveToolOutputDescription();
            }}>Save settings</ThemeButton>   
        </div>
    </div>
  )
}
