// const express= require ('express');
// const dotenv = require ('dotenv');
import express, { Express, Request, Response } from 'express';

import dotenv from 'dotenv';
dotenv.config();
// console.log(process.env.PORT);
const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const regRouter = require('./routes/login');
const retRouter = require('./routes/register');
// @will have routes services
app.use('/login', regRouter);
app.use('/register', retRouter);
app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});