import React, { useEffect } from 'react'
import SingleSelect from '../../../_components/Form/SingleSelect'
import './rag-setting.theme.scss'
import InputField from '../../../_components/Form/inputField'
import ThemeButton from '../../../_components/Buttons/ThemeButton'
import TagInput from '@/_components/TagInput/TagInput'
import ReactJson from 'react-json-view'
import { useAiUi } from '../../Ai-Ui/AiUiProvider'

import { useRagDevelopmentEnvironment } from '../../RagDevelopmentEnvironment/RagDevelopmentEnvironment'

export default function RagSetting() {
  
  const { data , setData } = useAiUi();
  const { tool } = useRagDevelopmentEnvironment();

  useEffect(() => {
    console.log("tool id is ", tool);
    console.log(tool?.parameters?.properties);
    
    
    setData({
        disableNameEdit:true,
        name:tool?.name || '',
        chunkingMethod:'fixed-size',
    })
  },[tool])


  const saveToolOutputDescription = () => {
    const body = {
        name:data?.name,
        description:data?.description,
        parameters:{
            type:'object',
            properties:data?.parameters,
            required:[],
        },
        code:data?.code || 'print(0)'
    }
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
        <span className='main-header'>RAG Setting</span>
        <div className='container agent-name-cont'>
            <span className='setting-header'>RAG Name</span>
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
        <div className='container'>
            <div className='model-selection-title'>
            <span className='setting-header'>Chunking Configuration</span>
            <ThemeButton leftIcon='info' className='info-btn' />
            </div>
            <div className='chunking-method'>
            <SingleSelect placeholder='select a chunking method' defaultValue={data?.chunkingMethod} options={[
                {value:"fixed-size",label:'fixed-size'},
                {value:"sentence-based",label:'sentence-based'},
                {value:"paragraph-based",label:'paragraph-based'},
                {value:"semantic",label:'semantic'},
                {value:"title-based",label:'title-based'}]} 
                onChange={(el)=>{setData({...data,chunkingMethod:el.value})}}/>
            </div>
            {data?.chunkingMethod === 'fixed-size' && <div className='chunking-method'>
                <InputField type='number' placeholder='chunk size' value={data?.fixedSize} onChange={(value) => {
                    setData({
                        ...data,
                        fixedSize: value
                    })
                }}/>
            </div>}
        </div>
        <div className='container summarization-config'>
        <span className='setting-header'>Summarization Configuration</span>
        <div className='agent-description'>
        <TagInput onChange={(tags)=>{console.log(tags)}} maxTags={3}/>
        </div>
        </div>
        
        <div className='tool-list-cont'>
            <ThemeButton  className='add-tool-btn' iconFill='var(--ps-white-1)' onClick={()=>{
                saveToolOutputDescription();
            }}>Save Settings</ThemeButton>   
        </div>
    </div>
  )
}
