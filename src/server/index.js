import 'ignore-styles';
import http from 'http';
import express from 'express';
import compression from 'compression';
import renderIndexPage from './ssr';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { server, publicPath, buildPath } from '../../config';

const { host, port } = server;
const getUrl = server => `http://${server.address().address}:${server.address().port}`;
const app = express();
const httpServer = http.createServer(app);

app.use(compression());
app.use('/public', express.static(publicPath));
app.use('/build', express.static(buildPath));
app.use('/ping', (req, res) => res.json({ ping: 'pong' }));
app.use(renderIndexPage);

httpServer.listen(port, host, () => {
  console.log(`server started on ${getUrl(httpServer)}`);
});

