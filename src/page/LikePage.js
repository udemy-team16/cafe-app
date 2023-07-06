import React from 'react';
import Cafe from '../components/Cafe';
import useLikeHook from '../Hook/useLikeHook';
import styles from '../styles/Like.module.css';

import cafeList from '../api/cafeList.json';

const LikePage = () => {
  const { likeList } = useLikeHook(JSON.parse(localStorage.getItem('likeList')) || []);

  const filteredCafeList = cafeList.filter((item) => likeList.includes(item.idx));

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        <h1>구독 리스트</h1>
        <div>+</div>
      </div>
      {likeList.map((item) => (
        <Cafe cafeList={filteredCafeList} />
      ))}
    </div>
  );
};

export default LikePage;