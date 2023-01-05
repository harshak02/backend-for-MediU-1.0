const loginExpress = require('express');
const loginRouter = loginExpress.Router();
loginRouter.get('/',(req:Request,res:any)=>{
	res.send('Express + typescript server for Login form form');
})
module.exports = loginRouter;