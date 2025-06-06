import Navbar from "./components/Navbar"; // adjust path if needed
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import Intro from "./components/Intro";
import About from "./components/AboutUs";
import Entourage from "./components/Entourage";
import VideoSample from "./components/VideoSample";


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
    </div>
  );
}

export default App;
