import React, { useMemo, useEffect, useCallback ,useState } from "react";
import "./css/ListHomeStay.scss";
import { HOME_STAY, PLACE_FAVORITE } from "../ultils/constants";
import { useHistory } from "react-router-dom";

const ListHomeStay = ({place}) => {
  const [listHomeStay,setListHomeStay] = useState([]);
  const history = useHistory();

  useEffect(()=>{
   if (place && place === 'all'){
     setListHomeStay(HOME_STAY);
   }else{
     const data = HOME_STAY.filter((i)=> i.placeId === place.id);
     setListHomeStay(data);
   }
  },[place]);

  const handleClick = useCallback((homeStay) =>{
    const place = PLACE_FAVORITE.filter((i)=> i.id === homeStay.placeId)
    history.push("/home_stay_detail",{homeStay : homeStay, place : place});
  },[]);

  return (
    <div class="homestay-highlight-view">
      {useMemo(
        () => (
          <div>
            <strong>{place && place === 'all' ? 'Homestay nổi bật' : `Homestay nổi bật tại ${place.place}`}</strong>
            <div class="row">
              {listHomeStay.map((item) => (
                <div onClick={()=>handleClick(item)} click class="col-xs-6 col-lg-20">
                  <div class="item">
                    <img
                      src={item.img}
                      alt=""
                    />
                    <span class="title">{item.title}</span>
                    <span class="description">{item.description}</span>
                    <span class="price">{item.price}</span>
                    <span class="address">{item.address}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ),
        [listHomeStay, place]
      )}
    </div>
  );
};

export default ListHomeStay;
