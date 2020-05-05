import React from 'react';
import './App.css';

const dependenciesInstalled : string[] = ['redux', 'react-redux', 'redux-thunk', 'typescript'];

function App() {
    let titleApp : string = 'Traffic Practice';
    return (
        <div className="App">
            <h1>{titleApp}</h1>
            <ul>
                {
                    dependenciesInstalled.map((dependency) => {
                        return <li>{dependency}</li>
                    })
                }
            </ul>
        </div>
    );
}

export default App;
