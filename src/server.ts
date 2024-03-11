import http from 'http';
import app from './app';

const server = http.createServer(app);

const PORT: number = Number(process.env.MIRANTES_PORT) || 3000;

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
