import React from "react";
import background from "../images/background.svg";

function Login() {
    function createAccount() {
        
    }

    return (
        <div className="App">
          <img  src={background}></img>

          <div className="flex-container">
          <input type="text" placeholder="Username"></input>

          <input type="text" placeholder="Password"></input>
          <input type="text" placeholder="Verify Password"></input>

          <button onClick={createAccount} type="button">Create Account</button>
          </div>

          
        </div>
      );
      

}

export default Login;