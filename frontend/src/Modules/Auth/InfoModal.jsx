import React, { useState, useEffect, memo } from 'react';
import './auth.theme.scss';
import ParticlesAnimation from '../../_components/Animations/Particles';
import { authenticationService } from '../../_services';
import Modal from '../../_components/Modals/Modal';
import SingleSelect from '../../_components/Form/SingleSelect';
import { OCCUPATIONS } from './constants/auth.constant';
import { convertOccupationData } from './utils/utilityFunction';
import InputField from '../../_components/Form/inputField';
import SolidButton from '../../_components/Buttons/SolidButton';
import ThemeButton from '../../_components/Buttons/ThemeButton';
import { useApp } from '../../App';
import TagButton from '../../_components/Buttons/TagButton';
import { oAuthService } from '../../_services';
import { userService } from '../../_services/user.service';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ParticleMemo = memo(({ backgroundMask }) => {
  return <ParticlesAnimation backgroundMask={backgroundMask} />;
});

const InfoModal = ({ isOpen, closeModal }) => {
  const { appLoadingState } = useApp();
  const navigate = useNavigate();
  const occupationData = convertOccupationData(OCCUPATIONS);

  const [occupationUser, setOccupationUser] = useState(null);
  const [currentState, setCurrentState] = useState(0);
  const [preferredSector, setPreferredSector] = useState({});
  const [currentSession, setCurrentSession] = useState(
    authenticationService.currentSessionValue,
  );
  const user = currentSession?.user;
  const [userData, setUserData] = useState({
    username: null,
    dateOfBirth: null,
  });
  const session = currentSession?.session;
  const menuArray =
    session?.authType == 'OAUTH'
      ? ['USER_INFO', 'OCCUPATION', 'SECTOR_SELECTION']
      : ['SECTOR_SELECTION'];
  const size = menuArray.length;

  useEffect(() => {
    const subscription = authenticationService.currentSession.subscribe(
      (sessionCurrent) => {
        setCurrentSession(sessionCurrent);
        setUserData({
          username: user?.userDetails?.username,
          dateOfBirth: null,
        });
      },
    );

    return () => subscription.unsubscribe();
  }, []);

  const tabs = [
    'Automobile',
    'Tech',
    'Green Energy',
    'Food',
    'Raw materials',
    'Power energy',
  ];

  const isDisable = () => {
    switch (menuArray[currentState]) {
      case 'USER_INFO':
        return !userData?.username || !userData?.dateOfBirth;
      case 'OCCUPATION':
        return !occupationUser;
      case 'SECTOR_SELECTION':
        return Object.keys(preferredSector).length === 0;
      default:
        return true;
    }
  };

  const handleNextStep = () => {
    const size = menuArray.length;
    setCurrentState((prevIndex) => {
      const nextIndex = (prevIndex + 1) % size;
      console.log('Next menu is ', menuArray[nextIndex]);

      return nextIndex;
    });
  };

  const handlePrevStep = () => {
    const size = menuArray.length;
    setCurrentState((prevIndex) => {
      const nextIndex = (prevIndex - 1) % size;
      if (nextIndex < 0) return;
      return nextIndex;
    });
  };

  const infoModalFooter = () => {
    return (
      <div className="info-footer">
        {size - 1 === currentState && (
          <SolidButton
            size="m"
            bgColor={'var(--ps-dark-blue)'}
            color={'var(--ps-green-bright)'}
            customClass="btn-info"
            disabled={isDisable()}
            onClick={handleSubmit}
          >
            Continue
          </SolidButton>
        )}
      </div>
    );
  };

  const infoModalBody = () => {
    const renderForm = () => {
      switch (menuArray[currentState]) {
        case 'USER_INFO':
          return (
            <>
              <span>Provide us some additional user detail to continue</span>
              <div className="input-form">
                <div className="element">
                  <label>User name</label>
                  <InputField
                    leftIcon="user-name"
                    type="text"
                    id="user-input"
                    placeholder="Full name"
                    required={true}
                    onChange={(value) => {
                      setUserData({ ...userData, username: value });
                    }}
                    value={userData?.username}
                  />
                </div>
                <div className="element">
                  <label>Date of birth</label>
                  <InputField
                    type="date"
                    id="dob"
                    placeholder="DOB"
                    value={userData?.dateOfBirth}
                    required={true}
                    onChange={(value) => {
                      setUserData({ ...userData, dateOfBirth: value });
                    }}
                  />
                </div>
              </div>
            </>
          );

        case 'OCCUPATION':
          return (
            <>
              <span>Select your occupation details</span>
              <div className="input-form">
                <div className="element">
                  <label>Occupation</label>
                  <SingleSelect
                    isClearable={true}
                    isSearchable={true}
                    options={occupationData}
                    grouped={true}
                    defaultValue={occupationData[0][0]}
                    onChange={(value) => {
                      setOccupationUser(value);
                    }}
                    value={occupationUser}
                  />
                </div>
              </div>
            </>
          );

        case 'SECTOR_SELECTION':
          return (
            <div className="info-sector-selection">
              {tabs.map((_, index) => (
                <TagButton
                  tag={_}
                  bgColor={
                    preferredSector[_]
                      ? 'var(--ps-pink)'
                      : 'var(--ps-dark-blue)'
                  }
                  color="var(--ps-green-bright)"
                  onClick={() => {
                    console.log('prefered sector is ');
                    console.log(preferredSector);

                    if (!preferredSector?.[_])
                      setPreferredSector({ ...preferredSector, [_]: 1 });
                    else {
                      setPreferredSector((prevState) => {
                        const newState = { ...prevState };
                        delete newState[_];
                        return newState;
                      });
                    }
                  }}
                />
              ))}
            </div>
          );

        default:
          return <span>Invalid step</span>;
      }
    };

    return (
      <div className="info-modal-body">
        {!user ? (
          <div></div>
        ) : (
          <>
            {renderForm()}
            {menuArray.length > 1 && (
              <div className="dots-container">
                <ThemeButton
                  leftIcon="back-1"
                  disabled={isDisable() || currentState == 0}
                  onClick={handlePrevStep}
                />
                {menuArray.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${_ === menuArray[currentState] ? 'active' : ''}`}
                  ></span>
                ))}
                <ThemeButton
                  leftIcon="next"
                  disabled={isDisable() || currentState === size - 1}
                  onClick={handleNextStep}
                />
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  const handleSubmit = async () => {
    const preferredSectors = Object.keys(preferredSector);
    const body =
      user.authType == 'LOCAL'
        ? { preferredSectors, isOnboarded: true }
        : {
            preferredSectors,
            occupation: occupationUser?.value,
            sector: occupationUser?.sector,
            isOnboarded: true,
            ...userData,
          };
    const updateUser =
      user?.authType == 'LOCAL'
        ? userService.updateUserDetails
        : oAuthService.updateUserDetails;
    updateUser(body)
      .then(() => {
        toast.success('User onboarded');
        navigate('/dashboard', {
          state: {
            phoneNumber: data?.phoneNumber,
            userId: data?.id,
          },
        });
      })
      .catch((error) => {
        console.log('error is ', error);
      });
  };

  return (
    <div style={{ display: 'flex', background: 'var(--ps-dark-blue)' }}>
      <ParticleMemo backgroundMask="#000b50" />
      <div className="onboarding-container">
        <Modal
          isOpen={true}
          closeModal={closeModal}
          titleText={'Additional details'}
          modalBody={infoModalBody}
          modalFooter={infoModalFooter}
        />
      </div>
    </div>
  );
};

export default InfoModal;
