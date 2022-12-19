import React from 'react';
import VariablesForm from "../components/UI/variablesForm/VariablesForm";
import {connect, useSelector} from "react-redux";
import Graph from "../components/UI/graph/Graph";
import classes from '../styles/MainPage.module.css'
import HitsTable from "../components/UI/hitsTable/HitsTable";

const MainPage = () => {
    const r = useSelector(state => state.token.r)

    const coords = {
        x: 2,
        y: 2,
        r: r
    }

    return (
        <div className={classes.main_container}>
            <Graph coords={coords}   />
            <VariablesForm/>
            <HitsTable/>
        </div>
    );
};

export default connect()(MainPage);