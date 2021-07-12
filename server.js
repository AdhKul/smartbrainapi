	const express = require('express');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex= require('knex')

const register= require('./controllers/register.js')
const signIn= require('./controllers/signin.js')
const profile= require('./controllers/profile.js')
const image= require('./controllers/image.js')

process.env.NODE_TLS_REJECT_UNAUTHORIZED= 0

const db= knex({
	client: 'pg',
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: {
			rejectUnauthorezed: false
		}
	}
});

const app = express ();

app.use(express.json());
app.use(cors())



app.get('/', (req,res) => {res.send('it is working')}) 

app.post('/signin', (req,res) => {signIn.handleSignIn(req,res,db,bcrypt)})

app.post('/register' ,(req,res) => {register.handleRegister(req,res,db,bcrypt)})
	
app.get('/profile/:id',(req,res) =>{profile.handleProfile(req,res,db)})

app.put('/image',(req,res) =>{image.handleImage(req,res,db)})	

app.post('/imageurl',(req,res) =>{image.handleApiCall(req,res,)})

/*
Asynchronous way:

bcrypt.hash(password, null, null, function(err, hash) {
    		console.log(hash);
});

bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});

 */


app.listen (process.env.PORT || 3000 , ()=> {
	console.log(`app is running on port 3000 ${process.env.PORT}`);
})