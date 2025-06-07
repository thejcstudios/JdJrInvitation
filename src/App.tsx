import Navbar from "./components/Navbar"; // adjust path if needed
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import Intro from "./components/Intro";
import About from "./components/AboutUs";
import Entourage from "./components/Entourage";
import DressCode from "./components/DressCode";
import MapLocation from "./components/MapLocation";
import RsvpForm from "./components/RsvpForm";


function App() {
  return (
    <div>
      <Navbar />
      <Intro />
      <Hero />
      <Countdown />
      <About />
      <Entourage />
      <DressCode /> 
      <MapLocation />
      <RsvpForm />
    </div>
  );
}

export default App;
