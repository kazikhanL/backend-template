import 'reflect-metadata';
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';

dotenv.config();

const app = express();
const port = process.env.PORT;
const host = process.env.HOST;

app.use(express.static('public'));
app.use(express.json());

app.use('/', (request: Request, response: Response) => {
  response.send('HELLO WORLD!');
});

// 404 error handler
app.use((request: Request, response: Response, next: NextFunction) => {
  response.status(404).send('code: 404, not found error');
  next();
});

// 500 error handler
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  console.error('server error', error);
  response.status(500).send('code: 500, server error');
  next();
});

async function main(): Promise<void> {
  app.listen(port, () => {
    console.log(`server work: http://${host}:${port}/`);
  });
}

main();
