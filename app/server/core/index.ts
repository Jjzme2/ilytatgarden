import dotenv from 'dotenv';
import { startServer } from './server';

// Load environment variables from .env file
dotenv.config();

const port = parseInt(process.env.PORT || '3000', 10);
startServer(port);