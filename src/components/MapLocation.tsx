import React from 'react';
import styles from '../assets/styles/MapLocation.module.css'; // Adjust the path if needed

const locations = [
  {
    name: 'St. Benedict Parish, Ayala Westgrove',
    description: 'Ceremony',
    image: '/images/church.webp',
    mapLink: 'https://maps.google.com/?q=St.+Benedict+Parish,+Ayala+Westgrove',
  },
  {
    name: 'Jardin de Milagros',
    description: 'Reception',
    image: '/images/resto.png',
    mapLink: 'https://maps.app.goo.gl/oYYPADn4zYSHGXRN8',
  },
];

const WeddingLocations: React.FC = () => {
  return (
    <section id="location">
      <div className={styles.container}>
        <h2 className={styles.heading}>Our Wedding Locations</h2>
        <div className={styles.locations}>
          {locations.map((loc, i) => (
            <div key={i} className={styles.card}>
              <img src={loc.image} alt={loc.name} className={styles.image} />
              <h3 className={styles.title}>{loc.name}</h3>
              <p className={styles.description}>{loc.description}</p>
              <a
                href={loc.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
              >
                View on Google Maps
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeddingLocations;
