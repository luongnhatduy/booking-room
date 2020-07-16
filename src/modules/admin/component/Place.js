import React, { useMemo, useState, useCallback, useEffect } from "react";
import "./css/Admin.scss";
import { useHistory } from "react-router-dom";
import plus from "../../../assets/img/plus.png"
import edit from "../../../assets/img/edit.png"
import del from "../../../assets/img/delete.png"

const Place = ({}) => {
  const history = useHistory();
  const [places, setPlaces] = useState([]);
  const [place, setPlace] = useState("");
  const [img, setImg] = useState("");
  const [typeModal ,setTypeModal] = useState();
  const [itemPlace ,setItemPlace] = useState();


  useEffect(() => {
    getData();
  }, []);

  const getData = useCallback(async () => {
    setPlaces(JSON.parse(await localStorage.getItem("place")));
    console.log("data", JSON.parse(await localStorage.getItem("place")));
  }, [setPlaces]);

  const handleChangePlace = useCallback((event) =>{
    setPlace(event.target.value);
  },[setPlace]);


  const handleChangeImg = useCallback((event) =>{
    setImg(event.target.value);
  },[setImg]);

  const openModal = useCallback((type,item) =>{
    setTypeModal(type);
    setItemPlace(item);
  },[setTypeModal]);

  const delPlace = useCallback(async(index) =>{
    const data = JSON.parse(await localStorage.getItem('place'));
    data.splice(index,1);
    const newData = data.map((elem,n)=>{
      if(n >= index){
        elem.id -= 1;
      }
      return elem;
    })
    localStorage.setItem('place',JSON.stringify(newData));
    getData();
  },[getData]);

  const updatePlace = useCallback(async()=>{
    if(typeModal === "Thêm địa điểm"){
      const data = {
        place : place,
        img : img,
        id : JSON.parse(await localStorage.getItem('place'))?.length || 0
      }
      if(localStorage.getItem('place') !== null){
          localStorage.setItem('place',JSON.stringify(JSON.parse(await localStorage.getItem('place')).concat(data)));
      }else{
          localStorage.setItem('place', JSON.stringify([data]));
      }
      getData();
      return;
    }
    const data = {
      place : place,
      img : img,
      id : itemPlace.id
    }

    const dataReplace = JSON.parse(await localStorage.getItem('place'))
    dataReplace.splice(itemPlace.id,1);
    dataReplace.splice(itemPlace.id,0,data);
    localStorage.setItem('place', JSON.stringify(dataReplace));
    getData();
  },[getData, img, itemPlace, place, typeModal])


  return (
    <div>
      {useMemo(
        () => (
          <div>
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Id</th>
                  <th scope="col">Tên địa điểm</th>
                  <th scope="col">Ảnh</th>
                  <img type="button" onClick={()=> openModal('Thêm địa điểm')} class='plus' data-toggle="modal" data-target="#exampleModal" src={plus} alt=""/>

                </tr>
              </thead>
              <tbody>
                {places && places.map((item, index) => (
                  <tr>
                    <th scope="row">{index}</th>
                    <td>{item.id}</td>
                    <td>{item.place}</td>
                    <td>
                       <img type="button" class='img' src={item.img} alt=""/>
                    </td>
                    <img onClick={()=> openModal('Sửa địa điểm',item)} data-toggle="modal" data-target="#exampleModal" type="button" class='edit' src={edit} alt=""/>
                    <img onClick={()=> delPlace(index)} type="button" class='delete' src={del} alt=""/>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
        [delPlace, openModal, places]
      )}

      {useMemo(()=>(
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{typeModal}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                  <input class="text-input " onChange={handleChangePlace} placeholder="tên địa điểm" />
                  <input class="text-input " onChange={handleChangeImg} placeholder="link ảnh" />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button data-dismiss="modal" onClick={updatePlace} type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      ),[handleChangeImg, handleChangePlace, typeModal, updatePlace])}
    </div>
  );
};

export default Place;
