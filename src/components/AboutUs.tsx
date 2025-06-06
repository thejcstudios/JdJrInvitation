import React, { useState, useEffect } from 'react';

// Main App component
const About = () => {
  const [scrollY, setScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Effect to handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Set hasScrolled to true once the user starts scrolling to trigger the fade-in effect
      setHasScrolled(true);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup: remove event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  // Parallax factors - adjust these values to change the speed of the parallax effect
  // Image moves upwards, so its Y-transform will be negative
  const imageParallaxFactor = 0.3; // Image moves 0.3px up for every 1px scrolled down
  // Text moves downwards, so its Y-transform will be positive
  const textParallaxFactor = 0.2; // Text moves 0.2px down for every 1px scrolled down

  // Calculate transform values based on scroll position
  const imageTransform = `translateY(-${scrollY * imageParallaxFactor}px)`;
  const textTransform = `translateY(${scrollY * textParallaxFactor}px)`;

  return (
    // Embedding CSS directly within the component for a self-contained solution
    // The <style> tag is a standard HTML element that can be rendered directly in React JSX.
    // This approach ensures the styles are scoped to this component instance.
    <>
   

  
      <div className="parallax-container">
       

        {/* Main content section with custom CSS class */}
        <div className="parallax-main-content">
          {/* Section 1: Initial fade-in content with conditional class */}
          <section
            className={`parallax-section-1 ${hasScrolled ? 'fade-in' : ''}`}
          >
            <div className="parallax-section-1-inner">
              <h2>Cordially invited you to our wedding</h2>
              <p>
                    Where two hearts unite in one unforgettable celebration of love.
                    We would be honored by your presence on this special day, a moment where love is celebrated, vows are exchanged, and a beautiful journey begins.
                    Surrounded by family and friends, we hope to share with you the joy, laughter, and heartfelt memories that will mark the beginning of our forever.
              </p>
            </div>
          </section>

          {/* Section 2: Parallax content with custom CSS class */}
          <section className="parallax-section-2">
            {/* Left section: Text content with custom CSS class and inline transform style */}
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

            {/* Right section: Image content with custom CSS class and inline transform style */}
            <div
              className="parallax-image-content"
              style={{ transform: imageTransform }}
            >
              <img
                src="/images/2.jpg"
                alt="Scenic View"
                onError={(e) => {
                  // Fallback for image loading error
                  e.currentTarget.src = "https://placehold.co/600x400/CCCCCC/000000?text=Image+Unavailable";
                }}
              />
            </div>
          </section>

          {/* Section 3: More content to ensure scrollability with custom CSS class */}
          <section className="parallax-section-3">
            <h3>Entourage</h3>
            <p>
        
            </p>
          </section>
            </div>
        
      
      </div>
    </>
  );
};

export default About;
