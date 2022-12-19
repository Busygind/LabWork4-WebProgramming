import React from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../../store/tokenSlice";

const NavBar = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.token.auth)
    const navigate = useNavigate()
    const logoutFun = (e) => {
        dispatch(logOut())
        navigate("/")
    }

    return (
        <div className="navbar">
            <div className="navbar__links">
                {isAuth ? (<button style={{background: "#252A34", borderRadius: 5, borderColor: "#252A34", color: "#f3f2f2"}} onClick={logoutFun} > Logout </button>) : <div/>}
            </div>
        </div>
    );
};

export default NavBar;