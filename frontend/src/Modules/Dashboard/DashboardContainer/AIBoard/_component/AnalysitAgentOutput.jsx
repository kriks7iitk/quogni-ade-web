import React from 'react';
import '../ai-board.theme.scss';
import DataTable from '../../../../../_components/DataTable/DataTable'
import ReactMarkdown from "react-markdown";


export default function AnalysitAgentOutput({ message }) {
    return <div className="user-prompt">
        <DataTable data={JSON.parse(message?.data)} />
        <ReactMarkdown>{message?.description}</ReactMarkdown>
    </div>;
}
