import React from 'react';
import styles from '../styles/Cafe.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from 'react-router-dom';

const Cafe = ({ cafeList, likeList, unlike }) => {
  const navigate = useNavigate();
  const handleLike = (idx) => {
    unlike(idx);
  }

  if (!likeList) {
    return null; // 또는 다른 처리를 수행할 수도 있습니다.
  }
  const moveDetail = (id) => {
      navigate(`/list/${id}`);
  }
  return (
    <>
      {cafeList.map((item) => (
        <div className={styles.wrap} onClick={()=>moveDetail(item.idx)}>
          <div className={styles.cafe_wrap}>
            <img className={styles.cafe_img} src='/assets/cafe1.png' alt="카페사진" />
          </div>
          <div className={styles.cafe_wrap}>
            <div className={styles.cafe_title}>
              <div>{item.name}</div>
              <FontAwesomeIcon icon={faHeart} onClick={() => handleLike(item.idx)} className={styles.heart_btn} style={{ color: likeList.includes(item.idx) ? 'red' : 'black' }} />
            </div>
            <div className={styles.address}>{item.location}</div>
            <div className={styles.vide_wrap}>
              {item.type.map((item, index) => (
                <div className={styles.vide} key={index}>{item}</div>
              ))}
            </div>
            <p>잔여좌석 : {item.remain_seats} / {item.total_seats}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Cafe;
