import React from 'react'
import Prompt from './Prompt';
import ReactJson from 'react-json-view'

const TrainingList = ({ promptResponsePairs }) => {
    return (
        <div>
            {promptResponsePairs.map((pair, index) => (
                <div key={index} >
                    <Prompt prompt={pair.prompt} />
                    <ReactJson src={pair.response} onEdit={(edit) => { }} onAdd={(add)=>{} } />
                </div>
            ))}
        </div>
    );
};

export default TrainingList