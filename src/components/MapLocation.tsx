import React from 'react';
import styles from '../assets/styles/MapLocation.module.css';

interface Location {
  name: string;
  image: string;
  mapLink: string;
}

const locations: Location[] = [
  {
    name: 'Ceremony Venue',
    image: '/images/church.webp', // Update with actual path
    mapLink: 'https://maps.app.goo.gl/3jg6ZitedkFnE2BM8', // Example coordinates
  },
  {
    name: 'Reception Venue',
    image: '/images/resto.png', // Update with actual path
    mapLink: 'https://maps.app.goo.gl/vksG41n3roeScimQ7', // Example coordinates
  },
];

const MapLocation: React.FC = () => {
  return (
    <section id="location">
    <div className={styles.container}>
      <h2 className={styles.heading}>Our Wedding Locations</h2>
      <div className={styles.locations}>
        {locations.map((loc, i) => (
          <div key={i} className={styles.card}>
            <img src={loc.image} alt={loc.name} className={styles.image} />
            <h3 className={styles.title}>{loc.name}</h3>
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

export default MapLocation;
