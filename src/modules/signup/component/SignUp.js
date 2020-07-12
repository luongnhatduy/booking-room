import React,{useMemo, useState, useCallback} from "react";
import "./css/SignUp.scss";
import { useHistory } from "react-router-dom";

const SignUp = ({}) => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [passWord, setPassWord] = useState("");
    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState("")

    const handleChangeEmail = useCallback((event) =>{
      setShowAlert(false);
      setEmail(event.target.value);
    },[setEmail]);

    const handleChangePass = useCallback((event) =>{
      setShowAlert(false);
      setPassWord(event.target.value);
    },[setPassWord]);

    const handleChangeUserName = useCallback((event) =>{
      setShowAlert(false);
      setUserName(event.target.value);
    },[setUserName]);

    const handleChangePhone = useCallback((event) =>{
      setShowAlert(false);
      setPhoneNumber(event.target.value);
    },[setPhoneNumber]);

    const handleSignUp = useCallback(async()=> {   
      // localStorage.removeItem('account');
      // return
      if (email === "" || passWord === "" || userName === "" || phoneNumber === ""){
        setShowAlert(true);
        setAlert("Vui lòng điền đủ thông tin!!!");
        return;
      }

      const data = {
        email : email,
        passWord : passWord,
        userName : userName,
        phoneNumber : phoneNumber,
        id : JSON.parse(await localStorage.getItem('account'))?.length || 0
      }
      if(localStorage.getItem('account') !== null){
          const listAcc =JSON.parse(await localStorage.getItem('account'));
          const listEmail = listAcc.map(i => i.email);
          
          if (listEmail.indexOf(data.email) !== -1){
            setAlert('tài khoản đã tồn tại');
            setShowAlert(true);
            return;
          } 
          localStorage.setItem('account',JSON.stringify(JSON.parse(await localStorage.getItem('account')).concat(data)));
      }else{
          localStorage.setItem('account', JSON.stringify([data]));
      }
      console.log(JSON.parse(await localStorage.getItem('account')),'listAccount');
      localStorage.setItem('user', JSON.stringify(data));

      history.push("/");
    },[email, history, passWord, phoneNumber, userName])

  return (
    <div>
      {useMemo(
            () => (
            <div class="view-login">
              {
                !!showAlert &&
                  ( <div class="alert alert-danger" role="alert">
                      {alert}
                    </div>
                  )
              }
             
              <div class="view-content shadow p-3 mb-5 bg-white rounded">
                          <span >Đăng kí</span>
                          <input class="text-input " onChange={handleChangeEmail} placeholder="Email" />
                          <input class="text-input " onChange={handleChangePass}  placeholder="Mật khẩu" type="password"/>
                          <input class="text-input " onChange={handleChangeUserName} placeholder="Tên người dùng" />
                          <input class="text-input " onChange={handleChangePhone} placeholder="Số điện thoại" />

                          <div type="button" onClick={handleSignUp} class="bt-login">
                            <span> Đăng kis</span>
                          </div>
              </div>
            </div>
            ),
            [alert, handleChangeEmail, handleChangePass, handleChangePhone, handleChangeUserName, handleSignUp, showAlert]
          )}
    </div>
  );
};

export default SignUp;
