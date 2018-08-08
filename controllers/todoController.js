let items = [
    {item: 'get milk'},
    {item: 'walk dog'},
    {item: 'feed cat'},
    {item: 'write code'}
];

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

let itemOne = Todo({item: 'Feed the cat'}).save((err)=>{
    if(err) throw err 
    console.log('item saved');
})

module.exports = (app)=>{

    app.get('/', (req, res)=>{
        res.render('todo', {todos: items});
    });

    app.post('/todo', urlencodedParser, (req, res)=>{
        items.push(req.body);
        res.json(items);
    });

    app.delete('/todo/:item', (req, res)=>{
        items = items.filter((todo)=>{
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json(items);
    });

};