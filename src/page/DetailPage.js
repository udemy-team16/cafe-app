import { faAngleLeft, faLocationDot, faClock, faPhone, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styles from '../styles/Detail.module.css';
import useLikeHook from '../Hook/useLikeHook';
import cafeList from '../api/cafeList.json';
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const DetailPage = () => {
  const { id } = useParams();
  const idx = Number(id);

  const filterCafeList = cafeList.filter(e => e.idx === idx)[0];
  const [itemsToShow, setItemsToShow] = useState(6);
  const [expandedMenu, setExpandedMenu] = useState(false);


  const { likeList, unlike } = useLikeHook(JSON.parse(localStorage.getItem("favoriteCafeList")) || []);
  const navigate = useNavigate();

  const toggleExpandedMenu = () => {
    setExpandedMenu(prevExpandedMenu => !prevExpandedMenu);
    if (!expandedMenu) {
      setItemsToShow(filterCafeList.menu.length);
    } else {
      setItemsToShow(6);
    }
  };

  return (
    <div className={styles.wrap}>
      <div>
        <div className={styles.cafe_header}>
          <span className={styles.back_wrap} onClick={() => navigate(-1)}><FontAwesomeIcon icon={faAngleLeft} className={styles.back} /></span>
          <h1 className={styles.cafe_title}>{filterCafeList.name}</h1>
          <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
            <span className='insta'><Link to="https://www.instagram.com/"><FontAwesomeIcon className={styles.back_insta} icon={faInstagram} /></Link></span>
            <span onClick={() => unlike(filterCafeList.idx)}><FontAwesomeIcon icon={faHeart} className={styles.back} style={{ color: likeList.includes(idx) ? 'red' : 'black' }} /></span>
          </div>
        </div>
      </div>
      <img src="/assets/cafe1.png" alt="카페이미지" width={'400px'} height={'200px'} />
      <div className={styles.cafe_description}>
        <div className={styles.cafe_info_wrap}>
          <span className={styles.cafe_info}><FontAwesomeIcon icon={faLocationDot} /> {filterCafeList.location}</span>
          <span className={styles.cafe_info}><FontAwesomeIcon icon={faClock} /> {filterCafeList.time}</span>
          <span className={styles.cafe_info}><FontAwesomeIcon icon={faPhone} /> {filterCafeList.call}</span>
        </div>
        <div className={styles.cafe_seats}>
          <button onClick={() => navigate(`/list/${filterCafeList.idx}/seat`)}>좌석 현황</button>
        </div>
      </div>
      <div className={styles.cafe_menu}>
        <p>메뉴</p>
        <div className={styles.cafe_price}>
          {Object.entries(filterCafeList.menu).slice(0, itemsToShow).map(([key, value], index) => (
            <div className={styles.menu_item} key={index}>
              <span className={styles.name}>{key}</span>
              <span className={styles.dash}>-----</span>
              <span className={styles.price}>{value}</span>
            </div>
          ))}
        </div>
        <button onClick={toggleExpandedMenu}>
          {expandedMenu ? (
            <>
              접기 <img src="/assets/cutdown.png" alt="접기" width={'15px'} />
            </>
          ) : (
            <>
              더보기 <img src="/assets/full.png" alt="더보기" width={'15px'} />
            </>
          )}
        </button>

      </div>
    </div>
  );
};

export default DetailPage;