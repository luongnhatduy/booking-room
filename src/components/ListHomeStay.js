import React, { useMemo, useEffect, useCallback, useState } from "react";
import "./css/ListHomeStay.scss";
import { HOME_STAY, PLACE_FAVORITE } from "../ultils/constants";
import { useHistory } from "react-router-dom";

const ListHomeStay = ({ place, placeSearch }) => {
  console.log("placeSearch", placeSearch);

  const [listHomeStay, setListHomeStay] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (placeSearch) {
      search();
    } else {
      if (place && place === "all") {
        setListHomeStay(HOME_STAY);
      } else {
        const data = HOME_STAY.filter((i) => i.placeId === place.id);
        setListHomeStay(data);
      }
    }
  }, [place, placeSearch]);

  const search = useCallback(() => {
    const placeName = delete_accents(placeSearch);
    const placeNameArray = placeName.toLowerCase().split(" ");
    console.log(placeNameArray,'name')

    const rest = HOME_STAY.reduce((array, item) => {
      
      let countKeyWord = 0;
      placeNameArray.forEach((i) => {
        if (
          (delete_accents(item.title).indexOf(i) !== -1 ||
            delete_accents(item.address).indexOf(i) !== -1) &&
          i !== ""
        ) {
          countKeyWord = countKeyWord + 1;
        }
      });
      if (countKeyWord > 0) {
        const newitem = { ...item, countKeyWord };
        newitem.countKeyWord = countKeyWord;
        array.push(newitem);
      }
      return array;
    }, []);
    rest.sort(function(a, b) {
      return b.countKeyWord - a.countKeyWord;
    });
    console.log(rest,'rest')
    
    setListHomeStay(rest);

  }, [delete_accents, placeSearch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function delete_accents(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.toLowerCase();
    return str;
  }

  const handleClick = useCallback(
    (homeStay) => {
      const place = PLACE_FAVORITE.filter((i) => i.id === homeStay.placeId);
      history.push("/home_stay_detail", { homeStay: homeStay, place: place });
    },
    [history]
  );

  return (
    <div class="homestay-highlight-view">
      {useMemo(
        () => (
          <div>
            {place && (
              <strong>
                {place && place === "all"
                  ? "Homestay nổi bật"
                  : `Homestay nổi bật tại ${place.place}`}
              </strong>
            )}
            <div class="row">
              {listHomeStay.map((item) => (
                <div
                  onClick={() => handleClick(item)}
                  click
                  class="col-xs-6 col-lg-20"
                >
                  <div class="item">
                    <img src={item.img} alt="" />
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
