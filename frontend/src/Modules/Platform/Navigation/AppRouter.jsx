import { Routes, Route, Navigate } from 'react-router-dom';
import Builder from '../../Builder/Builder';
import Onboarding from '../../Auth/Onboarding';
import SignIn from '../../Auth/SignIn';
import PrivateRoute from '../../Routes/PrivateRoute';
import InfoModal from '../../Auth/InfoModal';
import PlatformLayout from '../PlatformLayout';
import SignUp from '../../Auth/SignUp';
import AuthCallback from '../../Auth/OAuth/AuthCallback';
import ToolsDashbordAI from '../../ToolsDashboard/ToolsDashbordAI';


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/workspace/workspace/tools" />} />
      
      {/* Auth & Onboarding Routes */}
      <Route path="/sign-up" element={
        <Onboarding>
          <SignUp />
        </Onboarding>
      } />
      <Route path="/onboarding" element={
        <InfoModal 
          isOpen={true} 
          closeModal={false} 
          title="Welcome to Piggie Stack" 
        />
      } />
      <Route path="/oauth/callback/:type" element={<AuthCallback />} />
      <Route path="/sign-in" element={
        <Onboarding>
          <SignIn />
        </Onboarding>
      } />
      <Route path="builder" element={
          <PrivateRoute>
            <Builder />
          </PrivateRoute>
        } />
      <Route path="/workspace" element={<PlatformLayout />}>
        <Route index element={<Navigate to="" />} />
        <Route path="tools" element={<ToolsDashbordAI/>} />
      </Route>
    </Routes>
  );
};

export default AppRouter;