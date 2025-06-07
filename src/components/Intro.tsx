import React, { useState, useEffect } from 'react';
import { useInView } from '../assets/hooks/useInView';

interface Petal {
  id: string;
  left: string;
  fallDelay: string;
  fallDuration: string;
  swayClassName: string;
  swayDelay: string;
  swayDuration: string;
}

const Intro: React.FC = () => {
  const [petals, setPetals] = useState<Petal[]>([]);
  const { ref, isInView } = useInView<HTMLDivElement>(); // first element observer
  const { ref: ref2, isInView: isInView2 } = useInView<HTMLDivElement>(); // second element observer, renamed
  const { ref: ref3, isInView: isInView3 } = useInView<HTMLDivElement>(); // second element observer, renamed
  
  
  useEffect(() => {
    const numPetals = 80; // Adjust for more or fewer petals
    const newPetals: Petal[] = [];
    for (let i = 0; i < numPetals; i++) {
      newPetals.push({
        id: `petal-${i}`,
        left: `${Math.random() * 100}%`, // Random horizontal starting position
        fallDelay: `${Math.random() * 10}s`, // Random delay before falling starts
        fallDuration: `${8 + Math.random() * 7}s`, // Random fall speed (8s to 15s)
        swayClassName: `sway-${Math.floor(Math.random() * 9)}`, // Random sway animation (sway-0 to sway-8)
        swayDelay: `${Math.random() * 2}s`, // Random delay for the sway part of the animation
        swayDuration: `${3 + Math.random() * 5}s`, // Random duration for one sway cycle
      });
    }
    setPetals(newPetals);

    // No cleanup needed here as animations are infinite and self-contained.
    // If you wanted petals to disappear and new ones to appear, you'd add setInterval/setTimeout logic.
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <>
    <div className="wedding-intro-container">
      {/* The container for the falling petals */}
      <div className="sakura-falling">
        {petals.map((petal) => (
          <div
            key={petal.id}
            className={`sakura ${petal.swayClassName}`} // Apply base petal style and a specific sway class
            style={{
              left: petal.left,
              // Apply combined delays and durations for both 'fall' and 'sway' animations
              animationDelay: `${petal.fallDelay}, ${petal.swayDelay}`,
              animationDuration: `${petal.fallDuration}, ${petal.swayDuration}`,
            }}
          ></div>
        ))}
      </div>

      
      {/* Main content wrapper */}
      <div
      ref={ref}
      className={`wrap reveal-text ${isInView ? 'visible' : ''}`}
    >
        <div className="title">
          <h1 className='introname'>Jr & Jd</h1>
          <h3>Are getting married</h3>
          <p>on June 28 2025, At St. John Bosco Parish & Center for
Young Workers</p>
        </div>
      </div>
      <div
      ref={ref2}
      className={`dance-med reveal-text ${isInView2 ? 'visible' : ''}`}
    >
      {/* Closing message */}
      <p>
        We can’t wait to celebrate our special day with you.
      </p>
     </div>
    </div>
    <div className="wrapcontainer">
    <div
      ref={ref3}
      className={`wrap reveal-text ${isInView3 ? 'visible' : ''}`}
    >
        <div className="title">
          <h1>Prenup</h1>
        
          <h3 className='swipe'>Swipe right</h3>
          <svg
  className="arrow-right"
  xmlns="http://www.w3.org/2000/svg"
  width="40"
  height="40"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#966F4A"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <line x1="5" y1="12" x2="19" y2="12" />
  <polyline points="12 5 19 12 12 19" />
</svg>
        </div>
        </div>
      </div>
  </>
  );
};

export default Intro;