import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import task_kru from '../../assets/task_kru.mp4';

import ReactEndPoint from '../../constant/ReactEndPoint';

import styles from './home.module.css';

const Home = () => {
    const { user, isAuth } = useSelector((state) => state.authReducers)

    if(isAuth) return (<Navigate to={ReactEndPoint.TASK}/>)
    return (
        <div>

            <div className={`${styles['bg-color']} text-dark`} style={{ height: "100vh" }}>
                Home
                <div className='container '>
                    <header className=' p-4'>
                        <Row>
                            <Col>
                                <h1 className='fw-bold'>Reminders at Your Fingertips!</h1>
                                <p>Never forget a task again! Seamlessly send timely reminders to your phone and inbox, keeping you on top of your game.</p>
                                <Link to={ReactEndPoint.SIGN_UP}>
                                    <Button className=' p-3 fw-bold'>Get Started for Free</Button>
                                </Link>
                                
                               
                            </Col>
                            <Col>
                                <video   width="750" height="100%" autoPlay loop muted>
                                    <source src={task_kru} type="video/mp4" className='' />
                                    {/* <source src="https://assets.mixkit.co/videos/preview/mixkit-tropical-island-landscape-view-4692-large.mp4" type="video/mp4" /> */}
                                </video>
                            </Col>
                        </Row>
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
        </div>  
      
    );
};

export default Home;
