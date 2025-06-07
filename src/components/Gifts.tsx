import React from 'react';
import '../assets/styles/Gifts.css';

const Gifts: React.FC = () => {
  return (
    <section className="gifts-section">
      <div className="gifts-container">
        <h2 className="gifts-title">Gifts</h2>
        <p className="gifts-message">
          There is no better gift than the honor of your presence.
        </p>
        <p className="gifts-message">
          However, if we are blessed with a gift from you,
        </p>
        <p className="gifts-message">
          we respectfully request a monetary token instead.
        </p>
      </div>
      <div className="decor-top-left" />
      <div className="decor-top-right" />
    </section>
  );
};

export default Gifts;
