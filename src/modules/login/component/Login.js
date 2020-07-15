import React,{useMemo, useState, useCallback} from "react";
import "./css/Login.scss";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { SUPER_ADMIN } from "../../../ultils/constants";

const Login = ({}) => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [passWord, setPassWord] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState("");
    const location = useLocation();
    const homeStay = location.state?.homeStay ;
    const date = location.state?.date ;
    const count = location.state?.count ;

    const handleChangeEmail = useCallback((event) =>{
      setShowAlert(false);
      setEmail(event.target.value);
    },[setEmail]);

    const handleChangePass = useCallback((event) =>{
      setShowAlert(false);
      setPassWord(event.target.value);
    },[setPassWord]);

    const handleLogin = useCallback(async()=> {
      if (email === "" || passWord === "" ){
        setShowAlert(true);
        setAlert("Vui lòng điền đủ thông tin đăng nhập!!!");
        return;
      }
      if (email === SUPER_ADMIN.email && passWord === SUPER_ADMIN.passWord){
        history.push("/admin");
        return;
      }
      const listAcc =JSON.parse(await localStorage.getItem('account'));
      const listEmail = listAcc.map(i => i.email);
      const listPass = listAcc.map(i => i.passWord);

      if(listEmail.indexOf(email) !== -1 && listPass[listEmail.indexOf(email)] === passWord){
        localStorage.setItem('user', JSON.stringify(listAcc[listEmail.indexOf(email)]));
        if (homeStay){
          history.push("/booking_information",{homeStay : homeStay ,date : date, count : count});
          return;
        }
        history.push("/");
      }else{
        setShowAlert(true);
        setAlert("Email hoặc mật khẩu sai");
      }

    },[count, date, email, history, homeStay, passWord])

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
                        <span >Đăng nhập</span>
                        <input class="text-input " onChange={handleChangeEmail} placeholder="Email" />
                        <input class="text-input " onChange={handleChangePass}  placeholder="Mật khẩu" type="password"/>

                        <div type="button" onClick={handleLogin} class="bt-login">
                          <span> Đăng nhập</span>
                        </div>
            </div>
          </div>
          ),
          [alert, handleChangeEmail, handleChangePass, handleLogin, showAlert]
        )}
  </div>
  );
};

export default Login;
