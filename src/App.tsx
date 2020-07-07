import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './components/Nav';

// Containers
import Home from './containers/Home/';
import About from './containers/About/';
import Contact from './containers/Contact/';
import CreateDoc from './containers/CreateDoc/';
import DemoComponents from './containers/DemoComponents/';

const App: React.FC = () => (
  <Router>
    <Nav />
    <main className="page_main">
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/crear-documento" component={CreateDoc} />
      <Route path="/demo-components" component={DemoComponents} />
    </main>
  </Router>
);

export default App;
