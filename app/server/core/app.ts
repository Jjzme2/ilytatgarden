import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import mainRouter from '../router';
import { db } from './firebase';

const app: Express = express();

// --- Middleware ---
// Enable Cross-Origin Resource Sharing
app.use(cors());
// Enable JSON body parsing
app.use(express.json());

// --- Routes ---
// Mount the main router for all incoming requests
app.use('/', mainRouter);

export default app;