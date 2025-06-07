import { useState, useEffect, useRef } from 'react';

const About = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isSection1Visible, setIsSection1Visible] = useState(false);
  const section1Ref = useRef<HTMLDivElement | null>(null);

  // Parallax scroll listener for transforms
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for section 1 visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSection1Visible(true);
          observer.unobserve(entry.target); // unobserve after first trigger to avoid toggling
        }
      },
      { threshold: 1 }
    );

    if (section1Ref.current) {
      observer.observe(section1Ref.current);
    }

    return () => {
      if (section1Ref.current) observer.unobserve(section1Ref.current);
    };
  }, []);

  const imageParallaxFactor = 0.3;
  const textParallaxFactor = 0.2;

  const imageTransform = `translateY(-${scrollY * imageParallaxFactor}px)`;
  const textTransform = `translateY(${scrollY * textParallaxFactor}px)`;

  return (
    <>
      <div className="parallax-container">
        <div className="parallax-main-content">
        <section className="parallax-section-1">
  <div
    ref={section1Ref}
    className={`parallax-section-1-inner ${isSection1Visible ? 'fade-in' : ''}`}
  >
    <h2>Cordially invited you to our wedding</h2>
    <p>
      Where two hearts unite in one unforgettable celebration of love.
      We would be honored by your presence on this special day, a moment where love is celebrated, vows are exchanged, and a beautiful journey begins.
      Surrounded by family and friends, we hope to share with you the joy, laughter, and heartfelt memories that will mark the beginning of our forever.
    </p>
  </div>
</section>

          <section className="parallax-section-2">
            <div
              className="parallax-text-content"
              style={{ transform: textTransform }}
            >
              <h3>Our Love Story</h3>
              <p>
                What started as a simple work friendship
                quietly blossomed into something more.
                After a year of courtship, we took a chance
                on love—and six years later, here we are.
                From office chats to unforgettable
                adventures, including a magical proposal in
                Korea last September, every moment has
                brought us closer. Now, we’re ready to begin
                our forever.
              </p>
            </div>

            <div
              className="parallax-image-content"
              style={{ transform: imageTransform }}
            >
              <img
                src="/images/2.jpg"
                alt="Scenic View"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://placehold.co/600x400/CCCCCC/000000?text=Image+Unavailable';
                }}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
