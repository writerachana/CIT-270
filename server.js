const express = require ("express");

const app = express ();

const port =3000;

const bodyParser = require('body-parser');

const Redis = require('redis');

const redisClient =Redis.createClient(
    {
    url:"redis://127.0.0.1:6379"
    }
);

const {v4: uuidv4} = require('uuid'); //unversel unique identifier

app.use(bodyParser.json()); //This looks for incoming data

app.use(express.static('public'));

app.get("/", (req,res) => {

    res.send("Hello Rachana");
});

app.post('/login', async(req,res) =>{
    const loginUser = req.body.userName;
    const loginPassword = req.body.password; //Access the password data in the body
    console.log('Login username:' +loginUser);
    const CorrectPassword = await redisClient.hGet('UserMap', loginUser);
    // loginUser=="willy1995@gmail.com" && loginPassword=="Willy@pass12"
    if ( loginPassword==CorrectPassword){
        const loginToken = uuidv4();
        res.send (loginToken);
       // res.send("Hello Rachana is that you? ");
    }
    else{
        res.status(401);
        res.send('incorrent password ' +loginUser);
    }
    //res.send('Hello' +loginUser);
});

app.listen(port, () =>{
    redisClient.connect();
    console.log("listing");

});