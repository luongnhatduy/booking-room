import React,{useMemo} from "react";
import "./css/Login.scss";
import { useHistory } from "react-router-dom";

const Login = ({}) => {
    const history = useHistory();

    const handleLogin = ()=> {
      history.push("/");
    }

  return (
    <div class="view-login">
        <div class="view-content shadow p-3 mb-5 bg-white rounded">
                     <span >Đăng nhập</span>
                     <input class="text-input "  placeholder="Email" />
                     <input class="text-input "  placeholder="Mật khẩu" />

                     <div type="button" onClick={handleLogin} class="bt-login">
                      <span> Đăng nhập</span>
                     </div>
        </div>
    </div>
  );
};

export default Login;
