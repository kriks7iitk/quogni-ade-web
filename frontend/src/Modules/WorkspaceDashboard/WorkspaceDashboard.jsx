import { useState, useEffect, useRef } from 'react';
import './tools-dashboard.theme.scss'
import SolidButton from '../../_components/Buttons/SolidButton';
import { authenticationService, toolsService, agentsService } from '../../_services';
import { useAiUi } from '../Ai-Ui/AiUiProvider';
import CustomModal from '../../_components/Modals/Modal';
import InputField from '../../_components/Form/inputField';
import OverlayTrigger from '@/_components/Overlayy/OverlayTrigger';
import { TOOL_TYPE } from './constant/dashboard.constant';
import { camelToSnakeCase, toUpperCase } from '@/Utility/utility';
import { useNavigate } from "react-router-dom";


export default function WorkspaceDashboard() {
  const [activeTab, setActiveTab] = useState('Recent');
  const targetRef = useRef(null);
  const navigate = useNavigate();

  const handleAppCreation = () => {
    const getService = (app) => {
      switch (app) {
        case 'tool':
          return toolsService.createTool
        case 'agent':
          return agentsService.createAgent
      }
    }
    const serviceFunction = getService(data?.selectedApp)

    const getBody = (app) => {
      switch (app) {
        case "tool":
          return {
            name: data?.appName,
            toolType: data?.subToolName,
          };
        case "agent":
          return {
            name: data?.appName,
          };
        default:
          return {};
      }
    };

    const toolBody = getBody(data?.selectedApp);

    serviceFunction(camelToSnakeCase(toolBody))
      .then((response) => { 
        console.log("respinse is");
        console.log(response);
        const name = data?.selectedApp === 'tool' ? data?.subToolName : data?.selectedApp; 
        const { id } = response;
        navigate(`/builder/${name}/${id}`);
      })
      .catch((error) => {
        console.log("error happened");
        console.log(error);
      });
  };

  const toolsOptions = [{
    name: 'rag',
    onClick: () => {
      setData((prevData) => ({
        ...prevData,
        createAppModelOpen: true,
        subToolName: TOOL_TYPE.RAG,
        createToolMenuOpen: false,
      }));
    },
  },
    {
    name: 'code',
      onClick: () => {
        setData((prevData) => ({
          ...prevData,
          createAppModelOpen: true,
          subToolName: TOOL_TYPE.CUSTOM_TOOL,
          createToolMenuOpen: false,
        }));
    },

    }
  ]
  const { data, setData} = useAiUi()

  const [session, setSession] = useState(
      authenticationService.currentSessionValue,
    );
    const user = session?.user;
  
    useEffect(() => {
      setData({
        createToolMenuOpen:false,
        createAppModelOpen:false,
        selectedApp:'',
        appName: '',
      })
      const subscription = authenticationService.currentSession.subscribe(
        (sessionCurrent) => {
          setSession(sessionCurrent);
        },
      );
      return () => subscription.unsubscribe();
    }, []);


    const createAppModalBody = () => {
      const renderInputField = () => {
        return (
          <div>
            <div className='create-app-modal-body__label'>
              Tool name
            </div>
            <div>
              <InputField
                type='text'
                onChange={(value) => {
                  setData((prevData) => ({
                    ...prevData,
                    appName: value
                  }))
                }}
              />
            </div>
          </div>
        )     
      }
      return (
          <div className='create-app-modal-body'>
              {renderInputField()}
          </div>
      );
  };
  


  const openCreateToolModal = (app) => {
    setData((prevData) => ({
      ...prevData,
      createAppModelOpen: !prevData?.createAppModelOpen,
      selectedApp:app
    }));
  }

  const toogleCreateToolMenu = () => { 
    setData((prevData) => ({
      ...prevData,
      selectedApp:'tool',
      createToolMenuOpen: !prevData?.createToolMenuOpen,
    }));
  }


  const tabs = ['Recent', 'Published', 'Starred', 'Trash'];

  return (
    <div className='tool-dashboard'>
      <CustomModal
        show={data?.createAppModelOpen}
        closeModal={() => {
          setData((prevData) => ({
            ...prevData,
            createAppModelOpen: false,
          }));
        }}
        modalBody={createAppModalBody}
        titleText={`Create ${data?.selectedApp}`}
        onSubmit={handleAppCreation}
      />
      <div className='tool-dashboard__main'>
        <h2 className='tool-dashboard__welcome'>{`Welcome, ${user?.userDetails?.fullName}`}</h2>

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
              <div ref={targetRef}>
                <SolidButton onClick={() => { toogleCreateToolMenu() }} customClass='btn-cls' leftIcon='tools' iconWidth='15' iconFill='var(--teal-500)' rightIcon='add'>Tools</SolidButton>
              </div>
              <OverlayTrigger targetRef={targetRef} onClose={() => {         
                setData((prevData) => ({
                  ...prevData,
                  createToolMenuOpen: false,
                  }));
                }}
                show={data?.createToolMenuOpen}
                placement='bottom-start'
              >
                <div className='tools-menu'>
                  {toolsOptions.map((tool, _) => {
                    return (
                      <SolidButton onClick={() => {
                        tool?.onClick();
                      }} hoverIconFill={'var(--grey-400)'}>{ toUpperCase(tool?.name)}</SolidButton>
                    )
                  })}
                </div>
                
              </OverlayTrigger>
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
