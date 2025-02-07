import React, { useState } from 'react'
import Prompt from './Prompt';
import ReactJson from 'react-json-view'
import StatusCircle from './StatusCircle';
import Papa from 'papaparse';
import './TrainingList.scss';

const TrainingList = ({ response, promptList }) => {
    const [fileName, setFileName] = useState('');
    const [csvData, setCsvData] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            console.log('File selected:', file);

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
    return (
        <div className="training-list">
            <div>
                <div className="header">
                    Desired Response
                </div>
                <ReactJson src={response} theme="tomorrow" onEdit={(edit) => { }} onAdd={(add) => { }} />
                <button className='confirm-button'>confirm</button>
            </div>
            <hr />
            <div className="header">
                Training Prompts
            </div>
            <div className="prompt-container">
                {promptList.map((prompt, index) => (
                    <div key={index} className="prompt-item">
                        <Prompt prompt={prompt} />
                        <StatusCircle />
                    </div>
                ))}
                {fileName && (
                    <div className="uploaded-file">
                        Uploaded File: {fileName}
                    </div>
                )}
                {csvData && (
                    <div>
                        <div>{
                            csvData.map((obj, index) => (
                                <div key={index} className="prompt-item">
                                    <Prompt prompt={obj["prompts"]} />
                                    {console.log(obj["responses"])}
                                    <StatusCircle />
                                </div>))
                        }
                        </div>
                    </div>)
                }
            </div>
            
            <button className="upload-button"
                onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.csv';
                    input.style.display = 'none';
                    input.onchange = handleFileUpload;
                    document.body.appendChild(input);
                    input.click();
                    document.body.removeChild(input);
                }}>
                upload csv
            </button>
        </div>
    );
};

export default TrainingList