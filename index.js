const express = require('express');
const stripe = require('stripe')('sk_test_Ie3Q2QfEQrB3bC5Z1EiuvZJJ');
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
    //const amount = 2500;
    console.log(req.body);
    //res.send('test');
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
    //no such path at dt/nci2018/public
   // .then(charge =>   res.sendFile('public/success.html', {root: path.dirname//(__dirname)}));

   //this one works
    //.then(charge =>  res.sendFile('public/success.html' , { root : __dirname}));


    .then(charge =>  res.sendFile('serverSuccess.html' , { root : __dirname}));
    //'index1.html', { root: path.join(__dirname, '../public')
   
   // .then(charge => res.sendFile('./public/success.html'));
    //.then(charge => res.render('./public/success.html'));
   // res.render('./public/success.html');
   // .then(charge=> res.render('success.html'))
    //.then(charge=> res.send(charge))
});

const port = process.env.PORT || 5000;

app.listen(port, () =>{
    console.log("started");
})