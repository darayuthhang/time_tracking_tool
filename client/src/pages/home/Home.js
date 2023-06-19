import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import task_kru from '../../assets/task_kru.mp4';
import PricingCard from '../../component/pricing_card/PricingCard';

import ReactEndPoint from '../../constant/ReactEndPoint';

import styles from './home.module.css';

const Home = () => {
    const { user, isAuth } = useSelector((state) => state.authReducers)

    if(isAuth) return (<Navigate to={ReactEndPoint.TASK}/>)
    return (
        <div>

            <div className={`${styles['bg-color']} text-dark`} style={{ height: "100vh" }}>
                <div className=' '>
                    <header className=' container p-4'>
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
                    <main >
                        <div className='d-flex justify-content-center mb-3 mt-2 gap-5 flex-wrap'>
                            <PricingCard
                                firstText="Free"
                                secondText="Monthly"
                                thirdText="3 text messages"
                                fourthText="7 projects"
                                fifthText="Subscribe"
                                feeText="$0"
                                bgColor="bg-light"
                                buttonColor="btn-dark"
                            />
                            <PricingCard
                                firstText="Pro"
                                secondText="Monthly"
                                thirdText="200 text messages"
                                fourthText="300 projects"
                                fifthText="Subscribe"
                                feeText="$8"
                                bgColor="bg-dark"
                                textColor="text-white"
                                buttonColor="btn-light"
                            />
                        </div>
                     
                    </main>

                    <footer  className={`  bg-dark `}>
                        <div className='container p-4 mb-4 mt-4'>
                            <Row>
                                <Col>
                                    <div className="fs-5 text-white">Have a question?</div>
                                    <p className={`${styles['font-size']}`}>Contact our customer support team anytime via email</p>
                                    <Link className={`${styles['font-size']} mt-2 mb-2`}>
                                        <button className='btn btn-danger'>Customer Support</button>
                                        
                                    </Link>
                                </Col>
                            </Row>
                        </div>
                        <div className={`d-flex align-items-end gap-3 p-3 ${styles['footer']} `}>
                            <div className={styles['font-size']}>Copyright &copy;2023 TaskKru</div>
                            <Link
                                className={styles['font-size']}
                                to={ReactEndPoint.PRIVACY_POLICY}
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                className={styles['font-size']}

                                to={ReactEndPoint.TERM_CONDITION}
                            >
                                Terms & Conditions
                            </Link>
                            <Link
                                className={styles['font-size']}
                                to={ReactEndPoint.DISCLAIMER}
                            >
                                Disclaimer
                            </Link>
                        </div> 
                       
                      
                       
                    </footer>
                </div>
         
            </div>
        </div>  
      
    );
};

export default Home;
