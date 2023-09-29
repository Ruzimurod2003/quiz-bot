import React, {useEffect} from 'react';

const CountdownTimer = ({remainingTime, setRemainingTime, endOfTime}) => {


    useEffect(() => {
        const updateInterval = setInterval(() => {
            if (remainingTime > 0) {
                setRemainingTime(remainingTime - 1);
            } else {
                clearInterval(updateInterval);
            }
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(updateInterval);
    }, [remainingTime]);

    // Calculate minutes and seconds
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    if (seconds === 0 && minutes === 0 && endOfTime != null) {
        endOfTime();
    }
    // Format the remaining time as MM:SS
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return <p className="font-semibold text-md ">{formattedTime}</p>;
};

export default CountdownTimer;
