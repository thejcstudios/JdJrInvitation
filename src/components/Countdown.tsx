import React, { useState, useEffect, useRef } from 'react';

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

  const padTo2 = (num: number): string => num.toString().padStart(2, '0');

  const getTimeLeft = () => {
    const now = new Date();
    let delta = Math.max(0, EXP_DATE.getTime() - now.getTime());

    const seconds = Math.floor((delta / 1000) % 60);
    const minutes = Math.floor((delta / (1000 * 60)) % 60);
    const hours = Math.floor((delta / (1000 * 60 * 60)) % 24);
    const days = Math.floor((delta / (1000 * 60 * 60 * 24)) % 30.44);
    const months = Math.floor(delta / (1000 * 60 * 60 * 24 * 30.44));

    return { months, days, hours, minutes, seconds };
  };

  const changeNum = (el: HTMLElement, newVal: string, timing: number) => {
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
  };

  const updateCountdownDisplay = () => {
    const currentCounts = getTimeLeft();
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
  };

  useEffect(() => {
    const initialCounts = getTimeLeft();
    const initialValues: { [key: string]: string } = {};

    ['months', 'days', 'hours', 'minutes', 'seconds'].forEach((unit) => {
      const padded = padTo2(initialCounts[unit as keyof typeof initialCounts]);
      initialValues[unit] = padded;
      refs[unit as keyof typeof refs][0].current!.innerText = padded[0];
      refs[unit as keyof typeof refs][1].current!.innerText = padded[1];
    });

    setCountdownValues(initialValues as typeof countdownValues);

    const intervalId = setInterval(updateCountdownDisplay, 1000);
    return () => clearInterval(intervalId);
  }, []); // Run only once

  return (
    <div className="countdown-wrapper">
      <h1>Wedding Day</h1>
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
