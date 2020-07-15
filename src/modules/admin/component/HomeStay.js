import React, { useMemo, useState, useCallback, useEffect } from "react";
import "./css/Admin.scss";
import { useHistory } from "react-router-dom";
import plus from "../../../assets/img/plus.png"
import edit from "../../../assets/img/edit.png"
import del from "../../../assets/img/delete.png"

const HomeStay = ({}) => {
  const history = useHistory();
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = useCallback(async () => {
    setAccounts(JSON.parse(await localStorage.getItem("account")));
    console.log("data", JSON.parse(await localStorage.getItem("account")));
  }, []);

  return (
    <div>
      {useMemo(
        () => (
          <div>
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Họ Tên</th>
                  <th scope="col">Email</th>
                  <th scope="col">SDT</th>
                  <img type="button" class='plus' src={plus} alt=""/>

                </tr>
              </thead>
              <tbody>
                {accounts.map((item, index) => (
                  <tr>
                    <th scope="row">{index}</th>
                    <td>{item.userName}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneNumber}</td>
                    <img type="button" class='edit' src={edit} alt=""/>
                    <img type="button" class='delete' src={del} alt=""/>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
        [accounts]
      )}
    </div>
  );
};

export default HomeStay;
