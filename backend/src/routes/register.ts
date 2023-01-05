import {Request, Response} from 'express';
let Validator = require('validatorjs');
const express = require('express');
const { MongoClient } = require('mongodb');
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const addHelper = require("../Model/registerSchema");

const app = express();

app.use(express.urlencoded({extended: false}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

const url =
	'mongodb+srv://harshak02:jntucse1234@cluster0.sttwkrc.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
// const clientObj = require('../services/mongodb');
const mongodbHelper = require('../services/databaseMethods');
const router = express.Router();
router.get('/', async (req: Request, res: any) => {
	res.send('Express + typescript server for registration form');
	//@using clientObj to connect to database
	console.log(mongodbHelper);
	const dbHelper = new mongodbHelper();
	await dbHelper.isconnect(client).then((result: any) => {
		console.log('client is connected', result);
	});
});

router.post('/', async (req: Request, res: any) => {
	let data = {
		userName: req.body.userName,
		email: req.body.email,
		phone:	req.body.phone,
		age: req.body.age,
		gender: req.body.gender,
		password: req.body.password,
	};
	let rules = {
		userName: "required",
		email : "required",
		phone:	"required",
		age : "required",
		gender: "required",
		password:'required'
	};
	let validation = new Validator(data, rules);
	let result=validation.passes();
	console.log(result);
	if(result){
		const dbHelper = new mongodbHelper();
		await dbHelper.isconnect(client).then((resultInside: any) => {
			console.log('client is connected', resultInside);
		});
		const findResult = dbHelper.findDocuments(client,"Semwell","userAuth",{email:"john@gmail.com"});
		if(findResult.status){
			console.log("Aldready Registered Please Login");
		}
		else{
			const newUser = {
				userName: req.body.userName,
				email: req.body.email,
				phone:	req.body.phone,
				age: req.body.age,
				gender: req.body.gender,
				password: req.body.password,
			};
		
			bcrypt.genSalt (10, (err:any,salt:any) => 
				bcrypt.hash(newUser.password , salt , (err:any,hash:any) => {
					if(err){
						throw err;
					}
					else{
						newUser.password = hash;
						dbHelper.insertDocuments(client,"Semwell","userAuth",[newUser]);
						console.log("added New User now he can log in");
					}
			}));
		}
	}
	else{
		res.send("Error Occured Pls Enter the details Correctly");
	}
});

module.exports = router;
