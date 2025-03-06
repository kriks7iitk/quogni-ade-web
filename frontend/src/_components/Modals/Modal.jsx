import React, { useState } from 'react';
import Modal from 'react-modal';
import './modals.theme.scss';

export default function CustomModal({
  show,
  closeModal,
  subTitle,
  header = () => {},
  titleText,
  bodyText,
  customClass,
  customClassBody,
  modalBody = () => {},
  modalFooter = () => {},
}) {
  const [activeTab, setActiveTab] = useState(0);


  const handleNextStep = async () => {
    setActiveTab((prevIndex) => {
      const nextIndex = (prevIndex + 1) % tabs.length;
      return nextIndex;
    });
  };

  return (
    <div>
      <Modal
        isOpen={show}
        className={`modal-content ${customClass ? customClass : ''}`}
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
          <div className={`modal-body ${customClassBody ? customClassBody : ''}`}>{bodyText}</div>
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
