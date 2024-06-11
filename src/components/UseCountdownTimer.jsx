import { useState, useEffect } from 'react';

const useCountdownTimer = (startTime, endTime) => {
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const now = new Date();
    let duration;

    if (now < startTime) {
      duration = (endTime - startTime) / 1000;
    } else if (now >= startTime && now <= endTime) {
      duration = (endTime - now) / 1000;
    } else {
      duration = 0;
    }

    setRemainingTime(duration);

    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, endTime]);

  return remainingTime;
};

export default useCountdownTimer;
