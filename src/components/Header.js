import React from "react";
import styled from 'styled-components';
import roompng from "../assets/img/room.png";
import iconSearch from "../assets/img/icons8-search-64.png";
import iconDate from "../assets/img/calendar.png"
import iconPerson from "../assets/img/user.png"
import "./css/Header.css"
import { useHistory } from "react-router-dom";

const Header = ({}) => {
  const history = useHistory();

  const handleClick = ()=> {
    history.push("/");
  }

  return (
   <nav class="header navbar navbar-expand-lg navbar-light border-bottom">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <img onClick={handleClick} src={roompng} alt="" class="room"/>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
     <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Tìm kiếm" aria-label="Search"/>
        <div class="dropdown">
          <div class="button-date" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src={iconDate} alt="" class="icon-date"/>
            <span class="title">Ngày</span>
          </div>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
             <input class="form-control mr-sm-2 ml-sm-2"  placeholder="DD/MM/YYYY" />
          </div>
        </div>
        <div class="dropdown ml-2">
          <div  class="button-person" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src={iconPerson} alt="" class="icon-date"/>
            <span class="title">Số lượng</span>
          </div>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
             <input class="form-control mr-sm-2 ml-sm-2"  placeholder="number" />
          </div>
        </div>
        <button type="button" class="button-search ml-2 btn">
          <img class='icon-search' src={iconSearch} alt=""/>
        </button>

      </form>
    </div>
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item active"> 
          <a class="nav-link" href="/booked">Đã đặt</a>
        </li>
        <li class="nav-item active"> 
          <a class="nav-link" href="/signup">Đăng kí</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/login">Đăng nhập</a>
        </li>
      </ul>
     
  </nav>
  );
};

export default Header;


