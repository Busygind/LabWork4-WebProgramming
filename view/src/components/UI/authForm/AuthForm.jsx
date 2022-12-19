import React, {useState} from 'react';
import MyInputText from "../inputText/MyInputText";
import MyButton from "../button/MyButton";
import Service from "../../../API/Service";
import {useDispatch, useSelector} from "react-redux";
import '../../../API/Service'
import {authorize, setToken} from '../../../store/tokenSlice'
import {useNavigate} from 'react-router-dom';
import classes from "./AuthForm.module.css";


const AuthForm = () => {
    const [user, setUser] = useState({login: '', password: ''})
    const [info, setInfo] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const tokenInState = useSelector(state => state.token.token)

    const signUp = (e) => {
        setInfo("")
        e.preventDefault()
        const status = Service.signUpReq(user.login, user.password)
            .then(res => {
                setInfo("Successfully signed up!")
                console.log('Success sign up')
            }).catch(function (error) {
                setInfo("Error during sign up, user already exist")
                console.log('Error during sign up')
            })
    }

    const signIn = (e) => {
        setInfo("")
        e.preventDefault()
        Service.signInReq(user.login, user.password)
            .then(token => {
                saveTokenToState(token)
                dispatch(authorize())
            })
            .then(a => navigate("/main"))
            .catch(error => {
                setInfo("Incorrect login or password!")
                console.log('Can not sign in')
            })

    }

    const saveTokenToState = (token) => {
        dispatch(setToken(token))
        console.log(tokenInState)
    }

    return (
        <form className={classes.authForm}>
            <MyInputText
                value={user.login}
                type={"text"}
                onChange={e => setUser({...user, login: e.target.value})}
                placeholder={"ENTER LOGIN"}/>
            <MyInputText
                value={user.password}
                type={"password"}
                onChange={e => setUser({...user, password: e.target.value})}
                placeholder={"ENTER PASSWORD"}/>
            <div className={classes.buttons_container}>
                <MyButton onClick={signUp}>Sign up</MyButton>
                <MyButton onClick={signIn}>Sign in</MyButton>
            </div>
            <div className={classes.buttons_container}>
                {info}
            </div>
        </form>
    );
};

export default AuthForm;