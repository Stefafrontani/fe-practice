import express from 'express';
import fs from 'fs';
import path from 'path';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import App from '../src/App';

const PORT = 8000;

const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use('/*', (req, res, next) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error");
    }

    const context = {};
    const markup = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    )

    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${markup}</div>`
      )
    );
  })
});

app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
});
