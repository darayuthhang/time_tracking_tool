import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import Disclaimer from '../disclaimer/Disclaimer';
import PrivacyPolicy from '../privacy_policy/PrivacyPolicy';
import TermCondition from '../term_condition/TermCondition';
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
                    <div className='d-flex justify-content-center gap-3'>
                        <Link 
                            to={ReactEndPoint.PRIVACY_POLICY}
                        > 
                            Privacy Policy
                        </Link>
                        <Link
                            to={ReactEndPoint.TERM_CONDITION}
                        >
                            Term & Condition
                        </Link>
                        <Link
                            to={ReactEndPoint.DISCLAIMER}
                        >
                            Disclaimer
                        </Link>
                    </div>
                    {/* <TermCondition 
                        name="Taskkru"
                    />
                    <PrivacyPolicy /> */}
                    footer
                </footer>
            </div>
        </div>  
      
    );
};

export default Home;
