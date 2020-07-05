import React from "react";
import { Switch, Route } from "react-router";
import HomeScreen from "../modules/home";
import PlaceHomeStay from "../modules/place-homestay"
import HomeStayDetail from "../components/HomeStayDetail";
import Login from "../modules/login/component/Login";
import BookingInformation from "../components/BookingInformation";
import Booked from "../components/Booked";
const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomeScreen} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/place_home_stay" component={PlaceHomeStay} />
      <Route exact path="/home_stay_detail" component={HomeStayDetail} />
      <Route exact path="/booking_information" component={BookingInformation} />
      <Route exact path="/booked" component={Booked} />

    </Switch>
  );
};

export default Routes;
