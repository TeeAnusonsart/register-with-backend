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

// client.query(`SELECT * FROM info`,(err,res)=>{
//     if(err){
//         console.log(err.message)
//     } else{
//         console.log(res.rows)
//     }
    
//     })
client.connect();


app.get('/', (req, res) => {
  res.render('register')
})

// app.get('/register',(req,res)=>{
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write('<form action="register" method="post" enctype="multipart/form-data">');
//     res.write('<input type="file" name="filetoupload"><br>');
//     res.write('<input type="submit">');
//     res.write('</form>');
//     return res.end();
// })

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


