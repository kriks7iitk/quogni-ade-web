import React from 'react'
import { AiUiProvider } from '../Ai-Ui/AiUiProvider'
import ToolsDashboard from './ToolsDashboard'

export default function ToolsDashbordAI() {
  return (
    <AiUiProvider>
        <ToolsDashboard />
    </AiUiProvider>
  )
}
