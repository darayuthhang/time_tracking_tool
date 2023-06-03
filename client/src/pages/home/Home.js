import React from 'react';

import styles from './home.module.css';
const Home = () => {
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
                    footer
                </footer>
            </div>
        </div>  
      
    );
};

export default Home;
