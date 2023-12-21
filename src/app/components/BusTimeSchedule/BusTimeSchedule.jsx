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
        console.log('TimeTableData:', data)
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
    console.log('Current Time: ', currentTime)

    const closestBusTime = (schedule || [])
      .map((time) => {
        const [hour, minute] = time.split(':').map(Number);
        const timeInMinutes = hour * 60 + minute;

        // 現在の時刻よりも未来の時刻のみを考慮する
        return timeInMinutes >= currentTime ? timeInMinutes : Infinity;
      })
      .reduce((closest, time) => Math.min(time, closest), Infinity);

    console.log('Closest Bus Time: ', closestBusTime)
    setClosestTime(closestBusTime);
  }, [schedule]);

  useEffect(() => {
    const calculateCountdown = () => {
      if (closestTime !== null) {
        const currentDateTime = new Date();

        // UTC時間で計算する
        const currentMillis = currentDateTime.getTime();
        const busTimeMillis = new Date(currentDateTime);

        // closestTimeは分単位のため、ミリ秒に変換して加算
        busTimeMillis.setHours(Math.floor(closestTime / 60));
        busTimeMillis.setMinutes(closestTime % 60);
        busTimeMillis.setSeconds(0);
        busTimeMillis.setMilliseconds(0);

        const countdownMillis = busTimeMillis - currentMillis;

        console.log('currentMillis:', currentMillis);
        console.log('busTimeMillis:', busTimeMillis.getTime());
        console.log('countdownMillis:', countdownMillis);

        return countdownMillis < 0 ? null : countdownMillis;
      }

      return null;
    };

    const updateCountdown = () => {
      const countdownValue = calculateCountdown();
      console.log('CountDown Value: ', countdownValue)
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
    <div className={styles.container}>
      <h1>Next Bus Schedule</h1>
      {closestTime !== null ? (
        <div>
          <p>次のバス: {formatBusTime(closestTime)}</p>
          <p>発車まで</p>
          <p className={styles.clock}>{formatCountdown(countdown)}</p>
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

