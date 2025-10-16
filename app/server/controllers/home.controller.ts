import { Request, Response } from 'express';

export const getHomePage = (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is running!');
};