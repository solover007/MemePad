"use client";
import { useEffect, useState, useRef } from "react";

export const calculateTimeLeft = (target) => {
  const difference = +new Date(target) - +new Date();
  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      ),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      finished: false,
    };
  } else {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
  }
};

// Usage:
//   const { days, hours, minutes, seconds } = useCountDown("2024-03-29T15:00:00");
const useCountDown = (target) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(target));
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!target || isNaN(new Date(target).getTime())) return;

    const updateCountDown = () => {
      const newTimeLeft = calculateTimeLeft(target);
      setTimeLeft(newTimeLeft);
    };

    updateCountDown();
    intervalRef.current = setInterval(updateCountDown, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [target]);

  if (!target || isNaN(new Date(target).getTime())) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      finished: true,
    };
  }

  return timeLeft;
};

export default useCountDown;
