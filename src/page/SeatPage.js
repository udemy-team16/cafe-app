import React from 'react';
import useLikeHook from '../Hook/useLikeHook';
import styles from '../styles/Seat.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cafeList from '../api/cafeList.json';

const SeatPage = () => {
  const { id } = useParams();
  const idx = Number(id);

  const filterCafeList = cafeList.filter(e => e.idx === idx)[0];

  const { likeList, unlike } = useLikeHook(JSON.parse(localStorage.getItem("favoriteCafeList")) || []);
  const navigate = useNavigate();

  const renderSeats = () => {
    const seats = [];
    const totalSeats = filterCafeList.total_seats;
    const remainSeats = filterCafeList.remain_seats;

    for (let i = 0; i < totalSeats; i++) {
      const seatStyle = {
        backgroundColor: i < remainSeats ? '#30A2FF' : '#a4a4a4'
      };
      seats.push(
        <div className={styles.seat} style={seatStyle} key={i}></div>
      );
    }
    return seats;
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.title_wrap}>
        <div className={styles.cafe_header}>
          <span className={styles.back_wrap} onClick={() => navigate(-1)}><FontAwesomeIcon icon={faAngleLeft} className={styles.back} /></span>
          <h1 className={styles.cafe_title}>{filterCafeList.name}</h1>
        </div>
      </div>
      <div className={styles.seat_wrap}>
        <div className={styles.seat_remain_wrap}>
          {renderSeats()}
        </div>
      </div>
      <p className={styles.seat_remain}>잔여좌석 : {filterCafeList.remain_seats} / {filterCafeList.total_seats}</p>
    </div>
  );
};

export default SeatPage;
