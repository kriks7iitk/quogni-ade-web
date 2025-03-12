import React from 'react'
import { AiUiProvider } from '../Ai-Ui/AiUiProvider'
import WorkspaceDashboard from './WorkspaceDashboard'

export default function WorkspaceDashbordAI() {
  return (
    <AiUiProvider>
        <WorkspaceDashboard />
    </AiUiProvider>
  )
}
