import { faMugHot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import GoogleLoginButton from '../components/GoogleLoginButton';
import styles from '../styles/Landing.module.css';


const LandingPage = () => {
  const googleButtonStyle = {
    position:'relative',
    top:'70px',
    left:'85px'
  };
  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        <p>Give MY ___</p>
        <span>Seat</span><FontAwesomeIcon icon={faMugHot} />
      </div>
      <div style={googleButtonStyle} >
        <GoogleLoginButton />
      </div>
      <img className={styles.Logo_img} src="/assets/landing.png" alt="사람이미지" />
    </div>
  );
};

export default LandingPage;