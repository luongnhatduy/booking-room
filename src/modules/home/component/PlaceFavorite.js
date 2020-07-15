import React, { useMemo,useCallback,useEffect, useState } from "react";
import "./css/PlaceFavorite.scss";
import Slider from "react-slick";
import { PLACE_FAVORITE } from "./../../../ultils/constants";
import { useHistory } from "react-router-dom";

const PlaceFavorite = ({}) => {
  const history = useHistory();
  const [data,setData] = useState([]);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  useEffect(()=>{
    getData();
  },[])

  const getData = useCallback(async()=>{
  //  localStorage.setItem('account', JSON.stringify(PLACE_FAVORITE));
   setData(JSON.parse(await localStorage.getItem('place')));
  },[])

  const handleClick = useCallback((place) =>{
    history.push("/place_home_stay",{place : place});
  },[history])

  return (
    <div class="place-favorite-view">
      {useMemo(
        () => (
          <div>
            <strong>
              Lựa chọn những Homestay hoàn hảo tại các địa điểm được yêu thích nhất
            </strong>
            <Slider {...settings}>
              {data.map((item) => (
                <div class="slide" onClick={()=>handleClick(item)}>
                  <img
                    style={{ width: "95%", height: "calc(45vh)" }}
                    src={item.img}
                    alt=""
                  />
                  <div class="place" style={{ width: "95%" }}>
                    <span>{item.place}</span>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        ),
        [data, handleClick, settings]
      )}
    </div>
  );
};

export default PlaceFavorite;
