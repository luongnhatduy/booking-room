import React,{useMemo,useCallback,useState} from "react";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import Slider from "react-slick";
import { IMG_DATA } from "../ultils/constants";
import "./css/HomeStayDetail.scss"
import { useHistory } from "react-router-dom";
import zoomOutt from "../assets/img/zoom-out.png"
import zoomMap from "../assets/img/zoom.png"

import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'
import Overlay from 'pigeon-overlay'

const HomeStayDetail = ({}) => {
  const history = useHistory();
  const [date,setDate] = useState("04/07/2020 -> 07/07/2020");
  const [count,setCount] = useState(1);
  const [zoomCount,setZoomCount] = useState(14);
  const [displayImg, setDisplayImg] = useState(false);

  const location = useLocation();
  const homeStay = location.state.homeStay;
  const place = location.state.place;

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const handleClick = useCallback(async(homeStay) =>{
    const user =  JSON.parse(await localStorage.getItem('user'));
    if(!user){
      history.push("/login",{homeStay : homeStay ,date : date, count : count});
      return;
    }
    history.push("/booking_information",{homeStay : homeStay ,date : date, count : count});
  },[count, date, history]);

  const zoomOut = useCallback(() =>{
   setZoomCount(zoomCount - 1);
  },[zoomCount]);

  const handleZoom = useCallback(() =>{
    setZoomCount(zoomCount + 1);
   },[zoomCount]);

  const handleChangeDate = useCallback((event) =>{
    setDate(event.target.value);
  },[setDate]);

  const handleChangeCount = useCallback((event) =>{
    setCount(event.target.value);
  },[setCount]);
  return (
    <div>
      <Header/>
      <div style={{height : "80px",width : "100%"}}></div>

      {useMemo(
        () => (
            <Slider {...settings}>
              {IMG_DATA.map((item) => (
                  <img 
                    src={item.img}
                    alt=""
                  />
              ))}
            </Slider>
        ),
        [settings]
      )}

      {useMemo(()=>(
          <div class="containe row">
              <div class="col-md-9 col-xs-12 contai-left">
                  <div class="description">
                    <span class="title">{homeStay.title}</span>
                    <span class="descrip">{homeStay.description}</span>
                    <span class="address">{homeStay.address}</span>
                  </div>

                  <Map center={[place[0].lat, place[0].lon]} zoom={zoomCount} width={600} height={400}>
                    <img onClick={zoomOut} src={zoomOutt} alt="" class="zoom-out "/>
                    <img onClick={handleZoom} src={zoomMap} alt="" class="zoom"/>

                    <Marker anchor={[place[0].lat, place[0].lon]} payload={1} onClick={({ event, anchor, payload }) => {
                      setDisplayImg(!displayImg);
                    }} />
                    <Overlay anchor={[place[0].lat, place[0].lon]} offset={[120, 79]}>
                      { !!displayImg &&  <img src={IMG_DATA[0].img} width={120} height={80} alt='' class="img-map"/> }
                    </Overlay>
                  </Map>
              </div>
              <div class="col-md-3 col-xs-12 contai-right">
                  <div class="book shadow p-3 mb-5 bg-white rounded">
                     <span class="price">{homeStay.price}</span>
                     <input class="text-input " value={date} onChange={handleChangeDate} placeholder="dd/mm/yyyy -> dd/mm/yyyy" />
                     <input class="text-input "  onChange={handleChangeCount} placeholder="số khách" />

                     <div onClick={()=>handleClick(homeStay)} class="bt-book">
                      <span> Đặt ngay</span>
                     </div>
                  </div>
              </div>
          </div>
      ),[date, displayImg, handleChangeCount, handleChangeDate, handleClick, handleZoom, homeStay, place, zoomCount, zoomOut])}
    </div>
  );
};

export default HomeStayDetail;
