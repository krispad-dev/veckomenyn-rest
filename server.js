import express from 'express';
import env from 'dotenv';
import cookieParser from 'cookie-parser';


import { dishesRouter, accountsRouter } from './routes/routes.js';
import { connectDb } from './database/db.js';

const port = process.env.PORT || 5000;

const app = express();
env.config();
app.use(express.json());
app.use(cookieParser())


app.use('/api', dishesRouter);
app.use('/api', accountsRouter);

connectDb();
app.listen(port, () => {
	console.log(`App listens on ${port}`);
});
