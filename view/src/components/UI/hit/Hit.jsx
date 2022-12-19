import React, {useState} from 'react';
import classes from './Hit.module.css'

const Hit = (hit) => {

    const [time, setTime] = useState(hit.timestamp.substr(0, 10) + ' ' + hit.timestamp.substr(11, 8))

    return (
        <tr>
            <td className={classes.attribute}>
                {hit.x}
            </td>
            <td className={classes.attribute}>
                {hit.y}
            </td>
            <td className={classes.attribute}>
                {hit.r}
            </td>
            <td className={classes.attribute}>
                {time}
            </td>
            <td className={classes.attribute}>
                {hit.result ? "TRUE" : "FALSE"}
            </td>
        </tr>
    );
};

export default Hit;