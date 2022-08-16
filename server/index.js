const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user : "root",
    host : "localhost",
    password : "",
    database : "employeeSystem"
})

app.post('/create',(req,res)=>{
   const name = req.body.name;
   const age = req.body.age;
   const country = req.body.country;
   const designation = req.body.designation;
   const salary = req.body.salary;

   db.query('INSERT INTO employees (name,age,country,designation,salary) VALUES (?,?,?,?,?)',[name,age,country,designation,salary],(err,result)=>{
    if(err){
        console.log(err);
    }else{
        res.send("values inserted");
    }
   });
})

app.get('/employees',(req,res) =>{
    db.query("SELECT * FROM employees",(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result);
        }
    })
})

app.listen(3005,()=>{
    console.log("server running on port 3005");
})