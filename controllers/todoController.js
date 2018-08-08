// let items = [
//     {item: 'get milk'},
//     {item: 'walk dog'},
//     {item: 'feed cat'},
//     {item: 'write code'}
// ];

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Connect to db
mongoose.connect(
"mongodb://todo_user:todo_user1@ds023694.mlab.com:23694/todo_app"
);

//Create a schema
let todoSchema = new mongoose.Schema({
    item: String
});

//DB Model
let Todo = mongoose.model('Todo', todoSchema);


module.exports = (app)=>{

    app.get('/', (req, res)=>{
        //get data from mongodb
        Todo.find({}, (err, items)=>{
            if(err) throw err;
            res.render('todo', {todos: items});
        });
    });

    app.post('/todo', urlencodedParser, (req, res)=>{
        //get data from view and add to mongodb
        let itemOne = Todo(req.body).save((err, items)=>{
            if(err) throw err 
            res.json(items);
        });
    });

    app.delete('/todo/:item', (req, res)=>{
        //Delete the item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove((err, items)=>{
            if(err) throw err;
            res.json(items);
        });
    });

};