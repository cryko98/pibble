
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TickerBar from './components/TickerBar';
import About from './components/About';
import HowToBuy from './components/HowToBuy';
import MemoryGame from './components/MemoryGame';
import PibbleCatchGame from './components/PibbleCatchGame';
import Chart from './components/Chart';
import Footer from './components/Footer';
import FloatingPibble from './components/FloatingPibble';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden selection:bg-pink-200">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <TickerBar />
        <About />
        <MemoryGame />
        <PibbleCatchGame />
        <HowToBuy />
        <Chart />
      </main>
      <FloatingPibble />
      <Footer />
    </div>
  );
};

export default App;
