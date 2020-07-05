import React, { useMemo, useEffect, useCallback ,useState } from "react";
import "./css/BookingInformation.scss"
import { useLocation } from "react-router-dom";
import * as moment from 'moment';
import { useHistory } from "react-router-dom";


const BookingInformation = ({place}) => {
    const history = useHistory();

    const location = useLocation();
    const homeStay = location.state.homeStay;
    const date = location.state.date;
    const count = location.state.count;
    const [money,setMoney] = useState(0);
    const [countMoney,setCountMoney] = useState(0);
    useEffect(() => {
       setMoney(moment(date.split(" -> ")[1],"DDMMYYYY").format("DD") - moment(date.split(" -> ")[0],"DDMMYYYY").format("DD"))
    }, [date])

    useEffect(()=>{  
        setCountMoney(homeStay.price.match(/[0-9]/g).join(""))
    },[homeStay.price])

    const handleClick = useCallback(async() =>{
        const data = {
            title : homeStay.title,
            price : homeStay.price,
            address : homeStay.address,
            countDate : money,
            date : date,
            countGuest : count,
            countMoney : countMoney,
            img : homeStay.img
        }
        if(localStorage.getItem('booked') !== null){
            console.log(data,'data');
            localStorage.setItem('booked',JSON.stringify(JSON.parse(await localStorage.getItem('booked')).concat(data)));
        }else{
            localStorage.setItem('booked', JSON.stringify([data]));
        }
        //  localStorage.removeItem('booked');
        history.push("/");

         console.log(JSON.parse(await localStorage.getItem('booked')),'đât');
        
        
    },[count, countMoney, date, history, homeStay.address, homeStay.img, homeStay.price, homeStay.title, money]);
  return (
    <div class="booking-information">
      <div class="view-content shadow p-3 mb-5 bg-white rounded">
        <span class="title">{homeStay.title}</span>
        <span class="price">{homeStay.price}</span>
        <span class="address">{homeStay.address}</span>
        <span class="date">{money} đêm : {date}</span>
        <span>{count} khách</span>
        <div class="count-money">
        <span>Tổng tiền:</span>
            <span> { Number(countMoney) * money} đ</span>
        </div>

        <div onClick={handleClick} class="bt-book">
                      <span> Xác nhận</span>
        </div>

      </div>
    </div>
  );
};

export default BookingInformation;
