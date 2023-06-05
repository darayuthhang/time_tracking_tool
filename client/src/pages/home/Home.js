import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PrivacyPolicy from '../../component/privacy_policy/PrivacyPolicy';
import TermCondition from '../../component/term_condition/TermCondition';
import ReactEndPoint from '../../constant/ReactEndPoint';

import styles from './home.module.css';
const Home = () => {
    const { user, isAuth } = useSelector((state) => state.authReducers)
    if(isAuth) return (<Navigate to={ReactEndPoint.TASK}/>)
    return (
        <div>
         
            <div className={` ${styles['bg-color']} text-dark`} style={{ height: "100vh" }}>
                Home
                <header>
                    header
                </header>
                <main>
                    main
                </main>
                <footer>
                    <TermCondition 
                        name="Taskkru"
                    />
                    <PrivacyPolicy />
                    footer
                </footer>
            </div>
        </div>  
      
    );
};

export default Home;
