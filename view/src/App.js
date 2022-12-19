import React from 'react';
import './styles/App.css';
import EntryPage from "./pages/EntryPage";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import NavBar from "./components/UI/navbar/NavBar";
import ErrorPage from "./pages/ErrorPage";
import {useDispatch, useSelector} from "react-redux";

function App() {

    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.token.auth)
    function getProtectedRoute(path, component) {
        if (!isAuth) {
            return <Route exact path={"/"} element={<EntryPage/>} />;
        }

        return <Route exact path={path} element={component} />;
    }

    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route exact path="/" element={<EntryPage/>}/>
                {/*<Route path="/main" element={<MainPage/>}/>*/}
                {getProtectedRoute("/main", <MainPage/>)}
                <Route path="*" element={<ErrorPage/>}/>
            </Routes>

        </BrowserRouter>
        // <div className="App">
        //     <EntryPage/>
        //
        // </div>
    );
}

export default App;
