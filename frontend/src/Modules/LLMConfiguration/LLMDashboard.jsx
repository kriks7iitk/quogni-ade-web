import React, { useState } from 'react';
import SolidButton from '@/_components/Buttons/SolidButton';
import Icon from '@/_icons/svgs/SolidIcons';
import SolidThemeIcon from '@/_icons/svgs/SolidThemeIcons';
import './llm-configuration.theme.scss';
import CustomModal from '@/_components/Modals/Modal';
import OpenAI from './ProviderModals/OpenAI';

export default function LLMDashboard() {
  const apiList = [
    { name: 'OpenAI' },
    { name: 'Anthropic' },
    { name: 'Azure' }
  ];
  
  const [showConfigModal, setShowConfigModal] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState(null)

  const getModalBody = () => {
    switch (selectedProvider) {
      case 'OpenAI':
        return <OpenAI/>
      default:
        break;
    }
  }


  return (
    <>
      <CustomModal
        show={showConfigModal}
        titleText={`Setup ${selectedProvider}`}
        modalBody={getModalBody}
        closeModal={() => {
          setSelectedProvider(null);
          setShowConfigModal(false);
        }}
      />
    <div className='llm-dashboard'>
      <div className='llm-dashboard__header'>
        <div className='llm-dashboard__header-container'>
          <div className='navigation-icon'>
            <Icon  name='llm'/>       
          </div>
          <span className='title'>LLM configuration</span>
        </div>
        <div className='llm-dashboard__tabs'>
          <span className='tab active'>APIs</span>
          <span className='tab'>Settings</span>
        </div>
      </div>
      
      <div className='llm-dashboard__body'>
        <div className='llm-dashboard__apis'>
          <div className='api-container'>
            <div className='title-container'>
              <span className='title'>Available APIs</span>
              <SolidThemeIcon name='question' />
            </div>
            <div className='api-list-container'>
                {apiList.map((api, index) => {
                    return (
                        <div className='api-item' key={index}>
                            <div className='api-icon'>
                               <Icon name={api?.name?.toLowerCase()}/>
                            </div>
                            <div className='api-name'>{api.name}</div>
                        <SolidButton onClick={() => {
                          setShowConfigModal(true)
                          setSelectedProvider(api.name)
                        }}>Enable</SolidButton>
                        </div>
                      )
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
