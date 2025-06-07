import Navbar from "./components/Navbar"; // adjust path if needed
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import Intro from "./components/Intro";
import About from "./components/AboutUs";
import Entourage from "./components/Entourage";
import VideoSample from "./components/VideoSample";
import DressCode from "./components/DressCode";
import MapLocation from "./components/MapLocation";
import RsvpForm from "./components/RsvpForm";
import Footer from "./components/Footer";


function App() {
  return (
    <div>
      <Navbar />
      <Intro />
      <Hero />
      <Countdown />
      <About />
      <Entourage />
      <VideoSample />
      <DressCode /> 
      <MapLocation />
      <RsvpForm />
      <Footer />
    </div>
  );
}

export default App;
