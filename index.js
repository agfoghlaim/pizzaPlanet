const express = require('express');
const key = require('./config/keys');
const stripe = require('stripe')(key.stripeSecret);
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars');
const path = require('path');


const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use(express.static(`${__dirname}/public`));

app.get('/', (req,res)=>{
    res.render('index');
})

app.post('/charge', (req, res)=>{
   
    console.log(req.body);
    const amount = req.body.hiddenAmount;
    console.log(amount)

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    .then(customer => {
        console.log("cust ", customer)
        stripe.charges.create({
            amount:amount,
            description: 'pizza',
            currency:'eur',
            customer:customer.id
         })
    })



    .then(charge =>  res.sendFile('serverSuccess.html' , { root : __dirname}));
 
});

const port = process.env.PORT || 5000;

app.listen(port, () =>{
    console.log("started");
})