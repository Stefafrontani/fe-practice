import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './components/Nav';

// Containers
import Home from './containers/Home/';
import About from './containers/About/';
import CreateDoc from './containers/CreateDoc/';

const App: React.FC = () => (
    <Router>
        <Nav />
        <main className="page_main">
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/crear-documento" component={CreateDoc} />
        </main>
    </Router>
);

export default App;
