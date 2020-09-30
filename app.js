const express = require("express");
const path = require("path");
const app  = express();
const port = 8000;
const bodyparser = require("body-parser");
var mongoose= require("mongoose");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

//MONGOOSE SPECIFIC STUFF
const contactSchema = new mongoose.Schema({
    userName: String,
    userPhone: String,
    userEmail: String,
    userAddress: String,
    userDescription: String
  });

const contact = mongoose.model('contact', contactSchema);


// ENDPOINTS
app.get('/', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title': 'PubG is the best game', "content": con}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title': 'PubG is the best game', "content": con}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData =  new contact(req.body);
    console.log(myData.toString());
    myData.save().then(()=>{
        res.send("This item has been saved to the database");
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database");
    })
    // res.status(200).render('contact.pug', params);
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});