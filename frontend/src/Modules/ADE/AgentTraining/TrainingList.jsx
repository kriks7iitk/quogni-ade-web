import React, { useState } from 'react'
import Prompt from './Prompt';
import ReactJson from 'react-json-view'
import StatusCircle from './StatusCircle';

import './TrainingList.scss';

const TrainingList = ({ response, promptList }) => {
    
    
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
            
            <button className="upload-button">
                upload csv
            </button>
        </div>
    );
};

export default TrainingList