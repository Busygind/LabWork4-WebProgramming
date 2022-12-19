import React from 'react';
import classes from './MyButton.module.css';
const MyButton = ({children, ...props}) => {
    return (
        <button className={classes.myBtn} {...props}>
            {children}
        </button>
    );
};

export default MyButton;