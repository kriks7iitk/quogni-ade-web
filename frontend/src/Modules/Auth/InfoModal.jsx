import React, { useState } from 'react';
import Modal from 'react-modal';
import { sendOAuthUserDetails } from '../../_services/oauth.service';
import './auth.theme.scss';

Modal.setAppElement('#root');

const InfoModal = ({ isOpen, closeModal }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedInterests, setSelectedInterests] = useState({});

    const tabs = [
        {
            name: 'occupation',
            interests: [
                'Doctor',
                'Engineer',
                'Lawyer',
                'Teacher',
                'Driver',
                'Janitor',
            ]
        },
        {
            name: 'sector',
            interests: [
                'Automobile',
                'Tech',
                'Green Energy',
                'Food',
                'Raw materials',
            ]
        },
        {
            name: 'username',
            interests: [] 
        },
        {
            name: 'dateOfBirth',
            interests: [] 
        }
    ];

    const [username, setUsername] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    const handleTabChange = (index) => {
        setActiveTab(index);
    };

    const handleInterestClick = (interest) => {
        setSelectedInterests((prevState) => {
            const updatedInterests = { ...prevState };
            const currentTab = tabs[activeTab].name;

            if (!updatedInterests[currentTab]) {
                updatedInterests[currentTab] = [];
            }

            if (currentTab === 'occupation') {
                updatedInterests[currentTab] = [interest];  
            } 
            else if (currentTab === 'sector') {
                if (updatedInterests[currentTab].includes(interest)) {
                    updatedInterests[currentTab] = updatedInterests[currentTab].filter(item => item !== interest);
                } else {
                    updatedInterests[currentTab].push(interest);
                }
            }

            return updatedInterests;
        });
    };

    const handleNextStep = async () => {
            setActiveTab((prevIndex) => {
                const nextIndex = (prevIndex + 1) % tabs.length;
                return nextIndex;
            });
    };

    const handleSubmit = async () => {
        const formData = {
            username,
            dateOfBirth,
            occupation: selectedInterests['occupation'] || [],
            sector: selectedInterests['sector'] || [],
        };

        try {
          sendOAuthUserDetails(formData).then(() => {
            console.log("data updated succesfully");
          });  
        } catch (e) {
            console.error(e);
        }
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
                <h2>Pick your details</h2>
                <button className="modal-close" onClick={closeModal}>
                    &times;
                </button>
            </div>

            <div className="modal-body">
                <p>Select from the options below and provide your details.</p>

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
                    {activeTab === 2 && (
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                            />
                        </div>
                    )}
                    {activeTab === 3 && (
                        <div className="form-group">
                            <label htmlFor="dateOfBirth">Date of Birth:</label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                            />
                        </div>
                    )}
                    {activeTab === 0 || activeTab === 1 ? (
                        tabs[activeTab].interests.map((interest, index) => (
                            <button
                                key={index}
                                className={`interest ${selectedInterests[tabs[activeTab].name]?.includes(interest) ? 'selected' : ''}`}
                                onClick={() => handleInterestClick(interest)}
                            >
                                {interest}
                            </button>
                        ))
                    ) : null}
                </div>
            </div>

            <div className="modal-footer">
                <button className="btn back">Back</button>
                {activeTab === tabs.length - 1 ? (
                    <button className="btn submit" onClick={handleSubmit}>
                        Submit
                    </button>
                ) : (
                    <button 
                        className="btn next" 
                        onClick={handleNextStep} 
                    >
                        Next
                    </button>
                )}
            </div>
        </Modal>
    );
};

export default InfoModal;
