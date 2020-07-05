import React, { useMemo,useCallback } from "react";
import "./css/PlaceFavorite.scss";
import Slider from "react-slick";
import { PLACE_FAVORITE } from "./../../../ultils/constants";
import { useHistory } from "react-router-dom";

const PlaceFavorite = ({}) => {
  const history = useHistory();

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  const handleClick = useCallback((place) =>{
    history.push("/place_home_stay",{place : place});
  },[])

  return (
    <div class="place-favorite-view">
      {useMemo(
        () => (
          <div>
            <strong>
              Lựa chọn những Homestay hoàn hảo tại các địa điểm được yêu thích nhất
            </strong>
            <Slider {...settings}>
              {PLACE_FAVORITE.map((item) => (
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
        []
      )}
    </div>
  );
};

export default PlaceFavorite;
