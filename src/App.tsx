import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Nav from './components/Nav';

// Containers
import Home from './containers/Home/';
import About from './containers/About/';
import CreateDoc from './containers/CreateDoc/';

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

const App: React.FC = () => (
    <ThemeProvider theme={theme}>
        <Nav />
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/crear-documento" component={CreateDoc} />
    </ThemeProvider>
);

export default App;
