import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './auth.theme.scss';

Modal.setAppElement('#root');

const InfoModal = ({ isOpen, closeModal }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedInterests, setSelectedInterests] = useState({});
    const [isNextEnabled, setIsNextEnabled] = useState(false);

  const tabs = [
    {
      name: 'Technology',
      interests: [
        'Virtual Reality',
        'Video Games',
        'Computers',
        'Applications',
        'Programming',
        'Augmented Reality',
        'Data',
        'The Internet',
        'Machine Learning',
      ]
    },
    {
      name: 'Creativity',
      interests: [
        'Art',
        'Design',
        'Photography',
        'Film Making',
        'Graphic Design',
        'Animation',
        'Music Production',
        'Fashion Design',
        'Writing',
      ]
    },
    {
      name: 'Social',
      interests: [
        'Social Media',
        'Networking',
        'Influence',
        'Communication',
        'Community Building',
        'Public Speaking',
        'Collaboration',
        'Events Management',
      ]
    },
    {
      name: 'Activities',
      interests: [
        'Sports',
        'Fitness',
        'Traveling',
        'Gaming',
        'Cooking',
        'Camping',
        'Running',
        'Hiking',
        'Swimming',
        'Walking',
        'Jumping'
      ]
    }
  ];

  const handleTabChange = (index) => {
    setActiveTab(index);
    setIsNextEnabled(false);
  };

  const handleInterestClick = (interest) => {
    setSelectedInterests((prevState) => {
      const updatedInterests = { ...prevState };
      const currentTab = tabs[activeTab].name;

      if (!updatedInterests[currentTab]) {
        updatedInterests[currentTab] = [];
      }

      if (updatedInterests[currentTab].includes(interest)) {
        updatedInterests[currentTab] = updatedInterests[currentTab].filter((item) => item !== interest);
      } else {
        updatedInterests[currentTab].push(interest);
      }

      const selectedCount = updatedInterests[currentTab].length;
      if (selectedCount >= 3) {
        setIsNextEnabled(true); 
      } else {
        setIsNextEnabled(false); 
      }

      return updatedInterests;
    });
  };

  const handleNextStep = () => {
    setActiveTab((prevIndex) => {
      const nextIndex = (prevIndex + 1) % tabs.length;
      return nextIndex;
    });
    setIsNextEnabled(false);
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="modal-content"
      overlayClassName="modal-overlay"
      closeTimeoutMS={200}
    >
      <div className="modal-header">
        <h2>Pick your interests</h2>
        <button className="modal-close" onClick={closeModal}>
          &times;
        </button>
      </div>

      <div className="modal-body">
        <p>Select from the interests below, or list your own.</p>
        <div className="modal-tabs">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`tab-name ${activeTab === index ? 'active' : ''}`}
              onClick={() => handleTabChange(index)}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className="interest-list">
          {tabs[activeTab].interests.map((interest, index) => (
            <button
              key={index}
              className={`interest ${selectedInterests[tabs[activeTab].name]?.includes(interest) ? 'selected' : ''}`}
              onClick={() => handleInterestClick(interest)}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      <div className="modal-footer">
        <button className="btn back">Back</button>
        <button 
          className="btn next" 
          onClick={handleNextStep} 
          disabled={!isNextEnabled} 
        >
          Next
        </button>
      </div>
    </Modal>
  );
};

export default InfoModal;
