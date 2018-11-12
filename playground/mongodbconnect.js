const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
    if(err){
        return console.log('Uncable to coonect to Db');
    }
    console.log('connected to MongoDb')

    client.db('ToDo').collection('Todos').insertOne({
        text:'2',
        completed : false

    },(err,res)=>{
        if(err){
                return console.log('Unable to insert todo',err)
        }
        console.log(JSON.stringify(res.ops,undefined,2))
    })

    client.close()
})