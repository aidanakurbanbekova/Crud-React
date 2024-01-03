import React from "react";
import styles from "./App.module.scss"
import {Link, Route, Routes,} from 'react-router-dom';
import Crud from './componets/crud';
import Home from "./componets/home";

const App = () => {
    return (
        <div>
            <header>
                <nav className={styles['nav-bar']}>
                    <Link to={'/'}>Home</Link>
                    <Link to={'/crud'}>Crud</Link>
                </nav>
            </header>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/crud" element={<Crud/>}/>
            </Routes>
        </div>

    );
};

export default App;

