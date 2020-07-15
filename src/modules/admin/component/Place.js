import React, { useMemo, useState, useCallback, useEffect } from "react";
import "./css/Admin.scss";
import { useHistory } from "react-router-dom";
import plus from "../../../assets/img/plus.png"
import edit from "../../../assets/img/edit.png"
import del from "../../../assets/img/delete.png"

const Place = ({}) => {
  const history = useHistory();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = useCallback(async () => {
    setPlaces(JSON.parse(await localStorage.getItem("place")));
    console.log("data", JSON.parse(await localStorage.getItem("place")));
  }, [setPlaces]);

  return (
    <div>
      {useMemo(
        () => (
          <div>
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tên địa điểm</th>
                  <th scope="col">Ảnh</th>
                  <img type="button" class='plus' src={plus} alt=""/>

                </tr>
              </thead>
              <tbody>
                {places.map((item, index) => (
                  <tr>
                    <th scope="row">{index}</th>
                    <td>{item.place}</td>
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
        [places]
      )}
    </div>
  );
};

export default Place;
