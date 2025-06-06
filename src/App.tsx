import Navbar from "./components/Navbar"; // adjust path if needed
import Hero from "./components/Hero";
import Countdown from "./components/countdown";
import Intro from "./components/Intro";

function App() {
  return (
    <div>
      <Navbar />
      <Intro />
      <Hero />
      <Countdown />
    </div>
  );
}

export default App;
