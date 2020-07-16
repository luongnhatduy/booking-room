import React, { useMemo, useState, useCallback, useEffect } from "react";
import "./css/Admin.scss";
import { useHistory } from "react-router-dom";
import plus from "../../../assets/img/plus.png"
import edit from "../../../assets/img/edit.png"
import del from "../../../assets/img/delete.png"

const HomeStay = ({}) => {
  const history = useHistory();
  const [homeStays, setHomeStays] = useState([]);
  const [listPlace, setListPlace] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [place, setPlace] = useState("Địa điểm");
  const [placeId, setPlaceId] = useState();
  const [img, setImg] = useState("");
  const [typeModal ,setTypeModal] = useState();
  const [itemHomeStay,setItemHomeStay] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = useCallback(async () => {
    setHomeStays(JSON.parse(await localStorage.getItem("homeStay")));
    setListPlace(JSON.parse(await localStorage.getItem("place")));
    console.log("data", JSON.parse(await localStorage.getItem("homeStay")));
  }, []);

  const handleChangeTitle = useCallback((event) =>{
    setTitle(event.target.value);
  },[setTitle]);

  const handleChangeDescription = useCallback((event) =>{
    setDescription(event.target.value);
  },[setDescription]);

  const handleChangePrice = useCallback((event) =>{
    setPrice(event.target.value);
  },[setPrice]);

  const handleChangeImg = useCallback((event) =>{
    setImg(event.target.value);
  },[setImg]);

  const handleChangePlace = useCallback((item) =>{
    setPlace(item.place);
    setPlaceId(item.id);
  },[]);

  const handleChangeAddress = useCallback((event) =>{
    setAddress(event.target.value);
  },[setAddress]);

  const openModal = useCallback((type,item) =>{
    setTypeModal(type);
    setItemHomeStay(item);
  },[setTypeModal]);


  const delHomeStay = useCallback(async(index) =>{
    const data = JSON.parse(await localStorage.getItem('homeStay'));
    data.splice(index,1);
    const newData = data.map((elem,n)=>{
      if(n >= index){
        elem.id -= 1;
      }
      return elem;
    })
    localStorage.setItem('homeStay',JSON.stringify(newData));
    getData();
  },[getData]);

  const updateHomeStay = useCallback(async()=>{
    if(typeModal === "Thêm Home Stay mới"){
      const data = {
        title : title,
        description : description,
        price : price,
        placeId : placeId,
        img : img,
        address : address,
        id : JSON.parse(await localStorage.getItem('homeStay'))?.length || 0
      }
      
      if(localStorage.getItem('homeStay') !== null){
         localStorage.setItem('homeStay',JSON.stringify(JSON.parse(await localStorage.getItem('homeStay')).concat(data)));
      }else{
         localStorage.setItem('homeStay', JSON.stringify([data]));
      }
      getData();
      return;
    }
    const data = {
      title : title,
      description : description,
      price : price,
      placeId : placeId,
      img : img,
      address : address,
      id : itemHomeStay.id
    }

    const dataReplace = JSON.parse(await localStorage.getItem('homeStay'))
    dataReplace.splice(itemHomeStay.id,1);
    dataReplace.splice(itemHomeStay.id,0,data);
    localStorage.setItem('homeStay', JSON.stringify(dataReplace));
    getData();
  },[address, description, getData, img, itemHomeStay, placeId, price, title, typeModal])

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

                  <img type="button" onClick={()=> openModal('Thêm Home Stay mới')} class='plus' data-toggle="modal" data-target="#exampleModal" src={plus} alt=""/>
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

                    <img onClick={()=> openModal('Sửa thông tin Home Stay',item)} data-toggle="modal" data-target="#exampleModal" type="button" class='edit' src={edit} alt=""/>
                    <img onClick={()=> delHomeStay(index)} type="button" class='delete' src={del} alt=""/>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
        [delHomeStay, homeStays, openModal]
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
                  <input class="text-input " onChange={handleChangeTitle} placeholder="Tiêu đề" />
                  <input class="text-input " onChange={handleChangeDescription} placeholder="Mô tả" />
                  <input class="text-input " onChange={handleChangePrice} placeholder="Giá" />
                  <div class=" text-input">
                    <div class="" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span class="text-dropdown">{place}</span>
                    </div>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      {
                        listPlace && listPlace.map((item)=>(
                          <a onClick={()=>handleChangePlace(item)} class="dropdown-item" href="#">{item.place}</a>
                        ))
                      }
                    </div>
                  </div>
                  <input class="text-input " onChange={handleChangeAddress} placeholder="Địa chỉ" />
                  <input class="text-input " onChange={handleChangeImg} placeholder="Link ảnh" />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button data-dismiss="modal" onClick={updateHomeStay} type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      ),[handleChangeDescription, handleChangeImg, handleChangePlace, handleChangePrice, handleChangeTitle, listPlace, place, typeModal, updateHomeStay])}
    </div>
  );
};

export default HomeStay;
