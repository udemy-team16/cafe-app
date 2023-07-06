import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ReactGeocode from 'react-geocode';
import styles from '../styles/AllList.module.css';
import Cafe from '../components/Cafe';
import cafeList from '../api/cafeList.json';
import useLikeHook from '../Hook/useLikeHook';

const AllListPage = () => {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const { likeList, unlike } = useLikeHook(JSON.parse(localStorage.getItem('likeList')) || []);

  const API_KEY = process.env.REACT_APP_API_KEY;

  // Google Places API 키 설정
  ReactGeocode.setApiKey(API_KEY);

  const getCafeList = () => {
    setLoading(true);
    // 현재 위치 가져오기
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // 위도, 경도로 주소 변환
        ReactGeocode.fromLatLng(latitude, longitude).then((response) => {
          const address = response.results[0].formatted_address;
          console.log('Current Location:', address);

          // 카페 정보 가져오기
          const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000&type=cafe&key=${API_KEY}`;

          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              const results = data.results;
              console.log(results);
              // 필요한 카페 정보 추출
              const cafeData = results.map((result) => ({
                name: result.name,
                address: result.vicinity,
                rating: result.rating,
              }));

              setCafes(cafeData);
              setLoading(false);
            })
            .catch((error) => {
              console.error('Error fetching cafe data:', error);
              setLoading(false);
            });
        });
      },
      (error) => {
        console.error('Error getting location:', error);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    getCafeList();
  }, [])


  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <div className={styles.wrap}>
      <h1>카페 찾기</h1>
      <div className={styles.search_wrap}>
        <div className={styles.select_wrap}>
          <select value={selectedValue} onChange={handleSelectChange}>
            <option value="">전체</option>
            <option value="option1">내 주변</option>
            <option value="option2">인기 카페</option>
            <option value="option3">한산한 카페</option>
          </select>
        </div>
        <div className={styles.input_wrap}>
          <input type="text" placeholder='키워드를 입력하세요.' />
          <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.input_btn} />
        </div>
      </div>
      <div className={styles.category}>
        <h4>내 주변 카페</h4>
        <Cafe cafeList={cafeList.filter(e => e.filter_id === 'near')} likeList={likeList} unlike={unlike}/>
      </div>
      <div className={styles.category}>
        <h4>인기 카페</h4>
        <Cafe cafeList={cafeList.filter(e => e.filter_id === 'famous')} likeList={likeList} unlike={unlike}/>
      </div>
      <div className={styles.category}>
        <h4>한산한 카페</h4>
        <Cafe cafeList={cafeList.filter(e => e.filter_id === 'quiet')} likeList={likeList} unlike={unlike}/>
      </div>
    </div>
  );
};

export default AllListPage;