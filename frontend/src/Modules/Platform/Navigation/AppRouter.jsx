import { Routes, Route, Navigate } from 'react-router-dom';
import AgentBuilder from '../../Builder/AgentBuilder';
import RagBuilder from '../../Builder/RagBuilder';
import Onboarding from '../../Auth/Onboarding';
import SignIn from '../../Auth/SignIn';
import PrivateRoute from '../../Routes/PrivateRoute';
import PlatformLayout from '../PlatformLayout';
import SignUp from '../../Auth/SignUp';
import AuthCallback from '../../Auth/OAuth/AuthCallback';
import WorkspaceDashboarddAI from '../../WorkspaceDashboard/WorkspaceDashbordAI';
import LLMDashboard from '@/Modules/LLMConfiguration/LLMDashboard';


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/workspace/workspace/tools" />} />
      
      <Route path="/sign-up" element={
        <Onboarding>
          <SignUp />
        </Onboarding>
      } />
      <Route path="/oauth/callback/:type" element={<AuthCallback />} />
      <Route path="/sign-in" element={
        <Onboarding>
          <SignIn />
        </Onboarding>
      } />
      <Route path="builder/rag/:toolId" element={
          <PrivateRoute>
            <RagBuilder />
          </PrivateRoute>
        } />
      <Route path="builder/agent/:agentId" element={
          <PrivateRoute>
            <AgentBuilder/>
          </PrivateRoute>
        } />
      <Route path="workspace" element={<PlatformLayout />}>
        <Route index element={<WorkspaceDashboarddAI />} />
        <Route path='llm-configure' element={<LLMDashboard/> } />
      </Route>
    </Routes>
  );
};

export default AppRouter;