import http from 'http';
import app from './app';

const server = http.createServer(app);

const startServer = (port: number) => {
  server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

export {
    server,
    startServer
};