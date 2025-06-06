import React from 'react';

// Define the props interface for the component
interface IntroProps {
  imageUrl?: string; // Optional prop for background image URL
  title?: string;     // Optional prop for the main title text
  description?: string; // Optional prop for the description text
}

const Intro: React.FC<IntroProps> = ({
  imageUrl = '/images/intro.jpg', // Default placeholder image
  title = 'Your Stunning Title Here',
  description = 'This is a beautifully designed section where your key message stands out against a captivating background. We highlight what matters most, right where it catches the eye.',
}) => {
  return (
    <>

      {/* Main container div with the background image */}
      <div
        className="background-text-container"
        style={{
          backgroundImage: `url('${imageUrl}')`, // Dynamically set background image
          backgroundSize: 'cover',   // Ensure the image covers the entire container
          backgroundPosition: 'right', // Center the background image
        }}
      >
        {/* Overlay for text background and positioning */}
        <div className="text-overlay">
          {/* Title text */}
          <h1>{title}</h1>
          {/* Description text */}
          <p>{description}</p>
          {/* Call to Action Button */}
          <button className="call-to-action-button">
            Learn More
          </button>
        </div>
      </div>
    </>
  );
};

export default Intro;
