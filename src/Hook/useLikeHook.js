import React, { useState } from 'react';

const useLikeHook = (prevState) => {
  const [likeList, setLikeList] = useState(prevState);

  const unlike = (id) => {
    if (likeList.includes(id)) {
      const filterList = likeList.filter(item => item !== id);
      localStorage.setItem('likeList', JSON.stringify(filterList));
      setLikeList(filterList);
    } else {
      const pushList = [...likeList, id];
      localStorage.setItem('likeList', JSON.stringify(pushList));
      setLikeList(pushList);
    }
  }
  return { likeList, unlike }
};

export default useLikeHook;