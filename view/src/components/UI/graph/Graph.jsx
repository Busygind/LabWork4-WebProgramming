import React, {useState} from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import classes from './Graph.module.css'
import {addHit} from "../../../store/tokenSlice";
import Validator from "../../../util/Validator";
import Service from "../../../API/Service";

const Graph = (props) => {
    const dispatch = useDispatch()
    const hits = useSelector(state => state.token.hits)
    const [hit, setHit] = useState({x: '0', y: '0', r: '1', timezoneOffset: (new Date()).getTimezoneOffset()})
    const token = useSelector(state => state.token.token)
    const sendHit = (e) => {
        e.preventDefault()
        const hit = {
            x: ((e.nativeEvent.offsetX - 150) / 30).toFixed(2),
            y: ((150 - e.nativeEvent.offsetY) / 30).toFixed(2),
            r: props.coords.r,
            timezoneOffset: (new Date()).getTimezoneOffset()
        }
        const validInfo = Validator.variablesIsValid(hit.x, hit.y, hit.r)
        if (validInfo.success) {
            Service.sendHit({
                x: ((e.nativeEvent.offsetX - 150) / 30).toFixed(2),
                y: ((150 - e.nativeEvent.offsetY) / 30).toFixed(2),
                r: props.coords.r,
                timezoneOffset: (new Date()).getTimezoneOffset()
            }, token)
                .then(res => dispatch(addHit(res)))
                .then(a => console.log(hits))
        } else {
            console.log(validInfo.error)
        }
    }
    const onClick = (e) => {
        sendHit(e)
        console.log(((e.nativeEvent.offsetX - 150) / 30).toFixed(2))
        console.log(((150 - e.nativeEvent.offsetY) / 30).toFixed(2))
        console.log(props.coords.r)
        console.log((new Date()).getTimezoneOffset())
    }

    let { x, y, r } = props.coords;
    x *= 30;
    y *= 30;
    r *= 30;
    const circle = "M150," + (150 + r).toString() + " A" + (r).toString() + "," + (r).toString() + " 90 0,1 " + (150 - r).toString() + ",150 L 150,150 Z";
    const triangle = "M 150 150 L " + (150 + r).toString() + " 150 L 150 " + (150 + r).toString() + " z";
    return (
        <div className={classes.graph}>
            <svg xmlns="http://www.w3.org/2000/svg"
                 width="300"
                 height="300"
                 onClick={(e) => onClick(e)}
                 style={{cursor: "pointer"}}>
                <rect x={150 - r/2} y={150 - r} width={r/2} height={r} fill="#FF2E63"/>
                <path d={circle} fill="#FF2E63"/>
                <path d={triangle} fill="#FF2E63"/>
                <line x1="150" x2="150" y1="300" y2="0" stroke="#f3f2f2" strokeWidth="3"/>
                <line x1="0" x2="300" y1="150" y2="150" stroke="#f3f2f2" strokeWidth="3"/>
                <line x1="150" x2="145" y1="0" y2="10" stroke="#f3f2f2" strokeWidth="3"/>
                <line x1="150" x2="155" y1="0" y2="10" stroke="#f3f2f2" strokeWidth="3"/>
                <line x1="300" x2="290" y1="150" y2="145" stroke="#f3f2f2" strokeWidth="3"/>
                <line x1="300" x2="290" y1="150" y2="155" stroke="#f3f2f2" strokeWidth="3"/>
                <line x1={150 - r / 2} x2={150 - r / 2} y1="145" y2="155" stroke="#f3f2f2" strokeWidth="3"/>
                <line x1={150 - r} x2={150 - r} y1="145" y2="155" stroke="#f3f2f2" strokeWidth="3"/>
                <line x1={150 + r / 2} x2={150 + r / 2} y1="145" y2="155" stroke="#f3f2f2" strokeWidth="3"/>
                <line x1={150 + r} x2={150 + r} y1="145" y2="155" stroke="#f3f2f2" strokeWidth="3"/>
                <line x1="145" x2="155" y1={150 - r} y2={150 - r} stroke="#f3f2f2" strokeWidth="3"/>
                <line x1="145" x2="155" y1={150 - r / 2} y2={150 - r / 2} stroke="#f3f2f2" strokeWidth="3"/>
                <line x1="145" x2="155" y1={150 + r / 2} y2={150 + r / 2} stroke="#f3f2f2" strokeWidth="3"/>
                <line x1="145" x2="155" y1={150 + r} y2={150 + r} stroke="#f3f2f2" strokeWidth="3"/>
                <text x={145 - r} y="140" fill="#f3f2f2" fontWeight="bold">-R</text>
                <text x={145 + r} y="140" fill="#f3f2f2" fontWeight="bold">R</text>
                <text x="160" y={155 - r} fill="#f3f2f2" fontWeight="bold">R</text>
                <text x="160" y={155 + r} fill="#f3f2f2" fontWeight="bold">-R</text>
                {
                    hits.map(hit => {
                        return (
                            <circle cx={150 + hit.x * 30}
                                    cy={150 - hit.y * 30}
                                    r={3}
                                    fill={hit.result ? '#0af816' :'#070707'}
                            />
                        );
                    })
                }
            </svg>
        </div>
    )
}

export default connect()(Graph);

