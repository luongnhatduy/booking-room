import React, { useMemo, useEffect, useCallback, useState } from "react";
import "./css/Booked.scss";
import { useLocation } from "react-router-dom";
import * as moment from "moment";
import Header from "./Header";

const Booked = ({ place }) => {
  const [listbooked, setListBooked] = useState([]);

  useEffect(() => {
    // localStorage.removeItem('booked');
    setList();
  }, []);

  const setList = useCallback(async () => { 
    console.log(JSON.parse(await localStorage.getItem('user')),'idididi');
    const userId = JSON.parse(await localStorage.getItem('user'))?.id
    const listBooked = JSON.parse(await localStorage.getItem("booked")) || [];
    const listBookedUser = listBooked.filter( i => i.accountId == userId);
    setListBooked(listBookedUser.reverse() || []);
    console.log(userId,listBooked, "boooked");
  }, []);

  return (
    <div>
      <Header />
      <div style={{ height: "80px", width: "100%" }}></div>
      <strong>
            HomeStay đã đặt
      </strong>
      {useMemo(
        () => (
          <div class="booked">
            {listbooked.map((item) => (
              <div class="view-content shadow p-3 mb-5 bg-white rounded">
                <img src={item.img} alt="" class="img" />
                <div class="content">
                  <span class="title">{item.title}</span>
                  <span class="price">{item.price}</span>
                  <span class="address">{item.address}</span>
                  <span class="date">
                    {item.countDate} đêm : {item.date}
                  </span>
                  <span>{item.countGuest} khách</span>
                  <div class="count-money">
                    <span>Tổng tiền:</span>
                    <span> {Number(item.countMoney) * item.countDate} đ</span>
                  </div>
                  <span class="address">Ngày đặt : {item.dayBooking}</span>
                </div>
              </div>
            ))}
          </div>
        ),
        [listbooked]
      )}
    </div>
  );
};

export default Booked;
