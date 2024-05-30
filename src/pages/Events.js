import React, { useEffect, useState } from 'react';
import AccountLogin from '../components/AccountLogin';

function Events() {
    const [iframeHeight, setIframeHeight] = useState('1000px'); // Default height

    const updateHeightBasedOnWidth = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 540) {
        setIframeHeight('1500px'); // Smaller devices
        } else if (screenWidth > 1000) {
        setIframeHeight('1200px'); // Larger devices
        } else {
        setIframeHeight('1200px'); // Default for others
        }
    };

    useEffect(() => {
        updateHeightBasedOnWidth();
        window.addEventListener('resize', updateHeightBasedOnWidth);

        return () => {
        window.removeEventListener('resize', updateHeightBasedOnWidth);
        };
    }, []);

    return (
        <main className='wrapper opp-loans' id='main' tabIndex="-1">
            <div className='hero-banner'>
                <div className='hero' style={{backgroundImage: `url(https://res.cloudinary.com/dk6kie30d/image/upload/v1700256560/Aspen_Grove_on_Timp_1_909c322275.jpg)`}}>
                    <div className='grad-overlay'></div>
                    <div className='inner-container'>
                        <AccountLogin />
                        <div className='inner-hero'>
                            <h1>Events</h1>
                            <hr className='orange'></hr>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container mg-top-80 mg-bottom-50'>
                <h2 className='center orange'>Events</h2>
                <hr className='green center'></hr>
                <iframe
                src="https://form.jotform.com/241026755487058"
                title="JotForm"
                width="100%"
                style={{ height: iframeHeight }}
                frameBorder="0"
                />
            </div>
        </main>
    );
}

export default Events;
