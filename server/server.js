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

app.post('/newUser',(req,res)=>{
    var user = new User({
        email : req.body.email,
        password : req.body.password
    });
    user.save().then((doc)=>{
            return user.generateAuthToken();
    }).then((token)=>{
            res.header('x-auth',token).send(user);
    }).catch((e)=>{
            res.status(400).send(e);
    })
});

var authenticate = (req,res,next)=>{
    var token = req.header('x-auth');
    User.findByToken(token).then((user)=>{
        if(!user){
                return Promise.reject();
        }
        req.user=user;
        req.token=token;
        next();
    }).catch((e)=>{
        res.status(401).send({});
    });
}

app.get('/user/me',authenticate,(req,res)=>{
       res.send(req.user);
})

app.post('/users/login',(req,res)=>{
    email=req.body.email;
    password=req.body.password;
    User.findByCredentials(email,password).then((user)=>{
        return user.generateAuthToken().then((token)=>{
            res.header('x-auth',token).send(user);
    })
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

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

app.delete('/users/me/token',authenticate,(req,res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    },()=>{
        res.status(400).send();
    })
})


app.listen(3000,()=>{
    console.log('Server started on 3000')
})