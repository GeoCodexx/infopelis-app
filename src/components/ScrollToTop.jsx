import React, { useState, useEffect } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import './ScrollToTop.css';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 1000) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        });
    }, []);

    const goTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button className="btn-scrollTop" style={{display: isVisible ? 'block':'none'}} onClick={goTop}>
            <FaArrowCircleUp/>
        </button>
    );
}

export default ScrollToTop;