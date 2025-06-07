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
import Gifts from "./components/Gifts";
import Footer from "./components/Footer";


function App() {
  return (
    <div>
      <Navbar />
      <Intro />
      <Hero />
      <Countdown />
      <About />
      <ImageGallery />
      <Entourage />
      <DressCode /> 
      <MapLocation />
      <RsvpForm />
      <Gifts />
      <Footer />
    </div>
  );
}

export default App;
