import React, {useEffect} from 'react';
import classes from './HitsTable.module.css'
import {useDispatch, useSelector} from "react-redux";
import Hit from "../hit/Hit";
import {addHit, clearHits} from "../../../store/tokenSlice";
import Service from "../../../API/Service";
const HitsTable = () => {
    const hits = useSelector(state => state.token.hits)
    const token = useSelector(state => state.token.token)
    const dispatch = useDispatch()
    useEffect(()=>{getData();},[]);

    const getData = () => {
        Service.getHitsForUser(token).then(res => {
            const hitsFromServer = res
            hitsFromServer.map(hit => dispatch(addHit(hit)))
            console.log(hitsFromServer)
        })
    }
    const deleteHits = (e) => {
        e.preventDefault()
        dispatch(clearHits())
        Service.removeHitsByUser(token).then(res => {
            console.log("Hits successfully deleted!")
        }).catch(function (error) {
            console.log("Cant delete hits")
        })
    }

    return (
        <div className={classes.table_container}>
            <table className={classes.table}>
                <thead>
                <tr>
                    <td className={classes.header}>X</td>
                    <td className={classes.header}>Y</td>
                    <td className={classes.header}>R</td>
                    <td className={classes.header}>Current time</td>
                    <td className={classes.header}>Result</td>
                </tr>
                </thead>
                <tbody>
                {
                    hits.map(hit => {
                        return (
                            <Hit {...hit}/>
                        );
                    })
                }
                </tbody>
            </table>
            <button className={classes.clear_button} onClick={deleteHits}>Clean table</button>
        </div>
    );
};

export default HitsTable;