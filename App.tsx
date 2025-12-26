
import React from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import About from './components/About';
import Approach from './components/Approach';
import ResourceForm from './components/ResourceForm';
import MindfulBreak from './components/MindfulBreak';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <Approach />
      <ResourceForm />
      <div className="py-12 bg-[#F8F7F3]">
        <MindfulBreak isOpen={false} />
      </div>
      <FinalCTA />
      <Footer />
    </Layout>
  );
};

export default App;
