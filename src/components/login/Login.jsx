import React from "react";
import './login.css';
import shoppingCart from "../../assets/shopping-cart 1.png";
import Logform from "../forms/Login-form/Logform";


const Login = () => {
    return (
        <div className="login-container">
            <div className="login-section login_leftSide">
                <img src={shoppingCart} alt="cart" />
                <h1>MOBI MARKET</h1>
            </div>
            <div className="login-rigthSide">
                <Logform />
            </div>
        </div>
    )
};

export default Login;