import React, { useMemo, useState, useCallback, useEffect } from "react";
import "./css/Admin.scss";
import { useHistory } from "react-router-dom";
import plus from "../../../assets/img/plus.png"
import edit from "../../../assets/img/edit.png"
import del from "../../../assets/img/delete.png"

const HomeStay = ({}) => {
  const history = useHistory();
  const [homeStays, setHomeStays] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = useCallback(async () => {
    setHomeStays(JSON.parse(await localStorage.getItem("homeStay")));
    console.log("data", JSON.parse(await localStorage.getItem("homeStay")));
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
                  <th scope="col">Tiêu đề</th>
                  <th scope="col">Mô tả</th>
                  <th scope="col">Giá</th>
                  <th scope="col">Địa điểm</th>
                  <th scope="col">Ảnh mô tả</th>

                  <img type="button" class='plus' src={plus} alt=""/>
                </tr>
              </thead>
              <tbody>
                {homeStays.map((item, index) => (
                  <tr>
                    <th scope="row">{index}</th>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>{item.address}</td>
                    <td>
                       <img type="button" class='img' src={item.img} alt=""/>
                    </td>


                    <img type="button" class='edit' src={edit} alt=""/>
                    <img type="button" class='delete' src={del} alt=""/>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
        [homeStays]
      )}
    </div>
  );
};

export default HomeStay;
