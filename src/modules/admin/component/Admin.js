import React, { useMemo, useState, useCallback } from "react";
import "./css/Admin.scss";
import { useHistory } from "react-router-dom";
import Account from "./Account";
import HomeStay from "./HomeStay";
import Place from "./Place";
import * as $ from 'jquery';

import styles from "./css/Admin.scss";


const Admin = ({}) => {
  const history = useHistory();
  const [content,setContent] = useState('account');

  const selectContent = useCallback(
    (status) => {
        setContent(status);
        $('.item').css({'background' : 'white'})
        $(`#${status}`).css({'background' : '#bbb8b8'});
    },
    [setContent],
  )

  return (
    <div class="view-container">
      {useMemo(
        () => (
          <div class="slidebar-menu shadow-lg p-3 mb-5 bg-white rounded">
            <h1>Administration</h1>
            <div class="menu">
              <div type="button" id="account" onClick={()=> selectContent('account')} class="item shadow  rounded"> Tài khoản </div>
              <div type="button" id="place" onClick={()=> selectContent('place')} class="item shadow  rounded"> Địa điểm </div>
              <div type="button" id="homeStay" onClick={()=> selectContent('homeStay')} class="item shadow  rounded"> HomeStay </div>
            </div>
          </div>
        ),
        [selectContent]
      )}

      {useMemo(
        () => (
          <div class="content">
           {content === 'account' && <Account/>}
           {content === 'homeStay' && <HomeStay/>}
           {content === 'place' && <Place/>}
          </div>
        ),
        [content]
      )}
    </div>
  );
};

export default Admin;
