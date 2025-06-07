import Navbar from "./components/Navbar"; // adjust path if needed
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import Intro from "./components/Intro";
import About from "./components/AboutUs";
import Entourage from "./components/Entourage";
import DressCode from "./components/DressCode";


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
    </div>
  );
}

export default App;
