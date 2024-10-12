import React, { useEffect, useState } from 'react';

const Counter = () => {
    const [announce, setAnnounce] = useState(true)
    const [time, setTime] = useState({
        days: 10,
        hours: 0,
        minutes: 0,
        seconds: 5,
    })

    useEffect(() => {
        const interval = setInterval(() => {
            const { days, hours, minutes, seconds } = time;
            // Decrement logic
            if (seconds > 0) {
                setTime((prevTime) => ({ ...prevTime, seconds: prevTime.seconds - 1 }));
            } else if (minutes > 0) {
                setTime((prevTime) => ({ ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 }));
            } else if (hours > 0) {
                setTime((prevTime) => ({ ...prevTime, hours: prevTime.hours - 1, minutes: 59, seconds: 59 }));
            } else if (days > 0) {
                setTime((prevTime) => ({ ...prevTime, days: prevTime.days - 1, hours: 23, minutes: 59, seconds: 59 }));
            } else {
                clearInterval(interval);
                setAnnounce(false);
            }
        }, 1000);

        

        return () => clearInterval(interval); 
    }, [time])
        
  return (
    <div className='counterSection p-5'>
      <div className="content size-full flex items-center justify-center flex-col">
        <h3 className='text-5xl text-light text-center font-semibold mb-10'>
           { announce ? 'Tournament Start' : 'Entries Closed'}
        </h3>
        <div className="counting flex flex-col md:flex-row gap-5">
            <div className="days h-28 px-5 rounded bg-primary text-light flex items-center justify-center text-3xl font-semibold p-2 text-center">
                {time.days} Days
            </div>
            <div className="hours h-28 px-5 rounded bg-primary text-light flex items-center justify-center text-3xl font-semibold p-2 text-center">
                {time.hours} Hours
            </div>
            <div className="mins h-28 px-5 rounded bg-primary text-light flex items-center justify-center text-3xl font-semibold p-2 text-center">
                {time.minutes} Mins
            </div>
            <div className="secs h-28 px-5 rounded bg-primary text-light flex items-center justify-center text-3xl font-semibold p-2 text-center">
                {time.seconds} Secs
            </div>
        </div>
      </div>
    </div>
  );
}

export default Counter;
