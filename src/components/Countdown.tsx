import React, { useState, useEffect, useRef, useCallback } from 'react';

const Countdown: React.FC = () => {
  const SPEED = 150;
  const today = new Date();
  const currentYear = today.getFullYear();
  const WeddingDay = new Date(`${currentYear}-06-28T06:30:00`);
  const EXP_DATE = today <= WeddingDay ? WeddingDay : new Date(`${currentYear + 1}-06-28T06:30:00`);

  const [countdownValues, setCountdownValues] = useState({
    months: '00',
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  const refs = {
    months: [useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null)],
    days: [useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null)],
    hours: [useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null)],
    minutes: [useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null)],
    seconds: [useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null)],
  };

  const padTo2 = useCallback((num: number): string => {
    return num.toString().padStart(2, '0');
  }, []);

  const getCurrentDate = useCallback(() => {
    const currentDate = new Date();
    const timeDifference = EXP_DATE.getTime() - currentDate.getTime();

    if (timeDifference < 0) {
      return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const months = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { months, days, hours, minutes, seconds };
  }, [EXP_DATE]);

  const changeNum = useCallback((el: HTMLElement, newVal: string, timing: number) => {
    el.style.scale = '0';
    setTimeout(() => {
      el.innerText = '';
      el.style.translate = '0 -5rem';
      setTimeout(() => {
        el.style.scale = '1';
        el.innerText = newVal;
        setTimeout(() => {
          el.style.translate = '0';
        }, timing);
      }, timing);
    }, timing);
  }, []);

  const updateCountdownDisplay = useCallback(() => {
    const currentCounts = getCurrentDate();
    const newValues: { [key: string]: string } = {};
    let hasChanged = false;

    const units: Array<keyof typeof currentCounts> = ['months', 'days', 'hours', 'minutes', 'seconds'];

    units.forEach((unit, index) => {
      const paddedValue = padTo2(currentCounts[unit]);
      newValues[unit] = paddedValue;

      const currentDomValues = [
        refs[unit][0].current?.innerText,
        refs[unit][1].current?.innerText,
      ];

      paddedValue.split('').forEach((digit, i) => {
        const spanEl = refs[unit][i].current;
        if (spanEl && digit !== currentDomValues[i]) {
          changeNum(spanEl, digit, SPEED * (units.length - index));
          hasChanged = true;
        }
      });
    });

    if (hasChanged) {
      setCountdownValues(newValues as typeof countdownValues);
    }
  }, [getCurrentDate, padTo2, changeNum]);

  useEffect(() => {
    const initialCounts = getCurrentDate();
    const initialValues: { [key: string]: string } = {};

    ['months', 'days', 'hours', 'minutes', 'seconds'].forEach((unit) => {
      const paddedValue = padTo2(initialCounts[unit as keyof typeof initialCounts]);
      initialValues[unit] = paddedValue;

      refs[unit as keyof typeof refs][0].current!.innerText = paddedValue[0];
      refs[unit as keyof typeof refs][1].current!.innerText = paddedValue[1];
    });

    setCountdownValues(initialValues as typeof countdownValues);
    updateCountdownDisplay();

    const intervalId = setInterval(updateCountdownDisplay, 1000);
    return () => clearInterval(intervalId);
  }, [getCurrentDate, padTo2, updateCountdownDisplay]);

  return (
    <div className="countdown-wrapper">
      <h1>Days Till Wedding Day</h1>
      <div className="countdown">
        <div data-desc="months">
          <span ref={refs.months[0]}></span>
          <span ref={refs.months[1]}></span>
        </div>
        <div data-desc="days">
          <span ref={refs.days[0]}></span>
          <span ref={refs.days[1]}></span>
        </div>
        <div data-desc="hours">
          <span ref={refs.hours[0]}></span>
          <span ref={refs.hours[1]}></span>
        </div>
        <div data-desc="minutes">
          <span ref={refs.minutes[0]}></span>
          <span ref={refs.minutes[1]}></span>
        </div>
        <div data-desc="seconds">
          <span ref={refs.seconds[0]}></span>
          <span ref={refs.seconds[1]}></span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
