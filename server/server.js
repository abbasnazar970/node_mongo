var express = require('Express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo}= require('./models/todo');
var {User}=require('./models/user');

var app= express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    var todo = new Todo({
        text : req.body.text
    });
    todo.save().then((doc)=>{
            res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    })
});

app.get('/todos',(req,res)=>{
    Todo.find().then((doc)=>{
            res.send({todos: doc});
    },(err)=>{
        res.status(400).send(err);
    })
});

app.get('/todos/:id',(req,res)=>{
    Todo.findById(req.params.id).then((doc)=>{
            res.send({todos: doc});
    },(err)=>{
        res.status(400).send(err);
    })
});

app.delete('/todos/:id',(req,res)=>{
    Todo.findByIdAndRemove(req.params.id).then((doc)=>{
            res.send({todos: doc});
    },(err)=>{
        res.status(400).send(err);
    })
});

app.patch('/todos/:id',(req,res)=>{
    Todo.findByIdAndUpdate(req.params.id,{$set : { text : req.body.text}},{new : true}).then((doc)=>{
            res.send({todos: doc});
    },(err)=>{
        res.status(400).send(err);
    })
});

app.listen(3000,()=>{
    console.log('Server started on 3000')
})