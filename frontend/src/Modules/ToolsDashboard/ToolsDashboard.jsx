import { useState, useEffect } from 'react';
import './tools-dashboard.theme.scss'
import SolidButton from '../../_components/Buttons/SolidButton';
import { authenticationService } from '../../_services';
import { useAiUi } from '../Ai-Ui/AiUiProvider';
import CustomModal from '../../_components/Modals/Modal';
import InputField from '../../_components/Form/InputField';
import { kebabCaseToNormal } from '../../Utility/utility';

export default function ToolsDashboard() {
  const [activeTab, setActiveTab] = useState('Recent');

  const { data, setData} = useAiUi()

  const [session, setSession] = useState(
      authenticationService.currentSessionValue,
    );
    const user = session?.user;
  
    useEffect(() => {
      setData({
        createToolModelOpen:false,
        toolName:'',
        selectedApp:'',
        appName:''
      })
      const subscription = authenticationService.currentSession.subscribe(
        (sessionCurrent) => {
          setSession(sessionCurrent);
        },
      );
      return () => subscription.unsubscribe();
    }, []);


  const createAppModalBody = () => {
    return (
      <div className='create-app-modal-body'>
        <div className='create-app-modal-body__input'>
          <label className='create-app-modal-body__label'>{`${kebabCaseToNormal(data?.selectedApp)} name`}</label>
          <InputField type='text' onChange={(value) => {
            setData((prevData) => ({
              ...prevData,
              toolName:value
            }));
          }}/>
        </div>
      </div>
    )
  
  }


  const openCreateToolModal = (app) => {
    setData((prevData) => ({
      ...prevData,
      createToolModelOpen: true,
      selectedApp:app
    }));
  
  }
  const tabs = ['Recent', 'Published', 'Starred', 'Trash'];

  return (
    <div className='tool-dashboard'>
      <CustomModal 
      show={data?.createToolModelOpen}
      closeModal={() => {
        setData((prevData) => ({
          ...prevData,
          createToolModelOpen: false,
        }));
      }}
      modalBody={createAppModalBody}
      titleText={`Create ${data?.selectedApp}`}
      />
      <div className='tool-dashboard__main'>
        <h2 className='tool-dashboard__welcome'>{`Welcome, ${user?.userDetails?.fullname}`}</h2>

        {/* Tabs */}
        <div className='tool-dashboard__tabs'>
          {tabs.map(tab => (
            <button
              key={tab}
              className={`tool-dashboard__tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area (Dynamic based on Tab Selection) */}
        <div className='tool-dashboard__content'>
          <p>Showing: <strong>{activeTab}</strong> tools</p>
          {/* Add dynamic tool listings here */}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className='tool-dashboard__right'>
        <div className='tool-dashbaord__create_Container'>
          <h3 className='tool-dashboard__sidebar-title'>Get Started</h3>
          <div className='button_container'>
            <div style={{
              display:'flex',
              flexDirection:'row'
              ,gap:'10px'
            }}>
              <SolidButton onClick={() => {openCreateToolModal('tool')}} customClass='btn-cls' leftIcon='tools' iconWidth='15' iconFill='var(--teal-500)' rightIcon='add'>Tools</SolidButton>
              <SolidButton onClick={() => {openCreateToolModal('agent')}} leftIcon='agents' iconWidth='15' iconFill='var(--green-500)' rightIcon='add'>Agents</SolidButton>
            </div>
            <div style={{
              display:'flex',
              flexDirection:'row'
              ,gap:'10px'
            }}>
              <SolidButton onClick={() => {openCreateToolModal('workflow')}} leftIcon='workflow' iconWidth='15' iconFill='var(--amber-800)' rightIcon='add'>Workflow</SolidButton>
              <div></div>
            </div>
              
          </div>
        </div>
      </div>
    </div>
  );
}
