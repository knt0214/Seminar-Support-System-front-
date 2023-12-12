'use client'

import { useState, useEffect } from 'react';
import styles from './page.module.css';

const BusTimeSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [closestTime, setClosestTime] = useState(null);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/bus-schedule.txt');
        const data = await response.text();
        const scheduleData = data.split('\n').filter((time) => time.trim() !== '');
        setSchedule(scheduleData);
      } catch (error) {
        console.error('Error fetching bus schedule:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const currentDateTime = new Date();
    const currentTime = currentDateTime.getHours() * 60 + currentDateTime.getMinutes();

    const closestBusTime = (schedule || [])
      .map((time) => {
        const [hour, minute] = time.split(':').map(Number);
        return hour * 60 + minute;
      })
      .reduce((closest, time) => (Math.abs(time - currentTime) < Math.abs(closest - currentTime) ? time : closest), Infinity);

    setClosestTime(closestBusTime);
  }, [schedule]);

  useEffect(() => {
    const calculateCountdown = () => {
      if (closestTime !== null) {
        const currentDateTime = new Date();
        const currentMillis =
          currentDateTime.getHours() * 60 * 60 * 1000 +
          currentDateTime.getMinutes() * 60 * 1000 +
          currentDateTime.getSeconds() * 1000;
        const busTimeMillis = closestTime * 60 * 1000;
        const countdownMillis = busTimeMillis - currentMillis;

        return countdownMillis < 0 ? null : countdownMillis;
      }

      return null;
    };

    const updateCountdown = () => {
      const countdownValue = calculateCountdown();
      setCountdown(countdownValue);
    };

    // カウントダウンを1秒ごとに更新
    const intervalId = setInterval(updateCountdown, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [closestTime]);

  const formatCountdown = (countdownMillis) => {
    if (countdownMillis !== null) {
      const minutes = Math.floor(countdownMillis / (60 * 1000));
      const seconds = Math.floor((countdownMillis % (60 * 1000)) / 1000);
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    return null;
  };

  return (
    <div>
      <h1>Next Bus Schedule</h1>
      {closestTime !== null ? (
        <div>
          <p>次のバス: {formatBusTime(closestTime)}</p>
          <p>発車まで: {formatCountdown(countdown)}</p>
        </div>
      ) : (
        <p>No upcoming bus schedule.</p>
      )}
    </div>
  );
};

const formatBusTime = (time) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

export default BusTimeSchedule;

