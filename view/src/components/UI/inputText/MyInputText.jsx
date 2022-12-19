import React from 'react';
import classes from "./MyInputText.module.css";
const MyInputText = (props) => {
    return (
        <input className={classes.myInput} {...props} >
        </input>
    );
};

export default MyInputText;