import React, { useState } from 'react';
import styles from '../assets/styles/Faq.module.css';

type FaqItem = {
  question: string;
  answer: string;
};

const faqData: FaqItem[] = [
  {
    question: 'What should I wear to the wedding?',
    answer:
      'We kindly ask our guests to follow the dress code provided in the invitation or website.',
  },
  {
    question: 'Can I bring a plus-one?',
    answer:
      'Please check your invitation to see if a plus-one is included. We want to keep it intimate!',
  },
  {
    question: 'Will there be parking available?',
    answer: 'Yes, ample parking will be available at the venue. Security will guide you.',
  },
  {
    question: 'Are children allowed at the wedding?',
    answer:
      'While we love your little ones, the ceremony and reception will be an adults-only event.',
  },
];

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq">
    <section className={styles.container} id="faq">
      <h2 className={styles.title}>Frequently Asked Questions</h2>
      {faqData.map((item, index) => (
        <div key={index} className={styles.item}>
          <button
            className={styles.questionBtn}
            onClick={() => toggleIndex(index)}
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
            id={`faq-question-${index}`}
          >
            {item.question}
            <span
              className={`${styles.arrow} ${
                openIndex === index ? styles.arrowOpen : ''
              }`}
            >
              ▼
            </span>
          </button>
          <div
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
            className={`${styles.answer} ${
              openIndex === index ? styles.answerOpen : ''
            }`}
          >
            {item.answer}
          </div>
        </div>
      ))}
    </section>
    </section>
  );
};

export default Faq;
