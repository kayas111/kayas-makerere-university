const express=require('express')
const app=express()
var formidable = require('formidable');
const path=require('path')

const fs=require('fs')
const StringDecoder = require('string_decoder').StringDecoder;
var d = new StringDecoder('utf-8');
app.use(express.static(path.join(__dirname,'/build')))



app.get('/read',(req,res)=>{
  
    res.sendFile(path.join(__dirname,'/build/index.html'))
  
    
    })


app.get('/data.txt',(req,res)=>{
let f=fs.readFile('./data.txt',(err,data)=>{
    if (err) console.log(err)
   
   
   res.send(data)
    
    
    })


})

app.post('/submit',(req,res)=>{
   
   
   
    var form = new formidable.IncomingForm();
    
form.parse(req, function (err, fields, files){
   
let msg=" "+fields.tel+"-"+fields.msg+" "+"|| "
fs.appendFile('./data.txt',msg,(err)=>{
    if (err) console.log (err)
})

res.redirect('/read')
res.end()

  
 })

   
    });


const port=process.env.PORT || 4000
app.listen(port,()=>{

    console.log("Listening on port")
    console.log(port)
})