import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './components/Nav';

// Containers
import Home from './containers/Home/';
import About from './containers/About/';
import CreateDoc from './containers/CreateDoc/';

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

const App: React.FC = () => (
    <ThemeProvider theme={theme}>
        {/* TODO: Implement client & server routing  */}
        {/* <Router>
            <Nav />
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/crear-documento" component={CreateDoc} />
        </Router> */}
        <h1>Test Server side rendering without router</h1>
    </ThemeProvider>
);

export default App;
