import React from "react";
import Header from "../../../components/Header";
import PlaceFavorite from "./PlaceFavorite";
import ListHomeStay from "../../../components/ListHomeStay";

const HomeScreen = ({}) => {
  return (
    <div>
      <Header/>
      <PlaceFavorite/>
      <ListHomeStay place="all"/>
    </div>
  );
};

export default HomeScreen;
