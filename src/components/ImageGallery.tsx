// src/components/ImageGallery.tsx
import "../assets/styles/ImageGallery.css"; // Your existing CSS for styling

// Create an array to hold the direct URLs of your local images
const images: string[] = [];
const numberOfImages = 15; // Set this to the exact number of images you have (1 to 16)

for (let i = 1; i <= numberOfImages; i++) {
  // Directly form the URL for each image
  // Files in 'public/prenup/1.webp' are served at '/prenup/1.webp'
  images.push(`/prenup/${i}.webp`);
}

export default function ImageGallery() {
  return (
    <>
    <div className="gallarytext">
      <h1>More Prepup Photos</h1>
    </div>
    <div className="gallery">
      {images.map((url, i) => (
        <div key={i} className="gallery-item">
          <img
            src={url}
            alt={`Gallery image ${i + 1}`}
            loading="lazy" // Good for performance on image-heavy pages
            onError={(e) => {
              // Optional: Provide a fallback if an image somehow fails to load
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Error';
              console.error(`Failed to load image: ${url}`);
            }}
          />
        </div>
      ))}
    </div>
    </>
  );
}