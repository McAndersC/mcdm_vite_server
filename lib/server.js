// Server Module.

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createServer } from 'node:http';
import * as path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const expressServer = express();
const server = createServer(expressServer);

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
expressServer.use(bodyParser.json());
expressServer.use(bodyParser.urlencoded({ extended: true }));

// Cross Origin Resource Sharing
expressServer.use(cors());

// Use the index router.
expressServer.use(express.static(path.join(__dirname, "..", "dist")));

// Serve the index.html from the dist folder.
expressServer.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

// Run the server.
server.run = () => {

    console.log('\n\n---------------------');
    console.log('Starter Server ->', process.env.NODE_ENV);
    console.log('\n\n---------------------');

    server.listen(process.env.SERVER_PORT, () =>
      console.log(`Serveren lytter på port ${process.env.SERVER_PORT}`)
    );

};

// Export the server.
export default server;
