import React from 'react';
import '../Auth/auth.theme.scss';
import logo from '../../assets/images/logo.png';
import SignUp from './SignUp';
import AnimatedBackground from '../../_components/Animations/Disks';
import ParticlesAnimation from '../../_components/Animations/Particles';
import Carousels from '../../_components/Carousals/Carousel';

const OPTIONS = { loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function Onboarding({ children }) {
  return (
    <div className="onboarding-page">
      {/* <div className="carousel">
        
      </div> */}
      <div className="intro-page">
        <div className="onboarding-modal-page">
          <ParticlesAnimation />
          <img src={logo} alt="Logo" className="logo-img" />
        </div>

        <Carousels slides={SLIDES} options={OPTIONS} />
      </div>
      <div className="modal-page">{children}</div>
    </div>
  );
}
