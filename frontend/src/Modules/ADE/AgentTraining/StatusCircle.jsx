import React, { useState, useEffect } from 'react';
import './StatusCircle.scss'; // Import the SCSS file for styling

const StatusCircle = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate a loading process
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // 2 seconds loading time

        return () => clearTimeout(timer);
    }, []);

    return (<>
        
        {isLoading ? <div
            className='status-circle loading'
        >
        </div> : <span className="checkmark">✔</span>}
    </>
    );
};

export default StatusCircle; 