import React, {useState} from 'react';
import MyInputText from "../inputText/MyInputText";
import MyButton from "../button/MyButton";
import classes from './VariablesForm.module.css';
import Service from "../../../API/Service";
import {useDispatch, useSelector} from "react-redux";
import {addHit, changeR} from "../../../store/tokenSlice";
import Validator from "../../../util/Validator";

import validImg from "../../../util/images/valid.png";
import invalidImg from "../../../util/images/invalid.png";

const VariablesForm = () => {
    const [hit, setHit] = useState({x: '0', y: '0', r: '1', timezoneOffset: (new Date()).getTimezoneOffset()})
    const token = useSelector(state => state.token.token)
    const hits = useSelector(state => state.token.hits)
    const dispatch = useDispatch()
    const [validInfo, setValidInfo] = useState({error: '', success: true})
    const [xValidInfo, setXValidInfo] = useState({error: '', success: true})
    const [yValidInfo, setYValidInfo] = useState({error: '', success: true})
    const [rValidInfo, setRValidInfo] = useState({error: '', success: true})
    const clearFields = (e) => {
        e.preventDefault()
        hit.x = '0'
        hit.y = '0'
        hit.r = '1'
        setHit({x: '0', y: '0', r: '1', timezoneOffset: (new Date()).getTimezoneOffset()})
    }

    const sendHit = (e) => {
        e.preventDefault()
        setValidInfo(Validator.variablesIsValid(hit.x, hit.y, hit.r))
        if (validInfo.success) {
            Service.sendHit(hit, token)
                .then(res => saveHitToState(res))
                .then(a => console.log(hits))
        } else {
            console.log(validInfo.error)
        }

        //console.log(hit)
    }

    const saveHitToState = (hit) => {
        dispatch(addHit(hit))
    }

    return (
        <form className={classes.varForm}>
            <label> Enter X: </label>
            <div className={classes.varRow}>
                <MyInputText
                    value={hit.x}
                    onChange={e => {
                        setHit({...hit, x: e.target.value})
                        setValidInfo(Validator.variablesIsValid(e.target.value, hit.y, hit.r))
                        setXValidInfo(Validator.xIsValid(e.target.value))
                        setYValidInfo(Validator.yIsValid(hit.y))
                        setRValidInfo(Validator.rIsValid(hit.r))
                    }}
                />
                {xValidInfo.success ? <img src={validImg} width="17px"/> : <img src={invalidImg} width="17px"/>}
            </div>
            <label> Enter Y: </label>
            <div className={classes.varRow}>
                <MyInputText
                    value={hit.y}
                    onChange={e => {
                        setHit({...hit, y: e.target.value})
                        setValidInfo(Validator.variablesIsValid(hit.x, e.target.value, hit.r))
                        setXValidInfo(Validator.xIsValid(hit.x))
                        setYValidInfo(Validator.yIsValid(e.target.value))
                        setRValidInfo(Validator.rIsValid(hit.r))
                    }}
                />
                {yValidInfo.success ? <img src={validImg} width="17px"/> : <img src={invalidImg} width="17px"/>}
            </div>
            <label> Enter R: </label>
            <div className={classes.varRow}>
                <MyInputText
                    value={hit.r}
                    onChange={e => {
                        setHit({...hit, r: e.target.value})
                        setValidInfo(Validator.variablesIsValid(hit.x, hit.y, e.target.value))
                        setRValidInfo(Validator.rIsValid(e.target.value))
                        if (Validator.rIsValid(e.target.value).success) {
                            dispatch(changeR(e.target.value))
                        }
                    }}
                />
                {rValidInfo.success ? <img src={validImg} width="17px"/> : <img src={invalidImg} width="17px"/>}
            </div>
            <div className={classes.buttons_block}>
                <MyButton onClick={clearFields}>Reset</MyButton>
                <MyButton onClick={sendHit} disabled={!validInfo.success}>Submit</MyButton>
            </div>
        </form>
    );
};

export default VariablesForm;