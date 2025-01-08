import React, { useState } from 'react';
import { authenticationService } from '../../_services';
import Modal from 'react-modal';
import './modals.theme.scss';

export default function CustomModal({
  isOpen,
  closeModal,
  subTitle,
  header = () => {},
  titleText,
  bodyText,
  modalBody = () => {},
  modalFooter = () => {},
}) {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState({});
  const user = authenticationService.currentSessionValue?.user;
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
      } else if (currentTab === 'sector') {
        if (updatedInterests[currentTab].includes(interest)) {
          updatedInterests[currentTab] = updatedInterests[currentTab].filter(
            (item) => item !== interest,
          );
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
      sendOAuthUserDetails(formData).then((response) => {});
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <Modal
        isOpen={isOpen}
        className="modal-content"
        overlayClassName="modal-overlay"
        closeTimeoutMS={200}
      >
        {header() ? (
          header()
        ) : (
          <div
            className="modal-header"
            style={{ borderBottom: '2px solid var(--slate-400)' }}
          >
            <span className="title">{titleText}</span>
            {subTitle && <span className="description">{subTitle}</span>}

            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
          </div>
        )}

        {modalBody() ? (
          modalBody()
        ) : (
          <div className="modal-body">{bodyText}</div>
        )}

        {modalFooter() ? (
          modalFooter()
        ) : (
          <div className="modal-footer">
            <button className="btn cancel">Cancel</button>
            <button className="btn next" onClick={handleNextStep}>
              Submit
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
