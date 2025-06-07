import React from 'react';
import styles from '../assets/styles/RsvpForm.module.css';

const RsvpForm: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>RSVP</h2>
      <p className={styles.subheading}>
        Kindly let us know if you can join us on our special day.
      </p>
      <div className={styles.formWrapper}>
        <iframe
          title="RSVP Google Form"
          src="https://docs.google.com/forms/d/e/1FAIpQLSefrnrFJHsm3RI5mH3xKU3bZgaATG9PUsF95jHLcYeeSJaQ1g/viewform?embedded=true"
          width="100%"
          height="900"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          loading="lazy"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
};

export default RsvpForm;

