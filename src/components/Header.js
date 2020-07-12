import React,{useEffect, useCallback, useState} from "react";
import styled from 'styled-components';
import roompng from "../assets/img/room.png";
import iconSearch from "../assets/img/icons8-search-64.png";
import iconDate from "../assets/img/calendar.png"
import iconPerson from "../assets/img/user.png"
import "./css/Header.css"
import { useHistory } from "react-router-dom";

const Header = ({}) => {
  const history = useHistory();
  const [logined, setLogined] = useState(false);
  const [textSearch,setTextSearch] = useState(" ");

  const handleClick = ()=> {
    history.push("/");
  }

  useEffect(() => {
   checkLogin();
  }, [])

  const checkLogin = useCallback(async()=>{
    console.log(JSON.parse(await localStorage.getItem('account')),'idididi');

    const user =  JSON.parse(await localStorage.getItem('user'));
    console.log(user,'user');
    if (user) setLogined(true);
  },[])

  const handleLogout = useCallback(()=>{
      setLogined(false);
      localStorage.removeItem('user');
  },[])

  const handleChangeText = useCallback((event) =>{
    setTextSearch(event.target.value);
  },[]);

  const handleSearch = useCallback(() =>{
    history.push("/place_home_stay",{placeSearch : textSearch });
  },[history, textSearch]);




  return (
   <nav class="header navbar navbar-expand-lg navbar-light border-bottom">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <img onClick={handleClick} src={roompng} alt="" class="room"/>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
     <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" onChange={handleChangeText} type="search" placeholder="Tìm kiếm" aria-label="Search"/>
        <button type="button" onClick={handleSearch} class="button-search ml-2 btn">
          <img class='icon-search' src={iconSearch} alt=""/>
        </button>

      </form>
    </div>
    { !!logined ? 
      (
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active"> 
            <a class="nav-link" href="/booked">Đã đặt</a>
          </li>
          <li class="nav-item active"> 
            <span type="button" class="nav-link" onClick={handleLogout} >Đăng Xuất</span>
          </li>
        </ul>
      ) : 
      (
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active"> 
            <a class="nav-link" href="/signup">Đăng kí</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/login">Đăng nhập</a>
          </li>
        </ul>
      )
    }
  </nav>
  );
};

export default Header;


