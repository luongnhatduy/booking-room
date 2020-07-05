import React from "react";
import Header from "../../../components/Header";
import { useLocation } from "react-router-dom";
import ListHomeStay from "../../../components/ListHomeStay";

const PlaceHomeStay = ({}) => {
  const location = useLocation();

  return (
    <div>
      <Header/>
      <div style={{height : "80px",width : "100%"}}></div>
      <ListHomeStay place={location.state.place}/>
    </div>
  );
};

export default PlaceHomeStay;
