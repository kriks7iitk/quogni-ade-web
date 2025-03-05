import React, {useState} from 'react'
import './agent-training.scss'
import ReactJson from 'react-json-view'
import SolidButton from '../../../_components/Buttons/SolidButton'
import Papa from 'papaparse';
import { useDevelopmentEnvironment } from '../../DevelopmentEnvironment/DevelopmentEnvironment';
// import { toolService } from '../../../_services';
import { toast } from 'react-hot-toast'

export default function AgentTraining() {

    const [csvData, setCsvData] = useState(null);
    const [fileName, setFileName] = useState('');
    const { responseCode, tool, setResponseCode, setTool, setMessagesAi } = useDevelopmentEnvironment();
    const [promptList, setPromptList] = useState([]);

    const handleEdit = (edit) => {
        if (edit.updated_src) {
            setResponseCode({ ...responseCode, response:edit.updated_src });
        }
    };

    const handleAdd = (add) => {
        if (add.updated_src) {
            setResponseCode({ ...responseCode, response: add.updated_src });
        }
    };
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            Papa.parse(file, {
                header: true,
                complete: (results) => {
                    console.log('Parsed CSV data:', results.data);
                    setCsvData(results.data);
            },
            error: (error) => {
                console.error('Error parsing CSV:', error);
            }
            });
        }
    };  

    const trainToolHandler = () => {
        const body = {
            state: responseCode.response,
            prompt: responseCode.prompt,
            tool_id: tool?.id
        }

        // toolService.toolTraining(body).then((response) => {
        //     setTool(response["tool_data"]);
        //     toast.success("Agent is reTrained")
        //     setPromptList([...promptList, responseCode.prompt])
        //     setMessagesAi((messages) => ([...messages, { data: response["explanation"], agent: 'aiTrainer' }]))
        // })
        //     .catch((err) => {
        //         console.log(err)
        //     })
    }
  return (
    <div className='agent-training'>
        <span className='main-header'>Agent Training</span>
        <div className=' container response-cont'>
            <span className='setting-header'>Response</span>
            <div>
                  <ReactJson
                      theme='summerfruit:inverted'
                      style={{ padding: '10px', border: '1px solid var(--slate-300)', minHeight: '300px' }}
                      name="state"
                      src={responseCode.response}
                      onEdit={handleEdit}
                      onAdd={handleAdd}
                      onDelete={handleEdit}
                  />
                <div className='button-section'>
                      <SolidButton customClass='btn-class reject'>Reject</SolidButton><SolidButton customClass='btn-class accept' onClick={() => { trainToolHandler()}}>Accept</SolidButton>
                </div>
                
            </div>
            <div className='container prompts-container'>
                  <span className='setting-header'>Prompts</span>
                  {promptList.map(( prompt, index ) => { return (<span className='prompt-txt' key={index}>{prompt}</span>)})
                  }
        </div>
            <div className='container'>
                <span className='description-txt'>Upload your prompt data in this given csv format</span>
                <SolidButton 
                onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.csv';
                    input.style.display = 'none';
                    input.onchange = handleFileUpload;
                    document.body.appendChild(input);
                    input.click();
                    document.body.removeChild(input);
                }}
                >
                    Upload CSV
                </SolidButton>
            </div>
        </div>
       
    </div>
  )
}
