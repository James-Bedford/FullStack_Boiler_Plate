const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const dbService = require('./dbService');
const { request, response } = require('express');
dotenv.config();
app.use(cors()); /*needed so wont block api call to backend */
app.use(
  express.json()
); /*tTo allow data to be sent by express in .json format*/
app.use(express.urlencoded({ extended: false })); /*Not sending encoded data */

//Routes
//Create Route
app.post('/insert', (request, response) => {
  console.log(request.body);
  const { name } = request.body;
  const db = dbService.getDbServiceInstance();
  const result = db.insertNewName(name);
  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

//Read Route
app.get('/getAll', (request, response) => {
  const db = dbService.getDbServiceInstance();
  const result = db.getAllData();
  //response.json({ success: true });
  console.log('Testing Port:5000 working');
  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});
//Update Route
app.patch('/update', (request, response) => {
  console.log(request.body); //use this to see whats being passed
  const { id, name } = request.body;
  const db = dbService.getDbServiceInstance();
  const result = db.updateNameById(id, name);
  result
    .then((data) => response.json({ success: data }))
    .catch((err) => console.log(err));
});

//Delete Route
app.delete('/delete/:id', (request, response) => {
  // console.log(request.params);
  const { id } = request.params;
  const db = dbService.getDbServiceInstance();
  const result = db.deleteRowById(id);
  result
    .then((data) => response.json({ success: data }))
    .catch((err) => console.log(err));
});

//Search Route
app.get('/search/:name', (request, response) => {
  const { name } = request.params;
  const db = dbService.getDbServiceInstance();
  const result = db.searchByName(name);

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

app.listen(process.env.PORT, () => console.log('app is running')); // when nodemon starts this message displays.
