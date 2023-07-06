import React from 'react';
import styles from '../styles/Footer.module.css';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const handlePage = (page) => {
    navigate(page);
  }
  return (
    <footer className={styles.footer_wrap}>
      <img onClick={() => handlePage('/list')} src="/assets/HomeOutlined.png" alt="홈이미지" />
      <img onClick={() => handlePage('/list')} src="/assets/Vector.png" alt="종이미지" />
      <img onClick={() => handlePage('/likeList')} src="/assets/HeartOutlined.png" alt="하트이미지" />
      <img onClick={() => handlePage('/list')} src="/assets/my.png" alt="사람이미지" />
    </footer>
  );
};

export default Footer;