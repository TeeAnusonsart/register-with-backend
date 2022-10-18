const express = require('express')
const app = express()
const port = 3001
const {Client} = require('pg')
const multer = require("multer");
var bodyParser = require('body-parser')
const upload = multer({ dest: "uploads/" });

var jsonParser = bodyParser.json()


app.set('view engine','hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const client= new Client({
    host:"localhost",
    user:"postgres",
    port:5433,
    password:"teetee5321",
    database:"postgres"
});


client.connect();


app.get('/', (req, res) => {
  res.render('register')
})


app.post('/register',(req,res)=>{
    const {fullnames,password,email}=req.body
    console.log(req.body)
    console.log(fullnames)
    
    client.query(`INSERT INTO alluser (name,email,password) VALUES ('${fullnames}','${password}','${email}')`,(err,res)=>{
    if(err){
        console.log(err.message)
    } 
    
    })

    res.send("done");
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost${port}`)
})


