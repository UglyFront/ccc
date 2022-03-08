import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Login() {

    let user = useSelector(state => state.reducer.user)


    if (user.id === undefined) {
        return (
            <Link to = "/login"><div id = "login">
                  <p>LOGIN</p>
              </div></Link>
            );
    }
    else {
        return (
            <Link to = "/cab"><div id = "cab">
                  <p>CABINETS</p>
              </div></Link>
            );
    }
  }
  
  export default Login;
  