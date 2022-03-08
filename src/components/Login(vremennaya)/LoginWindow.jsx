import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createRef } from "react";
import {logCheck}  from "../redux/action";

function LoginWidnow() {

    let dispatch = useDispatch()

    let login = createRef()
    let password = createRef()

    function reg() {
        let logValue = login.current.value
        let passValue = password.current.value
        
        if ((logValue && passValue) === '') {
            alert("Почему-то в формочках пусто :(")
        }
        else {
            alert("Сейчас проверим :)")
            dispatch(logCheck(logValue, passValue))
            // debugger
        }
    }

    return (
      <div id = "loginWindow">
          <div id="log">
              <h2>LOGIN</h2>

                <form action="">
                    <input ref = {login} type="text" placeholder="Login"/>
                    <input ref = {password} type="text" placeholder="Password"/>
                </form>


                <Link to = "/"> <div id="log_go" onClick={() => reg()}>GO!</div></Link>
          </div>

          <Link className="back-link" to = "/"><div id="back"><p>BACK</p></div></Link>
      </div>
    );
  }
  
  export default LoginWidnow;
  