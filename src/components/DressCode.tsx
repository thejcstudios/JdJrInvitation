import React from 'react';
import styles from '../assets/styles/DressCode.module.css';

import Dress1 from '/images/Dress1.webp';
import Dress2 from '/images/Dress2.webp';
import Dress3 from '/images/Dress3.webp';
import Dress4 from '/images/Dress4.webp';
import Dress5 from '/images/Dress5.webp';
import Dress6 from '/images/Dress6.webp';

const colors = ['#FFFACD', '#DEB887', '#FFE4C4', '#FAEBD7', '#F0E68C'];

const DressCode: React.FC = () => {
  const images = [Dress1, Dress2, Dress3, Dress4, Dress5, Dress6];

  return (
    <div className={styles.container}>
       <h1 className={styles.dressh1}>Dress Code</h1>
            <h2 className={styles.dressh2}>
            We kindly encourage our guests <br />
            To wear these colors for our special day
            </h2>

      <div className={styles.imageRow}>
        <h3 className={styles.dressh3}>For Female Principal Sponsors & Bride’s Entourage</h3>
        {images.map((img, i) => (
          <img key={i} src={img} alt={`dress-${i}`} className={styles.dressImage} />
        ))}
      </div>
      <h3 className={styles.dressh3}>For Male Principal Sponsors & Groom’s Entourage</h3>
      <div className={styles.imageRow}>
        {images.map((img, i) => (
          <img key={i} src={img} alt={`dress-${i}`} className={styles.dressImage} />
        ))}
        <h2 className={styles.dressh2}>
        "Dress Code: Semi-Formal or Long Gowns Encouraged. We can't wait to see you looking your best!"
            </h2>
      </div>
      <h1 className={styles.dressh1}>For Guest</h1>
      <div className={styles.imageRow}>
        {images.map((img, i) => (
          <img key={i} src={img} alt={`dress-${i}`} className={styles.dressImage} />
        ))}
      </div>

      <div className={styles.circleRow}>
        {colors.map((color, i) => (
         <svg key={i} viewBox="0 0 100 100" className={styles.circle}>
         <circle
           cx="50"
           cy="50"
           r="40"
           fill={color}
           stroke="#A0522D"          // outline color
           strokeWidth="2"        // outline thickness
         />
       </svg>
        ))}
      </div>
    </div>
  );
};

export default DressCode;
