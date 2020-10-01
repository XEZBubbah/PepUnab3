const express = require('express');
const cors = require('cors');
const app = express();
app.listen(3000, () => {
  console.log("Server started on port 3000");
})

const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: false }));
 
app.use(bodyParser.json());

let PepModel = require('./Schema');

//Post
app.post('/PepData/add', (req, res) => {
  let newPep = new PepModel;
  newPep.title = req.body.todo;
  newPep.completed = false;
  newPep.save((err) => {
    if(err){
      res.send("Error while adding PepData");
    }else{
      res.send("PepData added");
    }
  })
})

//Get
app.get('/PepData/completed', (req, res) => {
  PepModel.find({ completed: true }, (err, todos) => {
    if (err) {
      res.send("Error while fetching PepData");
    } else {
      res.json(todos)
    }
  })
})

app.get('/PepData/uncompleted', (req, res) => {
  PepModel.find({completed:false},(err, todos) => {
    if(err){
      res.send("Error while fetching PepData");
    }else{
      res.json(todos)
    }
  })
})

//Update
app.post('/PepData/complete/:id',(req, res) => {
  PepModel.findByIdAndUpdate(req.params.id, {completed: true},(err, todo) =>{
    if(!err){
      res.send("Se ha actualizado con éxito");
    }
  })
})

//Delete
app.delete('/PepData/:id', (req, res) => {
  let query = { _id: req.params.id }
  PepModel.deleteOne(query, (err) => {
    if(err){
      res.send("Error while deleting PepData")
    }else{
      res.send("PepData deleted")
    }
  })
})


/*const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/