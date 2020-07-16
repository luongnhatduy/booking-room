import React, { useMemo, useState, useCallback, useEffect } from "react";
import "./css/Admin.scss";
import { useHistory } from "react-router-dom";
import plus from "../../../assets/img/plus.png"
import edit from "../../../assets/img/edit.png"
import del from "../../../assets/img/delete.png"

const Account = ({}) => {
  const history = useHistory();
  const [accounts, setAccounts] = useState([]);
  const [email, setEmail] = useState("");
  const [indexAcc, setIndexAcc] = useState(0);

  const [passWord, setPassWord] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [typeModal ,setTypeModal] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = useCallback(async () => {
    setAccounts(JSON.parse(await localStorage.getItem("account")));
    console.log("data", JSON.parse(await localStorage.getItem("account")));
  }, []);

  const handleChangeEmail = useCallback((event) =>{
    setEmail(event.target.value);
  },[setEmail]);


  const handleChangeUserName = useCallback((event) =>{
    setUserName(event.target.value);
  },[setUserName]);

  const handleChangePhone = useCallback((event) =>{
    setPhoneNumber(event.target.value);
  },[setPhoneNumber]);

  const handleChangePass = useCallback((event) =>{
    setPassWord(event.target.value);
  },[setPassWord]);

  const openModal = useCallback((type,item) =>{
    setTypeModal(type);
    setIndexAcc(item);
  },[setTypeModal,setIndexAcc]);

  const delAccount = useCallback(async(index) =>{
    const data = JSON.parse(await localStorage.getItem('account'));
    data.splice(index,1);
    const newData = data.map((elem,n)=>{
      if(n >= index){
        elem.id -= 1;
      }
      return elem;
    })
    localStorage.setItem('account',JSON.stringify(newData));
    getData();
  },[getData]);

  const updateAccount = useCallback(async()=>{
    if(typeModal === "Thêm tài khoản"){
      const data = {
        email : email,
        passWord : passWord,
        userName : userName,
        phoneNumber : phoneNumber,
        id : JSON.parse(await localStorage.getItem('account'))?.length || 0
      }
      if(localStorage.getItem('account') !== null){
          localStorage.setItem('account',JSON.stringify(JSON.parse(await localStorage.getItem('account')).concat(data)));
      }else{
          localStorage.setItem('account', JSON.stringify([data]));
      }
      getData();
      return;
    }
    const data = {
      email : email,
      passWord : indexAcc.passWord,
      userName : userName,
      phoneNumber : phoneNumber,
      id : indexAcc.id
    }

    const dataReplace = JSON.parse(await localStorage.getItem('account'))
    dataReplace.splice(indexAcc.id,1);
    dataReplace.splice(indexAcc.id,0,data);
    localStorage.setItem('account', JSON.stringify(dataReplace));
    getData();
  },[email, getData, indexAcc, passWord, phoneNumber, typeModal, userName])

  return (
    <div>
      {useMemo(
        () => (
          <div>
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">id</th>
                  <th scope="col">Họ Tên</th>
                  <th scope="col">Email</th>
                  <th scope="col">SDT</th>
                  <img type="button" onClick={()=> openModal('Thêm tài khoản')} class='plus' data-toggle="modal" data-target="#exampleModal" src={plus} alt=""/>

                </tr>
              </thead>
              <tbody>
                { accounts && accounts.length > 0 && accounts.map((item, index) => (
                  <tr>
                    <th scope="row">{index}</th>
                    <td>{item.id}</td>
                    <td>{item.userName}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneNumber}</td>
                    <img onClick={()=> openModal('Sửa tài khoản',item)} data-toggle="modal" data-target="#exampleModal" type="button" class='edit' src={edit} alt=""/>
                    <img onClick={()=> delAccount(index)} type="button" class='delete' src={del} alt=""/>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
        [accounts, delAccount, openModal]
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
                  <input class="text-input " onChange={handleChangeEmail} placeholder="Email" />
               {typeModal === "Sửa tài khoản" ? null :  <input class="text-input " onChange={handleChangePass}  placeholder="Mật khẩu" type="password"/>}
                  <input class="text-input " onChange={handleChangeUserName} placeholder="Tên người dùng" />
                  <input class="text-input " onChange={handleChangePhone} placeholder="Số điện thoại" />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button data-dismiss="modal" onClick={updateAccount} type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      ),[handleChangeEmail, handleChangePass, handleChangePhone, handleChangeUserName, typeModal, updateAccount])}
    </div>
  );
};

export default Account;
