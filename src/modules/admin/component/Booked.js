import React, { useMemo, useState, useCallback, useEffect } from "react";
import "./css/Admin.scss";
import { useHistory } from "react-router-dom";
import plus from "../../../assets/img/plus.png"
import edit from "../../../assets/img/edit.png"
import del from "../../../assets/img/delete.png"

const Booked = ({}) => {
  const history = useHistory();
  const [listbooked, setListBooked] = useState([]);


  useEffect(() => {
    getData();
  }, []);

  const getData = useCallback(async () => {
    // localStorage.removeItem('booked');
    const listdata = JSON.parse(await localStorage.getItem("booked")) || [];
    console.log(listdata,'listda');
    
    setListBooked(listdata);
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
                  <th scope="col">Home stay</th>
                  <th scope="col">Thời gian đặt</th>
                  <th scope="col">Giá</th>
                  <th scope="col">Địa chỉ</th>
                  <th scope="col">Mã khách hàng</th>
                  <th scope="col">Ảnh mô tả</th>
                </tr>
              </thead>
              <tbody>
                {listbooked.map((item, index) => (
                  <tr>
                    <th scope="row">{index}</th>
                    <td>{item.title}</td>
                    <td>{item.date}</td>
                    <td>{item.price}</td>
                    <td>{item.address}</td>
                    <td>{item.accountId}</td>
                    <td>
                       <img type="button" class='img' src={item.img} alt=""/>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
        [listbooked]
      )}

      
    </div>
  );
};

export default Booked;
