let items = [
    {item: 'get milk'},
    {item: 'walk dog'},
    {item: 'feed cat'},
    {item: 'write code'}
];

const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

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