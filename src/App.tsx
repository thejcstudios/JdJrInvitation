import Navbar from "./components/Navbar"; // adjust path if needed
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import Intro from "./components/Intro";
import About from "./components/AboutUs";
import ImageGallery  from "./components/ImageGallery";
import Entourage from "./components/Entourage";
import DressCode from "./components/DressCode";
import MapLocation from "./components/MapLocation";
import RsvpForm from "./components/RsvpForm";
import Faq from "./components/FaqItem";
import Gifts from "./components/Gifts";
import Footer from "./components/Footer";
import BackgroundMusic from "./components/BackgroundMusic";
import bgMusicFile from '/music/bgmusic.mp3'; 
import VideoFile from "./components/VideoFile";


function App() {
  return (
    <div>
      <Navbar />
      <Intro />
      <Hero />
      <Countdown />
      <About />
      <ImageGallery />
      <div>
      <VideoFile
        src="/video/videofile.mp4"
        thumbnail="/images/hero.jpg"
        autoPlay={false}
        loop={false}
        muted={false}
      />
    </div>
      <Entourage />
      <DressCode /> 
      <MapLocation />
      <RsvpForm />
      <Faq />
      <Gifts />
      <BackgroundMusic src={bgMusicFile} volume={0.2} />
      <Footer />
      
    </div>
  );
}

export default App;
