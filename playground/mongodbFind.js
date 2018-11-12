const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
    if(err){
        return console.log('Uncable to coonect to Db');
    }
    console.log('connected to MongoDb')

    client.db('ToDo').collection('Todos').find({completed:true}).toArray().then((docs)=>{
            console.log(docs)
    },(err)=>{
            console.log('Unable to fetch '+err)
    });
    client.close()
});