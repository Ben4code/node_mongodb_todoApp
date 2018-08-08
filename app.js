const express = require('express');
const app = express();

const todoController = require('./controllers/todoController');


app.set('view engine', 'ejs');
app.use(express.static('./public'));

//fire controllers
todoController(app);




app.listen(3000);